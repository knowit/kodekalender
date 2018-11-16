const jwt = require('jsonwebtoken');
const jwkRsa = require('jwks-rsa');
const fromEvent = require('graphcool-lib').fromEvent;

// See https://medium.com/@quiaro/authentication-inside-a-graphcool-service-using-auth0-5056806d02f0

const verifyToken = token =>
  new Promise((resolve, reject) => {
    // Decode the JWT Token
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header || !decoded.header.kid) {
      reject('Unable to retrieve key identifier from token');
    }
    if (decoded.header.alg !== 'RS256') {
      reject(
        `Wrong signature algorithm, expected RS256, got ${decoded.header.alg}`,
      );
    }
    const jkwsClient = jwkRsa({
      cache: true,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    });

    // Retrieve the JKWS's signing key using the decode token's key identifier (kid)
    jkwsClient.getSigningKey(decoded.header.kid, (err, key) => {
      if (err) return reject(err);

      const signingKey = key.publicKey || key.rsaPublicKey;

      // Validate the token against the JKWS's signing key
      jwt.verify(
        token,
        signingKey,
        {
          algorithms: ['RS256'],
          ignoreExpiration: false,
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          audience: process.env.AUTH0_CLIENT_ID,
        },
        (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded);
        },
      );
    });
  });

//Retrieves the Graphcool user record using the Auth0 user id
const getGraphcoolUser = (auth0UserId, api) =>
  api
    .request(
      `
        query getUser($auth0UserId: String!){
          User(auth0UserId: $auth0UserId){
            id
          }
        }
      `,
      { auth0UserId },
    )
    .then(queryResult => queryResult.User);

//Creates a new User record.
const createGraphCoolUser = (auth0UserId, nickname, email, picture, api) =>
  api
    .request(
      `
        mutation createUser($auth0UserId: String!, $nickname: String!, $email: String!, $picture: String!) {
          createUser(
            auth0UserId: $auth0UserId
            nickname: $nickname
            email: $email
            picture: $picture
          ){
            id
          }
        }
      `,
      { auth0UserId, nickname, picture, email },
    )
    .then(queryResult => queryResult.createUser);

export default async event => {
  if (!process.env.AUTH0_DOMAIN) {
    throw new Error('Missing AUTH0_DOMAIN environment variable');
  }
  if (!process.env.AUTH0_CLIENT_ID) {
    throw new Error('Missing AUTH0_CLIENT_ID environment variable');
  }

  try {
    const { idToken } = event.data;

    const decodedToken = await verifyToken(idToken);

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    let graphCoolUser = await getGraphcoolUser(decodedToken.sub, api);
    //If the user doesn't exist, a new record is created.
    if (graphCoolUser == null) {
      graphCoolUser = await createGraphCoolUser(
        decodedToken.sub,
        decodedToken.nickname,
        decodedToken.email,
        decodedToken.picture,
        api,
      );
    }

    // custom exp does not work yet, see https://github.com/graphcool/graphcool-lib/issues/19
    const token = await graphcool.generateNodeToken(
      graphCoolUser.id,
      'User',
      decodedToken.exp,
    );

    return { data: { id: graphCoolUser.id, token } };
  } catch (err) {
    console.log(err);
    return { error: 'An unexpected error occured' };
  }
};

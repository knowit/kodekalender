import { fromEvent } from 'graphcool-lib';

async function getUser(userId, api) {
  const queryResult = await api.request(
    `
        query getUser($userId: ID!){
          User(id: $userId){
            id
            role
          }
        }
      `,
    { userId },
  );

  return queryResult.User;
}

export default async event => {
  console.log(event);

  try {
    // no logged in user
    if (!event.context.auth || !event.context.auth.nodeId) {
      return { data: null };
    }

    const userId = event.context.auth.nodeId;
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    // get user by id
    const user = await getUser(userId, api);

    // no logged in user
    if (!user || !user.id) {
      return { data: null };
    }

    return { data: { id: user.id, userId: user.id, role: user.role } };
  } catch (e) {
    console.log(e);
    return { error: 'An unexpected error occured during authentication.' };
  }
};

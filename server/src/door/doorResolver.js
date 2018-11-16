const fromEvent = require('graphcool-lib').fromEvent;

/**
 * Check if we are able to retrieve view the answer
 */
function userCanViewAnswer(challenge) {
  // If the user has already solved it
  if (challenge._solutionsMeta.count > 0) {
    return true;
  }

  const now = new Date();

  // If the challenge is no longer active, we'll allow it
  if (challenge.activeTo && now > new Date(challenge.activeTo)) {
    return true;
  }

  return false;
}

/**
 * Retrieves the Graphcool challenge record using the challengeId
 */
async function getChallengeWithCount(api, challengeId, userId) {
  const queryResult = await api.request(
    `
        query getChallenge($challengeId: ID!, $userId: ID){
          Challenge(id: $challengeId){
            id
            answer
            activeFrom
            activeTo
            published
            discussionUrl
            markup
            title
            _solutionsMeta(filter: {
              user: {id: $userId}
              solved: true
            }) {
              count
            }
          }
        }
      `,
    { challengeId, userId },
  );

  return queryResult.Challenge;
}

export default async event => {
  try {
    const { id } = event.data;
    // TODO: Check if this can be trusted
    // Maybe check if auth.typeName === 'User' ?
    const userId = event.context.auth ? event.context.auth.nodeId : null;

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const challenge = await getChallengeWithCount(api, id, userId);

    // If the challenge doesn't exist, isn't published, or isn't active yet we return null
    if (
      !challenge ||
      !challenge.published ||
      (challenge.activeFrom && Date.now() < new Date(challenge.activeFrom))
    ) {
      return { data: null };
    }

    const canViewAnswer = userCanViewAnswer(challenge);

    const door = {
      id: challenge.id,
      markup: challenge.markup,
      answer: userId && canViewAnswer ? challenge.answer : null,
      discussionUrl: userId && canViewAnswer ? challenge.discussionUrl : null,
      title: challenge.title,
      activeTo: challenge.activeTo,
      solved: challenge._solutionsMeta.count > 0,
    };

    return {
      data: door,
    };
  } catch (err) {
    console.log(err);
    return { error: 'An unexpected error occurred' };
  }
};

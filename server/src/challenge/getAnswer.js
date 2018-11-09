const fromEvent = require('graphcool-lib').fromEvent;

/**
 * Check if we are able to retrieve the answer
 */
function canRetrieveAnswer(challenge) {
  if (!challenge.published) {
    return false;
  }

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
        query getChallenge($challengeId: ID!, $userId: ID!){
          Challenge(id: $challengeId){
            id
            answer
            activeTo
            published
            discussionUrl
            _solutionsMeta(filter: {
              user: {id: $userId}
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
    const { challengeId } = event.data;
    // TODO: Check if this can be trusted
    // Maybe check if auth.typeName === 'User' ?
    const userId = event.context.auth.nodeId;

    if (!userId) {
      return {
        error: 'Insufficient Permissions Error',
      };
    }

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const challengeAndCount = await getChallengeWithCount(
      api,
      challengeId,
      userId,
    );

    if (!canRetrieveAnswer(challengeAndCount)) {
      return { error: 'Insufficient Permissions Error' };
    }

    if (challengeAndCount.answer) {
      return {
        data: {
          answer: challengeAndCount.answer,
          discussionUrl: challengeAndCount.discussionUrl,
        },
      };
    }
    return {
      data: {
        answer: challengeAndCount.answer,
      },
    };
  } catch (err) {
    console.log(err);
    return { error: 'An unexpected error occurred' };
  }
};

const fromEvent = require('graphcool-lib').fromEvent;

/**
 * Retrieves the number of connections between the user and the challenge
 */
async function getChallengeToUserConnectionCount(api, userId, challengeId) {
  const queryResult = await api.request(
    `
    query ($userId: ID!, $challengeId: ID!) {
      _allSolutionsMeta(filter: {
        user: {id: $userId}
        challenge: {id: $challengeId}
      }) {
        count
      }
    }
      `,
    { challengeId, userId },
  );

  return queryResult._allSolutionsMeta.count;
}

/**
 * Ensure that we don't create duplicate connections for a user <-> challenge
 */
export default async event => {
  try {
    const { userId, challengeId } = event.data;

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const connectionCount = await getChallengeToUserConnectionCount(
      api,
      userId,
      challengeId,
    );

    if (connectionCount > 0) {
      return {
        error:
          'There is already a connection between the User and the Challenge',
      };
    }

    return event;
  } catch (err) {
    console.log(err);
    return {
      error:
        'An unexpected error occurred when ensuring unique connections between User and Challenge',
    };
  }
};

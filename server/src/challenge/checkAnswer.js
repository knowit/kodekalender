const fromEvent = require('graphcool-lib').fromEvent;

/**
 * Remove all whitespace and lowercase the string
 */
function sanitize(str) {
  return str.replace(/\s+|\s+$/g, '').toLowerCase();
}

/**
 * Check if the suggested answer matches the correct answer
 */
function verifyAnswer(correctAnswer, suggestedAnswer) {
  return sanitize(correctAnswer) === sanitize(suggestedAnswer);
}

/**
 * Check if the challenge is active/open for answers
 */
function isChallengeActive(challenge) {
  if (!challenge.published) {
    return false;
  }

  const now = new Date();

  if (challenge.activeFrom && now < new Date(challenge.activeFrom)) {
    return false;
  }

  if (challenge.activeTo && now > new Date(challenge.activeTo)) {
    return false;
  }

  return true;
}

/**
 * Retrieves the Graphcool challenge record using the challengeId
 *
 * Includes a solutions array, with the user's solution.
 * This array will either be empty or contain a single entry
 */
async function getChallengeWithSolution(api, challengeId, userId) {
  const queryResult = await api.request(
    `
        query getChallenge($challengeId: ID!, $userId: ID!){
          Challenge(id: $challengeId){
            id
            answer
            activeFrom
            activeTo
            published
            discussionUrl
            solutions (filter: { user: {id: $userId }}, first: 1) {
              id
              attempts
            }
          }
        }
      `,
    { challengeId, userId },
  );

  return queryResult.Challenge;
}

async function updateSolution(api, solutionId, solved, attempts) {
  const queryResult = await api.request(
    `
        mutation updateSolution($solutionId: ID!, $solved: Boolean!, $attempts: Int!){
          updateSolution(
            id: $solutionId
            solved: $solved
            attempts: $attempts
          ) {
            id
          }
        }
      `,
    { solutionId, solved, attempts: attempts + 1 },
  );
  return queryResult.updateSolution;
}

/**
 * Create a solution entry (regardless if the answer was wrong, because metadata is cool :-)
 * The Number of attempts will be set automatically
 */
async function createSolution(api, challengeId, userId, solved) {
  const queryResult = await api.request(
    `
    mutation createSolution($userId: ID!, $challengeId: ID!, $solved: Boolean!) {
      createSolution(
        userId: $userId
        challengeId: $challengeId
        solved: $solved
      ) {
        id
      }
    }
    `,
    { userId, challengeId, solved },
  );
  return queryResult.createSolution;
}

export default async event => {
  try {
    const { challengeId, answer } = event.data;
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

    const challenge = await getChallengeWithSolution(api, challengeId, userId);
    // Solution here is either null or { id: string, attempts: number};
    const solution = challenge.solutions[0];

    if (!isChallengeActive(challenge)) {
      return { error: 'The challenge is not active' };
    }

    const wasCorrect = verifyAnswer(challenge.answer, answer);

    if (wasCorrect && solution == null) {
      // No previous entry, answer is correct
      await createSolution(api, challengeId, userId, true);
      return {
        data: { correct: true, discussionUrl: challenge.discussionUrl },
      };
    } else if (wasCorrect && solution != null) {
      // Previous entry, answer is correct
      await updateSolution(api, solution.id, true, solution.attempts);
      return {
        data: { correct: true, discussionUrl: challenge.discussionUrl },
      };
    } else if (!wasCorrect && solution == null) {
      // No previous entry, answer was wrong
      await createSolution(api, challengeId, userId, false);
      return {
        data: { correct: false },
      };
    } else if (!wasCorrect && solution != null) {
      // previous entry, answer was wrong
      await updateSolution(api, solution.id, false, solution.attempts);
      return {
        data: { correct: false },
      };
    }

    return {
      error: 'Match may not be exhaustive.', // Scala lulz ;)
    };
  } catch (err) {
    console.log(err);
    return { error: 'An unexpected error occurred' };
  }
};

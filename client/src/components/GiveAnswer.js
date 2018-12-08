import React, { useContext, useState, useReducer } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import LaughingSanta from './LaughingSanta';
import DroppingSnowman from './DroppingSnowman';
import Label from './Label';
import TextAlign from './TextAlign';
import UserContext from './UserContext';
import Button from './Button';
import Input from './Input';
import DiscussionLink from './DiscussionLink';
import LEADERBOARD_QUERY from '../gql/LeaderboardQuery';
import DOORS_QUERY from '../gql/DoorsQuery';

const initialState = {
  discussionUrl: null,
  status: null,
  remainingAttempts: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CORRECT':
      return { status: action.type, discussionUrl: action.discussionUrl };
    case 'WRONG':
      return {
        ...state,
        status: action.type,
        remainingAttempts: action.remainingAttempts,
      };
    default:
      return { ...state, status: action.type };
  }
}

export default ({ doorId }) => {
  const user = useContext(UserContext);
  const isAuthenticated = Boolean(user);

  const [value, updateValue] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const giveAnswer = useMutation(GIVE_ANSWER_MUTATION, {
    variables: { doorId, answer: value },
    errorPolicy: 'all',
    // We need to update the following queries if we answered correctly
    // Do this instead of updating the cache ourselves
    refetchQueries: ({ data }) =>
      data && data.checkAnswer && data.checkAnswer.correct
        ? [
            { query: LEADERBOARD_QUERY },
            { query: DOORS_QUERY, variables: { userId: user.id } },
          ]
        : [],
  });

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: 'CHECKING' });

    const { data, errors } = await giveAnswer();

    if (errors) {
      dispatch({ type: 'ERROR' });
    } else if (data.checkAnswer.correct) {
      dispatch({
        type: 'CORRECT',
        discussionUrl: data.checkAnswer.discussionUrl,
      });
    } else {
      dispatch({
        type: 'WRONG',
        remainingAttempts: data.checkAnswer.remainingAttempts,
      });
    }
  }

  const status = state.status;
  const remainingAttemptsText = `(${state.remainingAttempts} forsøk gjenstår)`;

  return (
    <form>
      <Label>
        Din besvarelse{' '}
        {state.remainingAttempts != null && remainingAttemptsText}
      </Label>
      <Input
        aria-label="Answer"
        value={value}
        style={{ marginBottom: '15px' }}
        placeholder="Svar"
        required
        readOnly={status === 'CORRECT'}
        onChange={event => updateValue(event.target.value)}
      />
      <TextAlign>
        {status === 'CORRECT' ? (
          <DiscussionLink url={state.discussionUrl} />
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !isAuthenticated || value.trim() === '' || status === 'CHECKING'
            }
          >
            Avgi svar
          </Button>
        )}
        <div css={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          {status === 'ERROR' && (
            <>
              <p>Noe gikk galt :/</p>
              <p>
                Kanskje du har prøvd for mange ganger? Vi begrenser antall
                forsøk for å forhindre scripting
              </p>
            </>
          )}
          {status === 'CHECKING' && <span>Sjekker...</span>}
          {status === 'WRONG' && <WrongAnswer />}
          {status === 'CORRECT' && <CorrectAnswer />}
        </div>
      </TextAlign>
    </form>
  );
};

const GIVE_ANSWER_MUTATION = gql`
  mutation giveAnswer($doorId: String!, $answer: String!) {
    checkAnswer(challengeId: $doorId, answer: $answer) {
      correct
      discussionUrl
      remainingAttempts
    }
  }
`;

const WrongAnswer = () => (
  <>
    <LaughingSanta />
    <p>Myke pakker gitt. Svaret er feil.</p>
  </>
);

const CorrectAnswer = () => (
  <>
    <DroppingSnowman />
    <p>Åh herlige julegrøt, det var riktig!</p>
  </>
);

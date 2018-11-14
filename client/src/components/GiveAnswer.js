import React, { useContext, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import Label from './Label';
import UserContext from './UserContext';
import Button from './Button';
import Input from './Input';

export default ({ doorId }) => {
  const isAuthenticated = Boolean(useContext(UserContext));
  const [value, updateValue] = useState('');

  const giveAnswer = useMutation(GIVE_ANSWER_MUTATION, {
    variables: { doorId, answer: value },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const result = giveAnswer();
    console.log(result);
  }

  return (
    <form>
      <Label>Din besvarelse</Label>
      <Input
        aria-label="Answer"
        value={value}
        style={{ marginBottom: '15px' }}
        placeholder="Svar"
        required
        onChange={event => updateValue(event.target.value)}
      />
      <div css={{ textAlign: 'center' }}>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!isAuthenticated || value.trim() === ''}
        >
          Avgi svar
        </Button>
      </div>
    </form>
  );
};

const GIVE_ANSWER_MUTATION = gql`
  mutation giveAnswer($doorId: String!, $answer: String!) {
    checkAnswer(challengeId: $doorId, answer: $answer) {
      correct
      discussionUrl
    }
  }
`;

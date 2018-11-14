import React, { useContext, useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import theme from '../style/theme';
import UserContext from './UserContext';
import Button from './Button';

export default ({ doorId }) => {
  const isAuthenticated = Boolean(useContext(UserContext));
  const [reveal, toggleReveal] = useState(false);

  if (isAuthenticated && reveal) {
    return <Answer doorId={doorId} />;
  }

  return (
    <Button disabled={!isAuthenticated} onClick={() => toggleReveal(true)}>
      Se løsning
    </Button>
  );
};

const Answer = ({ doorId }) => {
  const { data } = useQuery(getAnswer, {
    variables: { doorId },
  });

  return (
    <p>
      Svaret er...{' '}
      <span
        css={`
          font-family: ${theme.fontFamilyCode};
        `}
      >
        {data.getAnswer.answer}
      </span>
    </p>
  );
};

const getAnswer = gql`
  query getAnswer($doorId: ID!) {
    getAnswer(challengeId: $doorId) {
      answer
      discussionUrl
    }
  }
`;

import React, { useContext, useState } from 'react';

import theme from '../style/theme';
import UserContext from './UserContext';
import Button from './Button';

export default ({ answer }) => {
  const isAuthenticated = Boolean(useContext(UserContext));
  const [reveal, toggleReveal] = useState(false);

  if (isAuthenticated && reveal) {
    return <Answer answer={answer} />;
  }

  return (
    <div css={{ textAlign: 'center' }}>
      <Button disabled={!isAuthenticated} onClick={() => toggleReveal(true)}>
        Se løsning
      </Button>
    </div>
  );
};

const Answer = ({ answer }) => {
  return (
    <p>
      Svaret er...{' '}
      <span
        css={`
          font-family: ${theme.fontFamilyCode};
        `}
      >
        {answer}
      </span>
    </p>
  );
};

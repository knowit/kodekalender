import React from 'react';
import styled from 'react-emotion';
import theme from '../../style/theme';

const Progress = styled('progress')`
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  height: 1.5rem;
  overflow: hidden;
  margin-left: 1em;
  margin-right: 1em;

  background-color: ${theme.colors.gray};
  color: ${theme.colors.success};

  ::-webkit-progress-bar {
    background-color: ${theme.colors.gray};
  }
  ::-webkit-progress-value {
    background-color: ${theme.colors.success};
  }
  ::-moz-progress-bar {
     background-color: ${theme.colors.success};
  }
`;

function lowerLimit(count = 0) {
  if (count < 1000) {
    return 0;
  } else if (count < 4000) {
    return 1000;
  } else if (count < 8000) {
    return 4000;
  }
  return 8000;
}

function upperLimit(count = 0) {
  if (count < 1000) {
    return 1000;
  } else if (count < 4000) {
    return 4000;
  } else if (count < 8000) {
    return 8000;
  }
  return 13000;
}

export default ({ count }) => {
  const leftSide = lowerLimit(count);
  const rightSide = upperLimit(count);
  return (
    <React.Fragment>
      <span css={`font-size: 24px`}>0</span>
      <Progress value={count || 0} max={rightSide}>
        {count}
      </Progress>
      <span css={`font-size: 24px`}>{rightSide}</span>
    </React.Fragment>
  );
};

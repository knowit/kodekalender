import React from 'react';
import { css, cx } from 'react-emotion';

export default ({ className, ...props }) => {
  return <h1 className={cx(style, className)} {...props} />;
};

const style = css`
  margin: 0;
  margin-bottom: 2rem;
  font-weight: bold;
  font-size: 2rem;
`;

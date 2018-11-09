import React from 'react';
import { css, cx } from 'react-emotion';

export default ({ className, ...props }) => (
  <div className={cx(style, className)} {...props} />
);

const style = css`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 30px;
`;

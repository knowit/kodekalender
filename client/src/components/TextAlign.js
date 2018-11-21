import React from 'react';
import { css, cx } from 'react-emotion';

const style = css`
  text-align: center;
`;

export default ({ className, ...props }) => (
  <div className={cx(style, className)} {...props} />
);

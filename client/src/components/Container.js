import React from 'react';
import { css, cx } from 'react-emotion';

const style = css`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`;

export default ({ className, ...props }) => (
  <div className={cx(style, className)} {...props} />
);

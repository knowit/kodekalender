import React from 'react';
import { css, cx } from 'react-emotion';

export default ({ className, ...props }) => (
  <label className={cx(style, className)} {...props} />
);

const style = css`
  display: block;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
`;

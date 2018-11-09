import React from 'react';
import { css, cx } from 'react-emotion';
import { placeholder } from 'polished';

import theme from '../style/theme';

export default ({ className, ...props }) => (
  <input className={cx(style, className)} type="text" {...props} />
);

const style = css`
  width: 100%;
  padding: 14px;
  background: #f5f4f7;
  border-radius: ${theme.borderRadius};
  border: none;
  font-size: inherit;
  outline: none;
  ${placeholder({ color: '#666' })};
`;

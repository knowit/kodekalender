import styled, { css } from 'react-emotion';
import { placeholder } from 'polished';

import theme from '../style/theme';

const inputCss = css`
  width: 100%;
  padding: 14px;
  background: #f5f4f7;
  border-radius: ${theme.borderRadius};
  border: none;
  font-size: inherit;
  outline: none;
  ${placeholder({ color: '#666' })};
`;

const Input = styled('input')`
  ${inputCss};
`;

export { Input as default, inputCss };

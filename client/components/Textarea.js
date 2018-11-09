import styled from 'react-emotion';

import { inputCss } from './Input';

const Textarea = styled('textarea')`
  ${inputCss};
  height: 200px;
`;

export default Textarea;

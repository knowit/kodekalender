import { css } from 'react-emotion';

const query = (condition, width) => (...args) => css`
  @media (${condition}-width: ${width}) {
    ${css(...args)};
  }
`;

const media = {
  mobile: query('max', '767px'),
  tablet: query('min', '768px'),
};

export default media;

import React from 'react';
import { css, keyframes } from 'react-emotion';

import theme from '../../style/theme';
import snowfallImgSrc from './snow-large-075d267ecbc42e3564c8ed43516dd557.png';

// Original https://codepen.io/iamjamie/pen/wzbEXG

export default ({ children }) => {
  return (
    <div className={wrapperStyle}>
      <div className={snowflakesStyle} />
      <div className={snowflakesStyle} style={{ animationDelay: '5s' }} />
      {children}
    </div>
  );
};

const wrapperStyle = css`
  position: relative;
  overflow: hidden;
  background: ${theme.colors.midnightBlue};
  color: ${theme.colors.grayLight};
`;

const fallingAnimation = keyframes`
0% {
  transform: translate3D(-7.5%, -100%, 0);
}
100% {
  transform: translate3D(7.5%, 100%, 0);
}
`;

const snowflakesStyle = css`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: ${fallingAnimation} linear infinite both;
  background-image: url('${snowfallImgSrc}');
  background-size: contain;
  animation-duration: 10s;
`;

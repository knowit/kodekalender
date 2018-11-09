import React from 'react';
import { css, keyframes } from 'react-emotion';

/**
 * Original code https://codepen.io/tari/pen/xZKLao
 */
export default () => (
  <div className={center}>
    <div className={style} />
  </div>
);

const center = css`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const snow = keyframes`
  100% {
    background-position: 0px 200px, 0 200px, 0px 200px, 0px 200px;
  }
`;

const style = css`
  transform: scale(0.6);
  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 50%;
  background-color: #5c7289;
  background-image: radial-gradient(
      circle at 50% 18%,
      yellow 3%,
      transparent 3.5%
    ),
    linear-gradient(60deg, #7dae41 8%, transparent 8.5%),
    linear-gradient(-60deg, #79a83f 8%, transparent 8.5%),
    linear-gradient(60deg, #75a33d 10%, transparent 10.5%),
    linear-gradient(-60deg, #719d3b 10%, transparent 10.5%),
    linear-gradient(60deg, #6d9839 12%, transparent 12.5%),
    linear-gradient(-60deg, #699237 12%, transparent 12.5%),
    linear-gradient(80deg, #855726 5%, transparent 5.5%),
    linear-gradient(-80deg, #7f5324 5%, transparent 5.5%);
  background-position: 0 0, 100px 80px, 100px 80px, 100px 111.1111111111px,
    100px 111.1111111111px, 100px 142.8571428571px, 100px 142.8571428571px,
    100px 160px, 100px 160px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: rotate(-15deg);
    background-image: radial-gradient(
        circle at 30% 30%,
        #fff 1.5%,
        transparent 2.5%
      ),
      radial-gradient(circle at 80% 70%, #fff 1.5%, transparent 2.5%),
      radial-gradient(circle at 30% 50%, #fff 1%, transparent 2%),
      radial-gradient(circle at 70% 85%, #fff 1%, transparent 2%);
    background-size: 100% 100%, 100% 100%, 50% 100%, 50% 50%;
    background-position: 0 0, 0 0, 0 0, 0 0;
    animation: ${snow} 3s linear infinite forwards;
  }
`;

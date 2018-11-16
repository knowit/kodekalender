import { css } from 'react-emotion';
import theme from '../../style/theme';

const BLUE_COLOR = theme.colors.midnightBlue;
const RED_COLOR = '#de2f32';
const WHITE_COLOR = '#f9f9f9';
const BLACK_COLOR = '#4a4a4a';

const styles = css`
  .snowman_body {
    fill: ${WHITE_COLOR};
    animation: body-drop 0.5s ease-in forwards;
  }

  .scarf {
    fill: ${RED_COLOR};
    opacity: 0;
    animation: scale 0.5s ease 1s forwards;
    transform-origin: 55px 165px;
  }

  .scarf_knot {
    fill: ${RED_COLOR};
    opacity: 0;
    animation: scale 0.3s ease 1.5s forwards;
    transform-origin: 92px 190px;
  }

  .snowman_head {
    fill: ${WHITE_COLOR};
    transform: translateY(-303px);
    animation: body-drop 0.5s ease-in 0.2s forwards;
  }

  .hat {
    transform: translateY(-303px);
    animation: body-drop 0.5s ease-in 0.3s forwards;
  }

  .hat-top {
    fill: ${BLACK_COLOR};
  }

  .hat-ribbon {
    fill: ${RED_COLOR};
  }

  .hat-bottom {
    fill: ${BLACK_COLOR};
  }

  .nose {
    fill: ${RED_COLOR};
    opacity: 0;
    animation: scale 0.3s ease 2.5s forwards;
    transform-origin: 104px 142px;
  }

  .mouth-1 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.1s forwards;
    transform-origin: 82px 156px;
  }

  .mouth-2 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.2s forwards;
    transform-origin: 86px 162px;
  }

  .mouth-3 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.3s forwards;
    transform-origin: 92px 167px;
  }

  .mouth-4 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.4s forwards;
    transform-origin: 98px 169px;
  }

  .mouth-5 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.5s forwards;
    transform-origin: 106px 171px;
  }

  .mouth-6 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.6s forwards;
    transform-origin: 113px 171px;
  }

  .mouth-7 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.7s forwards;
    transform-origin: 120px 171px;
  }

  .mouth-8 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.8s forwards;
    transform-origin: 127px 169px;
  }

  .mouth-9 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 3.9s forwards;
    transform-origin: 132px 165px;
  }

  .mouth-10 {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.1s ease 4s forwards;
    transform-origin: 137px 160px;
  }

  .eye_left {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.2s ease 2.7s forwards;
    transform-origin: 92px 122px;
  }

  .eye_right {
    fill: ${BLACK_COLOR};
    opacity: 0;
    animation: scale 0.2s ease 2.9s forwards;
    transform-origin: 125px 120px;
  }

  .button_top {
    fill: ${BLUE_COLOR};
    opacity: 0;
    animation: scale 0.3s ease 2.2s forwards;
    transform-origin: 132px 217px;
  }

  .button_bottom {
    fill: ${BLUE_COLOR};
    opacity: 0;
    animation: scale 0.3s ease 2s forwards;
    transform-origin: 132px 252px;
  }

  @keyframes body-drop {
    0% {
      transform: translateY(-303px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  @keyframes scale {
    0% {
      opacity: 1;
      transform: scale(0, 0);
    }

    100% {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
`;

export default styles;

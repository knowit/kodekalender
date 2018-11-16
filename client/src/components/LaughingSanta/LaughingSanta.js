import React from 'react';
import { css } from 'react-emotion';
import { headLaugh, bodyLaugh, beardLaugh, mouthLaugh } from './keyframes';
import theme from '../../style/theme';

// Originally by Alireza Sheikholmolouki https://codepen.io/Alireza29675/pen/KwgwMy

export default () => (
  <div aria-hidden className={styles.window}>
    <div className={styles.santa}>
      <div className={styles.head}>
        <div className={styles.face}>
          <div>
            <div className={styles.whitepart} />
            <div className={styles.redpart} />
            <div className={styles.hatball} />
          </div>
          <div className={styles.eyes} />
          <div className={styles.beard}>
            <div className={styles.nose} />
            <div className={styles.mouth} />
          </div>
        </div>
        <div className={styles.ears} />
      </div>
      <div className={styles.body} />
    </div>
  </div>
);

const BACKGROUND_COLOR = theme.colors.midnightBlue;
const BUTTON_COLOR = '#f7be10';
const RED_COLOR = '#de2f32';
const WHITE_COLOR = '#f9f9f9';
const BROWN_COLOR = '#a8744f';

const styles = {
  window: css`
    width: 300px;
    height: 300px;
    background: ${BACKGROUND_COLOR};
    position: relative;
    margin: auto;
    border-radius: 50%;
    border: 10px solid ${WHITE_COLOR};
    overflow: hidden;
  `,
  santa: css`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  `,
  head: css`
    z-index: 2;
    position: absolute;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    animation: ${headLaugh} 4s linear infinite;
  `,
  face: css`
    width: 120px;
    height: 130px;
    background: radial-gradient(#edcab0, #e9a982);
    border-radius: 50%;
    border: 3px solid ${WHITE_COLOR};
  `,
  whitepart: css`
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 90%;
    height: 32px;
    background: ${WHITE_COLOR};
    border-radius: 50px;
    z-index: 4;
    box-shadow: 0px 6px 0px -4px rgba(0, 0, 0, 0.1);
  `,
  redpart: css`
    width: 120px;
    height: 120px;
    background: ${RED_COLOR};
    position: absolute;
    top: -50px;
    left: 15px;
    border-radius: 50%;
    z-index: -1;
    &:before {
      content: ' ';
      width: 95px;
      height: 95px;
      position: absolute;
      left: 0;
      top: 12px;
      border-radius: 50%;
      box-shadow: inset -8px -1px 0px -5px rgba(0, 0, 0, 0.05);
    }
    &:after {
      content: ' ';
      position: absolute;
      right: 0;
      top: 60px;
      background: ${RED_COLOR};
      width: 20px;
      height: 50px;
    }
  `,
  hatball: css`
    width: 38px;
    height: 38px;
    background: ${WHITE_COLOR};
    border-radius: 50%;
    z-index: 5;
    position: absolute;
    right: -20px;
    top: 40px;
    box-shadow: 0px 6px 0px -4px rgba(0, 0, 0, 0.1);
  `,
  eyes: css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 57px;
    &:before,
    &:after {
      content: ' ';
      position: absolute;
      width: 15px;
      height: 9px;
      top: 0;
      border: 5px solid ${BROWN_COLOR};
      border-width: 0;
      border-top-width: 5px;
      border-radius: 50%;
    }
    &:before {
      left: -28px;
    }
    &:after {
      right: -28px;
    }
  `,
  ears: css`
    &:before,
    &:after {
      content: ' ';
      width: 20px;
      height: 30px;
      border-radius: 50%;
      background: radial-gradient(#e9a982, #edcab0);
      position: absolute;
      top: 50%;
      z-index: -1;
    }
    &:before {
      left: -8px;
      transform: rotate(-10deg);
    }
    &:after {
      right: -8px;
      transform: rotate(10deg);
    }
  `,
  beard: css`
    width: 55px;
    height: 55px;
    background: ${WHITE_COLOR};
    border-radius: 50%;
    position: absolute;
    bottom: -30px;
    left: 50%;
    animation: ${beardLaugh} 4s linear infinite;
    transform: translateX(-50%);
    &:before,
    &:after {
      content: ' ';
      width: 80px;
      height: 80px;
      background: ${WHITE_COLOR};
      border-radius: 50%;
      position: absolute;
      bottom: 15px;
    }
    &:before {
      left: -40px;
    }
    &:after {
      right: -40px;
    }
  `,
  nose: css`
    width: 25px;
    height: 20px;
    border-radius: 50%;
    background: #edcab0;
    position: absolute;
    z-index: 3;
    box-shadow: inset -3px -3px 0px #e9a982;
    left: 50%;
    transform: translateX(-50%);
    top: -42px;
  `,
  mouth: css`
    background: ${BROWN_COLOR};
    z-index: 3;
    position: absolute;
    width: 15px;
    height: 5px;
    border-bottom-right-radius: 80px 50px;
    border-bottom-left-radius: 80px 50px;
    left: 50%;
    top: 0;
    animation: ${mouthLaugh} 4s linear infinite;
    transform: translateX(-50%);
  `,
  body: css`
    width: 190px;
    height: 210px;
    background: ${RED_COLOR};
    position: relative;
    border-radius: 50%;
    top: 0;
    animation: ${bodyLaugh} 4s linear infinite;
    transform: translateY(50%);
    &:before {
      content: ' ';
      width: 7px;
      height: 7px;
      background: ${BUTTON_COLOR};
      border-radius: 50%;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0px -18px 0px ${BUTTON_COLOR}, 0px 18px 0px ${BUTTON_COLOR};
    }
  `,
};

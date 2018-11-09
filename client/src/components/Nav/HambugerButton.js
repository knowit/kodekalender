import React from 'react';
import { css, cx } from 'react-emotion';

import theme from '../../style/theme';
import media from '../../style/media';

export default ({ isExpanded, onClick }) => (
  <button className={buttonStyle} onClick={onClick}>
    <span className={cx(burgerStyle, { [isExpandedStyle]: isExpanded })} />
  </button>
);

const buttonStyle = css`
  width: 24px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 0;
  float: right;
  &:before {
    content: '';
    opacity: 0;
    width: 0;
    height: 0;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    background: transparent;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }
  ${media.tablet`
    display: none;
  `};
`;

const line = css`
  width: 100%;
  height: 2px;
  transition: all 0.4s ease;
  background: ${theme.colors.black};
`;

const burgerStyle = css`
  ${line};
  display: block;
  position: relative;

  &:before,
  &:after {
    content: '';
    ${line};
    position: absolute;
    left: 0;
  }

  &:before {
    top: -6px;
  }
  &:after {
    bottom: -6px;
  }
`;

const isExpandedStyle = css`
  background: transparent;
  &:before {
    transform: rotate(225deg);
    top: 0;
  }
  &:after {
    transform: rotate(-225deg);
    bottom: 0;
  }
`;

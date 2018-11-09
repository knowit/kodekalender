import React from 'react';
import PropTypes from 'prop-types';
import { TiHeart, TiHome } from 'react-icons/lib/ti';
import theme from '../../style/theme';

const HeartHouse = ({ size, ...props }) => (
  <span css={`white-space: nowrap;`} {...props}>
    <TiHeart size={size} css={`color: ${theme.colors.danger};`} />
    <TiHome size={size} />
  </span>
);

HeartHouse.propTypes = {
  size: PropTypes.number,
};

export default HeartHouse;

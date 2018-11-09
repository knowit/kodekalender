import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from 'next/link';
import FaCheck from 'react-icons/lib/fa/check';
import Avatar from '../Avatar';

import theme from '../../style/theme';

const emojis = ['🎅', '☃️', '🦌', '🤶', '❄️', '🎁', '🎄', '⛄️', '🌟'];

const Regular = styled('a')`
  border-radius: 100px;
  box-shadow: 4px 5px 6px 0 rgba(0, 0, 0, 0.45);
  color: ${theme.colors.dark};
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 120px;
  transition: all 0.2s ease;
  font-size: 40px;
  position: relative;
  margin: auto;
  &:hover {
    transform: scale(1.04);
    content: '';
    span {
      opacity: 0;
      display: none;
    }
  }
  &:hover:after {
    content: attr(data-hover);
    display: block;
    opacity: 1;
  }
  ${p =>
    p.inActive &&
    `
    color: #f1f1f1;
    pointer-events: none;
  `};
`;

// Show solved doors in green and white
const Solved = styled(Regular)`
  background-color: ${theme.colors.success};
  color: ${theme.colors.white};
`;

const Door = ({ day, challenge, ...props }) => {
  if (challenge != null && challenge._solutionsMeta.count > 0) {
    return (
      <Solved data-hover={day} {...props}>
        <span>{emojis[day % emojis.length]}</span>
      </Solved>
    );
  }

  return (
    <Regular
      inActive={challenge == null}
      data-hover={emojis[day % emojis.length]}
      {...props}
    >
      <span>{day}</span>
    </Regular>
  );
};

Door.propTypes = {
  day: PropTypes.number.isRequired,
  challenge: PropTypes.shape({
    id: PropTypes.string.isRequired,
    _solutionsMeta: PropTypes.shape({
      count: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default Door;

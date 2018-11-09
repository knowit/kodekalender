import React from 'react';
import styled from 'react-emotion';
import Link from 'next/link';
import FaCheck from 'react-icons/lib/fa/check';
import Error from '../pages/_error';

import Calendar from './Calendar';
import theme from '../style/theme';

const ChallengeList = ({ data: { loading, error, allChallenges } }) => {
  if (error) {
    return <Error />;
  }
  if (loading) {
    return null;
  }

  return <Calendar challenges={allChallenges} />;
};

export default ChallengeList;

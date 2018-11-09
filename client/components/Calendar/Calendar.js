import React from 'react';
import styled from 'react-emotion';
import Link from 'next/link';
import FaCheck from 'react-icons/lib/fa/check';
import isAfter from 'date-fns/is_after';

import Door from './Door';

const Grid = styled('div')`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 20px;
`;

// If there aren't enough doors, pad with some fake doors until we reach 24 :-)
const Calendar = ({ challenges }) => {
  const now = new Date();

  // Filter away all challenges that aren't active yet
  const activeChallenges = challenges.filter(challenge =>
    isAfter(now, challenge.activeFrom),
  );

  return (
    <Grid>
      {activeChallenges.map((challenge, index) => (
        <Link
          key={challenge.id}
          href={`/challenges/_challenge?id=${challenge.id}`}
          as={`/challenges/${challenge.id}`}
          passHref
          prefetch
        >
          <Door day={index + 1} challenge={challenge} />
        </Link>
      ))}
      {activeChallenges.length < 24 &&
        [...Array(24 - activeChallenges.length)].map((_, index) => (
          <Door key={index} day={index + activeChallenges.length + 1} />
        ))}
    </Grid>
  );
};

export default Calendar;

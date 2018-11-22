import React, { useContext } from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { css, cx } from 'react-emotion';
import { Link } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import isAfter from 'date-fns/is_after';

import DOORS_QUERY from './gql/DoorsQuery';
import theme from './style/theme';
import UserContext from './components/UserContext';
import Container from './components/Container';

const Doors = () => {
  useDocumentTitle('Kodekalender: Luker');

  const currentUser = useContext(UserContext);

  const { data, error } = useQuery(DOORS_QUERY, {
    variables: {
      userId: currentUser ? currentUser.id : null,
    },
  });

  // Filter away the doors that aren't active yet
  // Ideally these shouldn't be retrieved at all, but whatever
  const now = new Date();
  const doors = data.allChallenges.filter(challenge =>
    isAfter(now, challenge.activeFrom),
  );

  return (
    <div css={{ height: '100%', backgroundColor: theme.colors.midnightBlue }}>
      <Container css={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <DoorGrid doors={doors} />
      </Container>
    </div>
  );
};

/**
 *  Pad with extra days so we always show 24 in the calendar
 */
const DoorGrid = ({ doors }) => (
  <div className={gridStyle}>
    {doors.map((door, index) => (
      <Door
        key={door.id}
        id={door.id}
        day={index + 1}
        isSolved={door != null && door._solutionsMeta.count > 0}
      />
    ))}
    {doors.length < 24 &&
      [...Array(24 - doors.length)].map((_, index) => (
        <Door key={index} day={index + doors.length + 1} />
      ))}
  </div>
);

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 20px;
`;

const emojis = ['🎅', '☃️', '🦌', '🤶', '❄️', '🎁', '🎄', '⛄️', '🌟'];

const Door = ({ id, day, isSolved }) => {
  const Component = id != null ? Link : 'span';

  return (
    <Component
      to={id != null ? `/doors/${id}` : null}
      className={cx(doorStyle.default, {
        [doorStyle.solved]: isSolved,
        [doorStyle.notActive]: id == null,
      })}
      data-hover={emojis[day % emojis.length]}
    >
      <span>{day}</span>
    </Component>
  );
};

const doorStyle = {
  default: css`
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
  `,
  solved: css`
    background-color: ${theme.colors.success};
    color: ${theme.colors.white};
  `,
  notActive: css`
    color: #f1f1f1;
    pointer-events: none;
  `,
};

export default Doors;

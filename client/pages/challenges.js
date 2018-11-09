import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from '../components/Layout';
import ChallengeList from '../components/ChallengeList';
import Container from '../components/Container';
import theme from '../style/theme';

import defaultPage from '../hocs/defaultPage';

const Challenges = ({ loggedInUser, data }) => (
  <Layout loggedInUser={loggedInUser} background={theme.colors.midnightBlue}>
    <Head>
      <title>Kodekalender: Luker</title>
    </Head>
    <Container pb={40}>
      <ChallengeList data={data} />
    </Container>
  </Layout>
);

Challenges.propTypes = {
  loggedInUser: PropTypes.shape({
    userId: PropTypes.string,
  }),
};

const activeChallengesByDate = gql`
  query($userId: ID) {
    allChallenges(filter: { published: true }, orderBy: activeFrom_ASC) {
      id
      title
      activeFrom
      _solutionsMeta(filter: { solved: true, user: { id: $userId } }) {
        count
      }
    }
  }
`;
// Don't use datetime now.
// TODO: Don't use datetime now(). Flashes content and results in multiple calls to backend?
/*const activeChallengesByDate = gql`
  query($userId: ID, $now: DateTime!) {
    allChallenges(
      filter: { published: true, activeFrom_lt: $now }
      orderBy: activeFrom_ASC
    ) {
      id
      title
      _solutionsMeta(filter: { solved: true, user: { id: $userId } }) {
        count
      }
    }
  }
`;*/

export default compose(
  defaultPage,
  graphql(activeChallengesByDate, {
    options: ({ loggedInUser }) => ({
      variables: {
        // Make sure we pass null here or we'll get the total count of all solves for each challenge
        userId: loggedInUser ? loggedInUser.userId : null,
        //now: new Date(),
      },
    }),
  }),
)(Challenges);

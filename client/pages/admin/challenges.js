import { graphql, compose } from 'react-apollo';
import { css } from 'react-emotion';
import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import React from 'react';
import PropTypes from 'prop-types';

import FormattedDate from '../../components/FormattedDate';
import Layout from '../../components/Layout';
import Container from '../../components/Container';
import adminPage from '../../hocs/adminPage';

const Challenges = ({
  loggedInUser,
  data: { error, loading, allChallenges },
}) => (
  <Layout loggedInUser={loggedInUser}>
    <Head>
      <title>Kodekalender: Administrer oppgaver</title>
    </Head>
    <Container>
      <h1>Challenges</h1>
      <Link href="/admin/challenges/new" prefetch>
        <a style={{ float: 'right' }}>New Challenge</a>
      </Link>
      {allChallenges && (
        <table css={`width: 100%;`}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Active from</th>
              <th>Active to</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {allChallenges.map(challenge => (
              <tr key={challenge.id}>
                <td>
                  <Link
                    href={`/admin/challenges/_challenge?id=${challenge.id}`}
                    as={`/admin/challenges/${challenge.id}`}
                    prefetch
                  >
                    <a>{challenge.title}</a>
                  </Link>
                </td>
                <td>
                  {challenge.activeFrom && (
                    <FormattedDate value={challenge.activeFrom} />
                  )}
                </td>
                <td>
                  {challenge.activeTo && (
                    <FormattedDate value={challenge.activeTo} />
                  )}
                </td>
                <td>{challenge.published.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  </Layout>
);

Challenges.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
};

const allChallenges = gql`
  query {
    allChallenges(orderBy: activeFrom_ASC) {
      id
      title
      activeFrom
      activeTo
      published
    }
  }
`;

export default compose(adminPage, graphql(allChallenges))(Challenges);

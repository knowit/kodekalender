import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import { withRouter } from 'next/router';

import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import adminPage from '../../../hocs/adminPage';
import ChallengeForm from '../../../components/ChallengeForm';

const Challenge = ({
  loggedInUser,
  updateChallenge,
  data: { challenge, loading, error },
}) => (
  <Layout loggedInUser={loggedInUser}>
    <Head>
      <title>Kodekalender: Rediger oppgave</title>
    </Head>
    <Container>
      {challenge && (
        <ChallengeForm saveChallenge={updateChallenge} challenge={challenge} />
      )}
    </Container>
  </Layout>
);

const getChallenge = gql`
  query getChallenge($challengeId: ID!) {
    challenge: Challenge(id: $challengeId) {
      id
      title
      markdown
      answer
      activeFrom
      activeTo
      published
      notes
      discussionUrl
    }
  }
`;

const updateChallenge = gql`
  mutation updateChallenge(
    $id: ID!
    $title: String!
    $markdown: String!
    $answer: String!
    $activeFrom: DateTime
    $activeTo: DateTime
    $published: Boolean!
    $notes: String
    $discussionUrl: String
  ) {
    updateChallenge(
      id: $id
      title: $title
      markdown: $markdown
      answer: $answer
      activeFrom: $activeFrom
      activeTo: $activeTo
      published: $published
      notes: $notes
      discussionUrl: $discussionUrl
    ) {
      id
      title
      markdown
      answer
      activeFrom
      activeTo
      published
      notes
      discussionUrl
    }
  }
`;

export default compose(
  adminPage,
  withRouter,
  graphql(updateChallenge, {
    props: ({ mutate }) => ({
      updateChallenge: challenge => mutate({ variables: challenge }),
    }),
  }),
  graphql(getChallenge, {
    options: ({ router }) => ({ variables: { challengeId: router.query.id } }),
  }),
)(Challenge);

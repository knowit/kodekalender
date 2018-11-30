import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import useDocumentTitle from '@rehooks/document-title';

import UserContext from './components/UserContext';
import Container from './components/Container';
import RevealAnswer from './components/RevealAnswer';
import GiveAnswer from './components/GiveAnswer';
import Terminal from './components/Terminal';
import Heading from './components/Heading';
import DiscussionLink from './components/DiscussionLink';

const Door = ({ doorId, navigate }) => {
  const { data, error } = useQuery(GET_DOOR, {
    variables: { id: doorId },
  });

  if (error || !data.door) {
    navigate('/404');
    return null;
  }

  useDocumentTitle(`Kodekalender: ${data.door.title}`);

  const isAuthenticated = Boolean(useContext(UserContext));
  const hasExpired = data.door && new Date(data.door.activeTo) < new Date();
  const isSolved = data.door.solved;

  return (
    <Container css={{ marginBottom: '50px' }}>
      <Heading>{data.door.title}</Heading>
      <Terminal css={{ marginBottom: '3rem' }}>
        <div dangerouslySetInnerHTML={{ __html: data.door.markup }} />
      </Terminal>

      {!isAuthenticated && <AnonMessage hasExpired={hasExpired} />}

      {(isSolved || hasExpired) && <RevealAnswer answer={data.door.answer} />}

      {data.door.discussionUrl && (
        <DiscussionLink url={data.door.discussionUrl} />
      )}

      {!hasExpired && !isSolved && <GiveAnswer doorId={doorId} />}
    </Container>
  );
};

const AnonMessage = ({ hasExpired }) => (
  <p css={{ fontSize: '1.2rem', margin: '2.5rem 0', textAlign: 'center' }}>
    {hasExpired
      ? 'Det er for sent å svare på denne oppgaven. Logg deg inn for å se svaret og diskusjonstråden.'
      : 'Logg deg inn for å avgi svar.'}
  </p>
);

const GET_DOOR = gql`
  query getDoor($id: ID!) {
    door: Door(id: $id) {
      id
      title
      markup
      activeTo
      answer
      discussionUrl
      solved
    }
  }
`;

export default Door;

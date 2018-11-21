import React from 'react';
import useDocumentTitle from '@rehooks/document-title';

import theme from './style/theme';
import Container from './components/Container';
import TextAlign from './components/TextAlign';
import Snowfall from './components/Snowfall';
import Heading from './components/Heading';
import media from './style/media';

export default () => {
  useDocumentTitle('Kodekalender');

  return (
    <TextAlign>
      <Container css={{ minHeight: '40vh' }}>
        <H1>
          Kodekalender{' '}
          <small css={{ display: 'block', fontSize: '0.5em' }}>by knowit</small>
        </H1>
        <P>
          Løs lukene og bli med i trekningen av en telefon eller et nettbrett.
        </P>
        <P>En ny luke åpnes hver dag frem til jul.</P>
      </Container>

      <Snowfall>
        <Container css={{ padding: '80px 0' }}>
          <Heading size="2">Episode 2018 - Return of the Leaderboard</Heading>
          <P>Løs lukene hver dag for å klatre til toppen!</P>
        </Container>
      </Snowfall>
    </TextAlign>
  );
};

const H1 = props => (
  <h1
    css={`
      font-family: ${theme.fontFamilyCode};
      font-size: 60px;
      text-transform: uppercase;
      ${media.mobile`
        font-size: 42px;
      `};
    `}
    {...props}
  />
);

const P = props => <p css={{ fontSize: '1.2rem' }} {...props} />;

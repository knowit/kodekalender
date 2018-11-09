import React from 'react';
import { css } from 'react-emotion';
import useDocumentTitle from '@rehooks/document-title';

import theme from './style/theme';
import Container from './components/Container';
import Snowfall from './components/Snowfall';

export default () => {
  useDocumentTitle('Kodekalender');

  return (
    <>
      <Container>
        <h1>Kodekalender</h1>
        <p>Løs lukene og bli med i trekningen av en telefon!</p>
        <p>En ny luke åpnes hver dag frem til jul.</p>
      </Container>

      <Snowfall>
        <Container>
          <h3>Ønsker du å bidra?</h3>
          <p>
            I år har vi åpnet opp for at publikum kan sende inn forslag til
            oppgaver. Sitter du inne med en skikkelig nøtt i magen?
          </p>
          <p>
            Blir nøtten brukt krediteres du på oppgavesiden (om du vil), og du
            får et <strong>gavekort fra Amazon</strong>!
          </p>
          <a
            className={linkStyle}
            href="https://docs.google.com/forms/d/e/1FAIpQLSfq-fxO1-Bh-B4gLYeaevOdwPwunCkvCw5v42m7w_Ca6k9RcQ/viewform?usp=sf_link"
          >
            Send den inn, da vel!
          </a>
        </Container>
      </Snowfall>
    </>
  );
};

const linkStyle = css`
  margintop: 40px;
  display: inline-block;
  border: 2px solid ${theme.colors.grayLight};
  color: ${theme.colors.grayLight};
  border-radius: 50px;
  font-size: 20px;
  padding: 5px 15px;
  transition: all 0.15s ease-out;
  &:hover {
    transform: translateY(-1px);
  }
`;

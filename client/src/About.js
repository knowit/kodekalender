import React from 'react';
import useDocumentTitle from '@rehooks/document-title';

import Container from './components/Container';
import Row from './components/Row';
import media from './style/media';
import theme from './style/theme';

const Section = props => (
  <section
    css={`
      padding: 80px 0;
      p {
        line-height: 2;
        margin-top: 1.5rem;
      }
      h2 {
        font-size: 32px;
        line-height: 1.6;
        margin-top: 0;
        text-align: center;
        font-weight: normal;
      }
      &:nth-child(even) {
        background: ${theme.colors.gray};
      }
    `}
    {...props}
  />
);

export default () => {
  useDocumentTitle('Kodekalender: Om');

  return (
    <>
      <Section style={{ paddingTop: '50px' }}>
        <Container>
          <h2>Om Kodekalenderen</h2>
          <Row
            css={`
              ${media.mobile`display: block`};
            `}
          >
            <div>
              <p>
                Kodekalenderen er kalenderen for deg som er glad i
                programmering. Hver luke er en oppgave som løses best ved hjelp
                av kode.
              </p>
              <p>
                Lukene varierer i vanskelighetsgrad og utforming, men felles for
                alle er at koden til løsningen din skal resultere i et svar på
                en linje som systemet kan sjekke om er korrekt.
              </p>
            </div>
            <div>
              <p>
                Hver luke som løses er et lodd i trekningen av en telefon eller
                et nettbrett. Løs så mange luker som mulig for å øke
                vinnersjansene dine!
              </p>
              <p>
                Lukene åpnes klokken 06:00 hver dag, og du har 24 timer på på å
                løse oppgaven.
              </p>
              <p>
                Vinneren trekkes på nyåret og vil bli kontaktet. Lykke til og
                god jul!
              </p>
            </div>
          </Row>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2>Stack</h2>
          <p>
            Kodekalenderen er skikkelig <em>over-engineered</em>. Her er en
            liste med buzzwords som har gjort det så gøy å lage denne løsningen.
          </p>
          <p>
            React (alpha med suspense og hooks!), CSS-in-JS, GraphQL, Apollo,
            Graphcool, Auth0, Now.sh.
          </p>
          <p>
            Kildekoden ligger fritt tilgjengelig på{' '}
            <a
              href="https://github.com/knowit/kodekalender"
              title="Kodekalender repo"
            >
              GitHub
            </a>
            .
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2>Om Knowit</h2>
          <p>
            Knowit-kulturen er bygget på åpenhet, entreprenørskap, høy
            kompetanse, en vilje til stadig å utvikles - og en god dose
            nerdehumor. Vi er nesten 2200 ansatte fordelt på Norge, Sverige,
            Danmark, Finland og Tyskland. I Norge finnes vi i Oslo, Bergen,
            Stavanger, Kristiansand, Arendal og Trondheim.
          </p>
          <p>
            <a href="https://www.knowit.no/karriere/systemutvikler-backend-mobil-ogeller-frontend/">
              Lyst på jobb?
            </a>
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2>Jobbe i Knowit?</h2>
          <p>
            Ønsker du å vite mer om Knowit? Ta gjerne kontakt for en uformell
            prat med vår rekrutteringsansvarlig, Sigmund Marius Nilssen, på{' '}
            <a href="mailto:smn@knowit.no">smn@knowit.no</a>.
          </p>
        </Container>
      </Section>
    </>
  );
};

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
      h3 {
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
          <h3>Om Kodekalenderen</h3>
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
                Hver luke som løses er et lodd i trekningen av en telefon. Løs
                så mange luker som mulig for å øke vinnersjansene dine!
              </p>
              <p>
                Lukene åpnes klokken 06:00 hver dag, og du har 24 timer på deg
                til å løse oppgaven.
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
          <h3>Stack</h3>
          <p>
            Kodekalenderen er skikkelig <em>over-engineered</em>. Her er en
            liste med buzzwords som har gjort det så gøy å lage denne løsningen.
          </p>
          <p>
            React (med suspoense og hooks!), CSS-in-JS, GraphQL, Apollo,
            Graphcool, Auth0, Now.sh
          </p>
          <p>
            Kildekoden ligger (snart) fritt tilgjengelig på{' '}
            <a href="http://github.com/knowit" title="GitHub">
              GitHub
            </a>{' '}
            (så fort vi får slettet secrets fra commit-meldingene 🙈).
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h3>Om Knowit</h3>
          <p>
            Knowit-kulturen er bygget på åpenhet, entreprenørskap, høy
            kompetanse og en vilje til stadig å utvikles - og en god dose
            nerdehumor. Vi er nesten 1900 mennesker fordelt på Norge og Sverige,
            i Norge finnes vi i Oslo, Bergen, Stavanger, Kristiansand, Arendal
            og Trondheim.
          </p>
          <p>
            <a href="https://www.finn.no/job/fulltime/ad.html?finnkode=108484135&fks=108484135">
              Lyst på jobb?
            </a>
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <h3>Jobbe i Knowit?</h3>
          <p>
            Ønsker du å vite mer om Knowit? Ta gjerne kontakt for en uformell
            prat med vår rekrutteringsansvarlig, Sigmund Marius Nilssen, på{' '}
            <a href="mailto:smn@knowit.no">smn@knowit.no</a>.
          </p>
          <p>
            Du kan lese mer, se videoer om oss eller søke jobb på{' '}
            <a href="http://www.knowit.no/karriere" title="Knowit karriere">
              knowit.no/karriere
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
};

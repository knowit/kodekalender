import React from 'react';
import Head from 'next/head';
import styled from 'react-emotion';
import Link from 'next/link';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import defaultPage from '../hocs/defaultPage';
import YouTube from '../components/YouTube';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Snow from '../components/Snow';
import theme from '../style/theme';
import media from '../style/media';
import Flex from '../components/Flex';
import Box from '../components/Box';
import Progressbar from '../components/BetterShelter/Progressbar';
import HeartHouse from '../components/BetterShelter/HeartHouse';
import tentCount from '../components/BetterShelter/tentCount';

const WelcomeSection = styled('section')`
  margin: 50px 0;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 42px;
    ${media.tablet`
      font-size: 60px;
    `} margin-top: 0;
    margin-bottom: 30px;
    text-transform: uppercase;
    font-family: ${theme.fontFamilyCode};
  }
  p {
    font-size: 19px;
  }
`;

const DocsLink = styled('a')`
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

const BetterShelterSection = styled('section')`
  background: ${theme.colors.gray};
  color: ${theme.colors.dark};
  padding: 80px 0;
  h3 {
    margin-top: 0;
  }
`;

const Grid = styled('div')`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
  `};
`;

const Home = ({ loggedInUser, data, ...props }) => (
  <Layout loggedInUser={loggedInUser}>
    <Head>
      <title>Knowits Kodekalender</title>
    </Head>
    <WelcomeSection>
      <Container>
        <h1>Kodekalender</h1>
        <p>Løs lukene og bli med i trekningen av en telefon!</p>
        <p>En ny luke åpnes hver dag frem til jul.</p>
        <Link href="/better-shelter">
          <a css={`color: inherit; font-weight: normal;`}>
            <Flex align="center" justify="center" mt={100}>
              {data.loading ? '?' : tentCount(data._allSolutionsMeta.count)} ×{' '}
              <HeartHouse />
            </Flex>
            <Flex mt={20}>
              <Progressbar
                count={data.loading ? null : data._allSolutionsMeta.count}
              />
            </Flex>
          </a>
        </Link>
      </Container>
    </WelcomeSection>
    <BetterShelterSection>
      <Container>
        <Grid>
          <Box>
            <h3>
              Løs våre kodenøtter og bidra til å gi flyktninger i Irak et bedre
              hjem!
            </h3>
            <p>
              Ved å løse oppgavene i vår kodekalender, bidrar du til å gi
              flyktninger i Irak et bedre hjem. Når antallet korrekte løsninger
              når 1 000, vil Knowit gi tre Better Shelter-telt, hver til en
              verdi av 14 500 kroner. Ved 4 000 riktige besvarelser gir vi tre
              telt til, og det samme når vi når 8 000 og 13 000 besvarelser.
            </p>
            <p>Stå på, spre ordet, og tusen takk for din innsats!</p>
            <Link href="/better-shelter" passHref>
              <DocsLink
                style={{
                  display: 'inline-block',
                  marginTop: '30px',
                  color: 'inherit',
                  borderColor: 'inherit',
                }}
              >
                Les mer
              </DocsLink>
            </Link>
          </Box>
          <Box>
            <YouTube videoId="V9xegwnBWVQ" />
            <Flex justify="space-between" align="center" mt={40}>
              <img
                alt="Better Shelter logo"
                css={`filter: grayscale(1); max-width: 50%; object-fit: scale-down; max-height: 96px;`}
                src="/static/better-shelter/bettershelterlogolilla.png"
              />
              <img
                alt="UNHCR logo"
                css={`filter: grayscale(1); max-width: 50%; object-fit: scale-down;`}
                src="/static/better-shelter/unhcr-logo.png"
              />
            </Flex>
          </Box>
        </Grid>
      </Container>
    </BetterShelterSection>
    <Snow>
      <Container>
        <h3>Ønsker du å bidra?</h3>
        <p>
          I år har vi åpnet opp for at publikum kan sende inn forslag til
          oppgaver. Sitter du inne med en skikkelig nøtt i magen?
        </p>
        <p>
          Blir nøtten brukt krediteres du på oppgavesiden (om du vil), og du får
          et <strong>gavekort fra Amazon</strong>!
        </p>
        <DocsLink
          style={{
            marginTop: '40px',
            display: 'inline-block',
          }}
          href="https://docs.google.com/forms/d/e/1FAIpQLSfq-fxO1-Bh-B4gLYeaevOdwPwunCkvCw5v42m7w_Ca6k9RcQ/viewform?usp=sf_link"
        >
          Send den inn, da vel!
        </DocsLink>
      </Container>
    </Snow>
  </Layout>
);

const totalSolvedCount = gql`
  query {
    _allSolutionsMeta(filter: { solved: true }) {
      count
    }
  }
`;

export default compose(defaultPage, graphql(totalSolvedCount))(Home);

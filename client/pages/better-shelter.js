import React from 'react';
import styled, { css } from 'react-emotion';
import Head from 'next/head';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TiHomeOutline, TiHome } from 'react-icons/lib/ti';

import HeartHouse from '../components/BetterShelter/HeartHouse';

import defaultPage from '../hocs/defaultPage';
import YouTube from '../components/YouTube';
import Layout from '../components/Layout';
import Container from '../components/Container';
import theme from '../style/theme';
import Box from '../components/Box';
import Flex from '../components/Flex';
import media from '../style/media';
import Error from './_error';
import Progressbar from '../components/BetterShelter/Progressbar';
import tentCount from '../components/BetterShelter/tentCount';

const Section = styled('section')`
  color: ${theme.colors.dark};
  padding: 80px 0;
  p {
    line-height: 1.5;
    font-size: 18px;
  }
  h3 {
    font-size: 32px;
    margin-top: 0;
    font-weight: normal;
  }
  background: #f2f1f4;
`;

const tick = css`
  content: '';
  position: absolute;
  border-left: 2px solid ${theme.colors.grayDark};
  display: block;
  height: 15px;
  left: 50%;
  top: -20px;
`;

// this is the best css grid hacking ever o_O
const TentScale = styled('div')`
  display: grid;
  margin-bottom: 70px;
  grid-template-columns:
    1px repeat(3, 1fr) 1px repeat(3, 1fr) 1px repeat(3, 1fr)
    1px repeat(3, 1fr) 1px;

  span:nth-of-type(1) {
    grid-column: 2;
  }

  span:nth-of-type(4) {
    grid-column: 6;
  }

  span:nth-of-type(7) {
    grid-column: 10;
  }

  span:nth-of-type(10) {
    grid-column: 14;
  }

  span,
  svg,
  small {
    margin-left: auto;
    margin-right: auto;
  }

  small {
    color: ${theme.colors.dark};
  }

  hr {
    grid-column: 1 / -1;
    width: 100%;
    border: none;
    border-top: 2px solid ${theme.colors.grayDark};
  }

  .tick-0 {
    grid-column: 1 / span 2;
    margin-left: 0;
    position: relative;
    :before {
      ${tick};
      left: 0;
    }
  }

  .tick-1000 {
    grid-column: 4 / span 3;
    position: relative;
    :before {
      ${tick};
    }
  }

  .tick-4000 {
    grid-column: 8 / span 3;
    position: relative;
    :before {
      ${tick};
    }
  }

  .tick-8000 {
    grid-column: 12 / span 3;
    position: relative;
    :before {
      ${tick};
    }
  }

  .tick-13000 {
    grid-column: 15 / span 2;
    margin-right: 0;
    position: relative;
    :after {
      ${tick};
      left: unset;
      right: 0;
    }
  }
`;

const BetterShelter = ({ loggedInUser, data }) => {
  if (data.error) {
    return <Error />;
  }

  const count = data._allSolutionsMeta ? data._allSolutionsMeta.count : 0;

  const tents = tentCount(count);

  return (
    <Layout loggedInUser={loggedInUser}>
      <Head>
        <title>Kodekalender: Better Shelter</title>
      </Head>
      <Container>
        <Box textAlign="center">
          <h1 css={`font-size: 73px;`}>
            {data.loading ? '?' : count}
            <span css={`display: block; font-size: 19px;`}>
              korrekte løsninger
            </span>
          </h1>
          <Flex align="center" mb={40}>
            <Progressbar
              count={data.loading ? null : data._allSolutionsMeta.count}
            />
          </Flex>
        </Box>
        <TentScale mb={80} justify="space-around" align="center">
          {[...Array(tents)].map((_, index) => <HeartHouse key={index} />)}
          {tents < 12 &&
            [...Array(12 - tents)].map((_, index) => (
              <span key={index}>
                <TiHomeOutline css={`color: ${theme.colors.grayDark};`} />
              </span>
            ))}
          <hr />
          <small className="tick-0">0</small>
          <small className="tick-1000">1000</small>
          <small className="tick-4000">4000</small>
          <small className="tick-8000">8000</small>
          <small className="tick-13000">13000</small>
        </TentScale>
      </Container>
      <Section style={{ paddingTop: '50px' }}>
        <Container>
          <h3>
            Løs våre kodenøtter og bidra til å gi flyktninger i Irak et bedre
            hjem!
          </h3>
          <p>
            Julen er tiden for å gi, og i år vil Knowit, i samarbeid med{' '}
            <a href="http://www.unhcr.org/">UNHCR</a> - The UN Refugee Agency,
            bidra med innovative flyktningehjem i Irak.
          </p>
          <p>
            Teltene, kalt{' '}
            <a href="http://www.bettershelter.org/">Better Shelter</a>, er en
            type nødtelt som har revolusjonert livet for flyktningfamilier.
            Better Shelters er unike fordi de, i motsetning til de vanlige
            teltene, har en låsbar dør, vinduer som kan åpnes, faste vegger,
            samt isolasjon og ventilasjon som gir bedre beskyttelse mot både
            varme og kulde. Det er også et solpanel på taket som driver en
            elektrisk lampe og muliggjør lading via USB. Dette er en mye sikrere
            bolig for kvinner og barn som vanligvis er spesielt utsatte i disse
            områdene.
          </p>
          <p>
            Ved å løse oppgavene i vår kodekalender, bidrar du til å gi
            flyktninger i Irak et bedre hjem. Når antallet korrekte løsninger
            når 1 000, vil Knowit gi tre Better Shelter-telt, hver til en verdi
            av 14 500 kroner. Ved 4 000 riktige besvarelser gir vi tre telt til,
            og det samme når vi når 8 000 og 13 000 besvarelser.
          </p>
          <p css={`font-weight: bold;`}>
            Stå på, spre ordet, og tusen takk for din innsats!
          </p>
          <YouTube videoId="V9xegwnBWVQ" />
          <Flex mt={50} align="center" justify="space-around">
            <img
              src="/static/better-shelter/bettershelterlogolilla.png"
              css={`max-height: 96px; object-fit: scale-down; max-width: 50%;`}
            />
            <img
              css={`object-fit: scale-down; max-width: 50%;`}
              src="/static/better-shelter/unhcr-logo.png"
            />
          </Flex>
          <Flex />
        </Container>
      </Section>
    </Layout>
  );
};

const totalSolvedCount = gql`
  query {
    _allSolutionsMeta(filter: { solved: true }) {
      count
    }
  }
`;

export default compose(defaultPage, graphql(totalSolvedCount))(BetterShelter);

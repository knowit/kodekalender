import React from 'react';
import styled from 'react-emotion';
import Head from 'next/head';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import GoPerson from 'react-icons/lib/go/person';
import FaCheck from 'react-icons/lib/fa/check';

import defaultPage from '../hocs/defaultPage';
import Layout from '../components/Layout';
import Container from '../components/Container';
import theme from '../style/theme';
import Box from '../components/Box';
import media from '../style/media';

const Section = styled('section')`
  padding: 80px 0;
  p {
    line-height: 2;
  }
  h3 {
    font-size: 32px;
    line-height: 1.6;
    margin-top: 0;
    text-align: center;
    font-weight: normal;
  }
`;
const P = styled('p')`
  color: ${theme.colors.dark};
  font-size: 18px;
  text-align: center;
`;

const Icon = styled('div')`
  border-radius: 8px;
  padding: 15px;
  color: ${theme.colors.grayLight};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 60px;
    width: 60px;
    ${media.tablet`
      height: 100px;
      width: 100px;
    `};
  }
  ${media.tablet`
    display: inline-flex;
    margin-right: 20px;
  `};
`;

const Stat = styled('div')`
  margin-bottom: 70px;
  color: ${theme.colors.dark};

  h3 {
    margin: 0;
  }
  span {
    font-size: 60px;
    ${media.mobile`
      display: block;
      text-align: center;
    `};
  }
  ${media.tablet`
    display: flex;
  `};
`;

const Stats = ({ loggedInUser, usersData, solvesData }) => (
  <Layout loggedInUser={loggedInUser}>
    <Head>
      <title>Kodekalender: Tall</title>
    </Head>
    <Section style={{ paddingTop: '50px' }}>
      <Container>
        <Stat>
          <Icon css={`background: ${theme.colors.midnightBlue};`}>
            <GoPerson />
          </Icon>
          <Box>
            <h3>Antall brukere</h3>
            <span>
              {usersData.loading ? 'Laster' : usersData._allUsersMeta.count}
            </span>
          </Box>
        </Stat>
        <Stat>
          <Icon css={`background: ${theme.colors.success};`}>
            <FaCheck />
          </Icon>
          <Box>
            <h3>Antall korrekte løsninger</h3>
            <span>
              {solvesData.loading
                ? 'Laster'
                : solvesData._allSolutionsMeta.count}
            </span>
          </Box>
        </Stat>
        <P>
          Litt mer spennende tall kommer!<span
            css={`white-space: nowrap; font-size: 40px`}
          >
            ¯\_(ツ)_/¯
          </span>
        </P>
      </Container>
    </Section>
  </Layout>
);

const totalUsersCount = gql`
  query {
    _allUsersMeta {
      count
    }
  }
`;

const totalSolvedCount = gql`
  query {
    _allSolutionsMeta(filter: { solved: true }) {
      count
    }
  }
`;

export default compose(
  defaultPage,
  graphql(totalUsersCount, { name: 'usersData' }),
  graphql(totalSolvedCount, { name: 'solvesData' }),
)(Stats);

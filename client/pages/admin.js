import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import adminPage from '../hocs/adminPage';
import Flex from '../components/Flex';
import Layout from '../components/Layout';
import Container from '../components/Container';

const Admin = ({ loggedInUser }) => (
  <Layout loggedInUser={loggedInUser}>
    <Head>
      <title>Kodekalender: Admin</title>
    </Head>
    <Container>
      <h1>Admin</h1>
      <Flex justify="space-around">
        <Link href="/admin/challenges" prefetch>
          <a>View Challenges</a>
        </Link>
        <Link href="/admin/users" prefetch>
          <a>View Users</a>
        </Link>
      </Flex>
    </Container>
  </Layout>
);

export default adminPage(Admin);

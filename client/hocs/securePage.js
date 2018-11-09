import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import NotAuthorized from '../components/NotAuthorized';
import Layout from '../components/Layout';
import Container from '../components/Container';
import defaultPage from './defaultPage';

const securePageHoc = Page =>
  class SecurePage extends React.Component {
    static getInitialProps(ctx) {
      return Page.getInitialProps && Page.getInitialProps(ctx);
    }
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
    };
    render() {
      if (!this.props.isAuthenticated) {
        return (
          <Layout>
            <Head>
              <title>Kodekalender: Logg inn for å fortsette</title>
            </Head>
            <Container>
              <NotAuthorized />
            </Container>
          </Layout>
        );
      }
      return <Page {...this.props} />;
    }
  };

export default Page => defaultPage(securePageHoc(Page));

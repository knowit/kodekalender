import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children, loggedInUser, background }) => (
  // The CSS here makes the footer sticky
  <div css={`min-height: 100vh; display: flex; flex-direction: column;`}>
    <div>
      <Nav loggedInUser={loggedInUser} />
    </div>
    <div css={`flex: 1 0 auto;`} style={{ background }}>
      {children}
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  loggedInUser: PropTypes.object,
  background: PropTypes.string,
};

export default Layout;

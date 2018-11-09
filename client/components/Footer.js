import React from 'react';
import styled from 'react-emotion';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaMedium from 'react-icons/lib/fa/medium';
import FaGithub from 'react-icons/lib/fa/github-alt';

import theme from '../style/theme';
import Box from './Box';
import Container from './Container';

const Social = styled('a')`
  border-radius: 100px;
  width: 38px;
  height: 38px;
  background: #f1f1f1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease;
  color: #727272;
  margin-left: 19px;
  margin-right: 19px;

  &[data-social='facebook']:hover {
    background: #e2eafd;
  }
  &[data-social='twitter']:hover {
    background: #e8f2ff;
  }
  &[data-social='medium']:hover {
    background: #d2ffeb;
  }
  &[data-social='github']:hover {
    background: #33333333;
  }
`;

const Logo = styled('img')`
  display: block;
  height: 31px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
`;

const Footer = () => (
  <footer css={`border-top: 1px solid #f1f1f1; padding-top: 50px;`}>
    <Container>
      <Box textAlign="center">
        <Logo src="/static/knowit_black.png" alt="Knowit" />
        <Social
          data-social="facebook"
          href="https://www.facebook.com/knowitnorge/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook aria-label="Facebook" size={20} />
        </Social>
        <Social
          data-social="twitter"
          href="https://twitter.com/knowitnorge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter aria-label="Twitter" size={20} />
        </Social>
        <Social
          data-social="medium"
          href="https://knowitlabs.no/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMedium aria-label="Medium" size={20} />
        </Social>
        <Social
          data-social="github"
          href="https://github.com/knowit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub aria-label="GitHub" size={20} />
        </Social>
      </Box>
      <Box
        css={`border-top: 2px solid ${theme.colors.grayLight};`}
        py="15px"
        mt="25px"
        textAlign="center"
      >
        <a
          css={`color: inherit; font-weight: normal; &:hover, &:focus { font-weight: bold; }`}
          href="mailto:kodekalender@knowit.no"
        >
          kodekalender@knowit.no
        </a>
      </Box>
    </Container>
  </footer>
);

export default Footer;

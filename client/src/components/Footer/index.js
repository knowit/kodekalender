import React from 'react';
import { css, cx } from 'react-emotion';
import { FaFacebook, FaTwitter, FaMedium, FaGithub } from 'react-icons/fa';

import theme from '../../style/theme';
import Container from '../Container';
import knowitLogoSrc from './knowit_black.png';

const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <div>
        <img className={styles.knowitLogo} src={knowitLogoSrc} alt="Knowit" />
        <SocialLink
          href="https://www.facebook.com/knowitnorge/"
          css={`
            &:hover {
              background: #e2eafd;
            }
          `}
        >
          <FaFacebook aria-label="Facebook" />
        </SocialLink>
        <SocialLink
          href="https://twitter.com/knowitnorge"
          css={`
            &:hover {
              background: #e8f2ff;
            }
          `}
        >
          <FaTwitter aria-label="Twitter" />
        </SocialLink>
        <SocialLink
          data-social="medium"
          href="https://knowitlabs.no/"
          css={`
            &:hover {
              background: #d2ffeb;
            }
          `}
        >
          <FaMedium aria-label="Medium" />
        </SocialLink>
        <SocialLink
          href="https://github.com/knowit/kodekalender"
          css={`
            &:hover {
              background: #33333333;
            }
          `}
        >
          <FaGithub aria-label="GitHub repo" />
        </SocialLink>
      </div>
      <div
        css={`
          padding: 15px 0;
          margin-top: 25px;
          border-top: 2px solid ${theme.colors.grayLight};
        `}
      >
        <a className={styles.mailLink} href="mailto:kodekalender@knowit.no">
          kodekalender@knowit.no
        </a>
      </div>
    </Container>
  </footer>
);

const SocialLink = ({ href, className, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cx(styles.socialLink, className)}
  >
    {React.cloneElement(children, { size: 20 })}
  </a>
);

const styles = {
  footer: css`
    border-top: 1px solid #f1f1f1;
    padding-top: 50px;
    text-align: center;
  `,
  knowitLogo: css`
    display: block;
    height: 31px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
  `,
  mailLink: css`
    color: inherit;
    font-weight: normal;
    &:hover,
    &:focus {
      font-weight: bold;
    }
  `,
  socialLink: css`
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
  `,
};

export default Footer;

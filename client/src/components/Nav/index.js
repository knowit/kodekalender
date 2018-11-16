import React, { useState, useContext } from 'react';
import { css, cx } from 'react-emotion';
import { Link } from '@reach/router';

import auth from '../../auth';
import UserContext from '../UserContext';
import Container from '../Container';
import KnowitLogo from './knowit_symbol_black_white_cmyk.svg';
import theme from '../../style/theme';
import media from '../../style/media';
import HamburgerButton from './HambugerButton';

const Nav = () => {
  const [expanded, setExpanded] = useState(false);
  const currentUser = useContext(UserContext);

  return (
    <Container
      css={`
        width: 100%;
      `}
    >
      <div className={styles.header}>
        <Link to="/" aria-label="Hjem" className={styles.brandLogo}>
          <KnowitLogo />
        </Link>
        <HamburgerButton
          onClick={() => setExpanded(prev => !prev)}
          isExpanded={expanded}
        />
        <div className={cx(leftStyle, { [mobileHide]: !expanded })}>
          <Link to="/doors">Luker</Link>
          <Link to="/leaderboard">Ledertavle</Link>
          <Link to="/about">Om</Link>
          {/* <Link to="/better-shelter">
            Better Shelter <HeartHouse />
          </Link> */}
        </div>
        <div className={cx(rightStyle, { [mobileHide]: !expanded })}>
          {currentUser ? (
            <>
              {currentUser.role === 'ADMIN' && (
                <Link to="/admin/challenges">Admin</Link>
              )}
              <a role="button" tabIndex="0" onClick={auth.logout}>
                Logg ut
              </a>
            </>
          ) : (
            <a role="button" onClick={auth.login} tabIndex="0">
              Logg inn
            </a>
          )}
        </div>
      </div>
    </Container>
  );
};

// FIXME: Sort out this. Messiest CSS in the whole wide world atm
const anchorStyle = css`
  a {
    padding: 10px;
    text-decoration: none;
    text-transform: uppercase;
    color: #999;
    transition: color 0.2s ease;
    font-weight: normal;
    ${media.mobile`
      line-height: 3;
      display: block;
      border-bottom: 1px solid #f1f1f1;

    `};
  }
  a:hover {
    color: ${theme.colors.black};
  }
`;

const styles = {
  brandLogo: css`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-right: 10px;
  svg {
    height: 39px;
    width: 39px;
    margin-bottom -3px;
  }
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;
    font-size: 12px;

    ${media.mobile`
    display: block;
  `};
  `,
};

const leftStyle = css`
  ${anchorStyle};
  ${media.mobile`
    a:first-of-type {
      border-top: 1px solid #f1f1f1;
      margin-top: 20px;
    }
  `} ${media.tablet`
    display: flex;
    flex: 1;
  `};
`;

const rightStyle = css`
  ${anchorStyle};
  ${media.tablet`
    display: flex;
    a:last-of-type {
      padding-right: 0;
    }
  `};
`;

const mobileHide = css(media.mobile`display: none`);

export default Nav;

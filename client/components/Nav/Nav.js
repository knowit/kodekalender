import React from 'react';
import styled, { css } from 'react-emotion';
import Link from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import contain from '../../style/contain';
import HeartHouse from '../BetterShelter/HeartHouse';
import theme from '../../style/theme';
import Logo from './knowit_symbol_black_white_cmyk.svg';
import media from '../../style/media';

// FIXME: Sort out this. Messiest CSS in the whole wide world atm

const A = css`
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

const Header = styled('header')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px;
  font-size: 12px;

  ${media.mobile`
    display: block;
  `};
  ${contain};
`;

const Left = styled('div')`
  ${A};
  ${media.mobile`
    a:first-of-type {
      border-top: 1px solid #f1f1f1;
      margin-top: 20px;
    }
    &.hide {
      display: none;
    }
  `} ${media.tablet`
    display: flex;
    flex: 1;
  `};
`;

const Right = styled('div')`
  ${A};
  ${media.mobile`
    &.hide {
      display: none;
    }
  `} ${media.tablet`
    display: flex;
    a:last-of-type {
      padding-right: 0;
    }
  `};
`;

const BrandLink = styled('a')`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-right: 10px;
  svg {
    height: 39px;
    width: 39px;
    margin-bottom -3px;
  }
`;

const Button = styled('button')`
  width: 24px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 0;
  float: right;
  &:before {
    content: '';
    opacity: 0;
    width: 0;
    height: 0;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    background: transparent;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }
  ${media.tablet`
    display: none;
  `};
`;

const Line = css`
  width: 100%;
  height: 2px;
  transition: all 0.4s ease;
  background: ${theme.colors.black};
`;
const BurgerLines = styled('span')`
  ${Line};
  display: block;
  position: relative;

  &:before,
  &:after {
    content: '';
    ${Line};
    position: absolute;
    left: 0;
  }

  &:before {
    top: -6px;
  }
  &:after {
    bottom: -6px;
  }
`;

const isActive = css`
  background: transparent;
  &:before {
    transform: rotate(225deg);
    top: 0;
  }
  &:after {
    transform: rotate(-225deg);
    bottom: 0;
  }
`;

class Nav extends React.Component {
  state = {
    isExpanded: false,
  };

  // TODO: Bold active link
  render() {
    const { loggedInUser, router } = this.props;
    return (
      <Header>
        <Link href="/" passHref>
          <BrandLink aria-label="Hjem">
            <Logo />
          </BrandLink>
        </Link>
        <Button
          onClick={() =>
            this.setState(state => ({ isExpanded: !state.isExpanded }))
          }
        >
          <BurgerLines className={this.state.isExpanded && isActive} />
        </Button>
        <Left className={!this.state.isExpanded && 'hide'}>
          <Link href="/challenges" prefetch>
            <a>Luker</a>
          </Link>
          <Link href="/stats" prefetch>
            <a>Tall</a>
          </Link>
          <Link href="/about" prefetch>
            <a>Om</a>
          </Link>
          <Link href="/better-shelter" prefetch>
            <a>
              Better Shelter <HeartHouse />
            </a>
          </Link>
        </Left>
        <Right className={!this.state.isExpanded && 'hide'}>
          {loggedInUser ? (
            [
              loggedInUser.role === 'ADMIN' && (
                <Link key="admin" href="/admin/challenges" prefetch>
                  <a>Admin</a>
                </Link>
              ),
              <Link key="sign-off" href="/auth/sign-off">
                <a>Logg ut</a>
              </Link>,
            ]
          ) : (
            <Link href="/auth/sign-in" prefetch>
              <a>Logg inn</a>
            </Link>
          )}
        </Right>
      </Header>
    );
  }
}

Nav.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  loggedInUser: PropTypes.shape({
    role: PropTypes.oneOf(['USER', 'ADMIN']),
  }),
};

export default withRouter(Nav);

import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import theme from '../../style/theme';
import media from '../../style/media';

const Window = styled('div')`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 20px 50px 0px;
  border: 1px solid rgb(204, 204, 204);
`;

const Header = styled('div')`
  height: 36px;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const Icon = styled('span')`
  height: 12px;
  width: 12px;
  border-radius: 50px;
  display: inline-block;
  top: 11px;
  position: absolute;
`;

const Console = styled('div')`
  font-family: ${theme.fontFamilyCode}
  line-height: 24px;
  font-size: 14px;
  margin: 20px;
  ${media.tablet`
    margin: 20px 40px;
  `}
  word-wrap: break-word;
  p {
    margin-top: 0;
    margin-bottom: 20px;
  }
  hr {
    background-color: rgba(0, 0, 0, 0.12);
    border: 0;
    height: 1.5px;
    margin: 24px 0;
  }
`;

const Title = styled('div')`
  color: rgb(153, 153, 153);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Terminal extends React.Component {
  static defaultProps = {
    windowTitle: 'bash',
  };

  render() {
    return (
      <Window>
        <Header>
          <Title>{this.props.windowTitle}</Title>
          <Icon style={{ backgroundColor: 'rgb(255, 95, 86)', left: '13px' }} />
          <Icon
            style={{ backgroundColor: 'rgb(255, 189, 46)', left: '33px' }}
          />
          <Icon style={{ backgroundColor: 'rgb(39, 201, 63)', left: '53px' }} />
        </Header>
        <Console>{this.props.children}</Console>
      </Window>
    );
  }
}

Terminal.propTypes = {
  windowTitle: PropTypes.string,
};

export default Terminal;

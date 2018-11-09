import React from 'react';
import { css } from 'react-emotion';
import PropTypes from 'prop-types';

import theme from '../style/theme';
import media from '../style/media';

class Terminal extends React.Component {
  static defaultProps = {
    windowTitle: 'bash',
  };

  render() {
    return (
      <div className={styles.window}>
        <div className={styles.titlebar}>
          <div className={styles.windowtitle}>{this.props.windowTitle}</div>
          <span
            className={styles.circle}
            style={{ backgroundColor: 'rgb(255, 95, 86)', left: '13px' }}
          />
          <span
            className={styles.circle}
            style={{ backgroundColor: 'rgb(255, 189, 46)', left: '33px' }}
          />
          <span
            className={styles.circle}
            style={{ backgroundColor: 'rgb(39, 201, 63)', left: '53px' }}
          />
        </div>
        <div className={styles.shell}>{this.props.children}</div>
      </div>
    );
  }
}

Terminal.propTypes = {
  windowTitle: PropTypes.string,
};

const styles = {
  window: css`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 20px 50px 0px;
    border: 1px solid rgb(204, 204, 204);
  `,
  titlebar: css`
    height: 36px;
    display: flex;
    align-items: stretch;
    justify-content: center;
  `,
  windowtitle: css`
    color: rgb(153, 153, 153);
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  circle: css`
    height: 12px;
    width: 12px;
    border-radius: 50px;
    display: inline-block;
    top: 11px;
    position: absolute;
  `,
  shell: css`
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
  `,
};

export default Terminal;

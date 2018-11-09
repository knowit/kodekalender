import React from 'react';
import styled from 'react-emotion';
import YouTube from 'react-youtube';

/**
 * Wraps React-Youtube and makes it responsive (16:9 aspect ratio)
 */
const Div = styled('div')`
  > span {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding-bottom: 56.25%;
  }
  iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export default props => (
  <Div>
    <YouTube {...props} />
  </Div>
);

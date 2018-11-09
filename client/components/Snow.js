import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';
import theme from '../style/theme';

const fallingAnimation = keyframes`
0% {
  transform: translate3D(-7.5%, -100%, 0);
}
100% {
  transform: translate3D(7.5%, 100%, 0);
}
`;

/*.winter-is-coming, .snow {
  z-index: 100;
  pointer-events: none;
}

.winter-is-coming {
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: 100%;
  background: #333;
}

.snow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-animation: falling linear infinite both;
          animation: falling linear infinite both;
  -webkit-transform: translate3D(0, -100%, 0);
          transform: translate3D(0, -100%, 0);
}
.snow--near {
  -webkit-animation-duration: 10s;
          animation-duration: 10s;
  background-image: url("https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-large-075d267ecbc42e3564c8ed43516dd557.png");
  background-size: contain;
}
.snow--near + .snow--alt {
  -webkit-animation-delay: 5s;
          animation-delay: 5s;
}
.snow--mid {
  -webkit-animation-duration: 20s;
          animation-duration: 20s;
  background-image: url(https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-medium-0b8a5e0732315b68e1f54185be7a1ad9.png);
  background-size: contain;
}
.snow--mid + .snow--alt {
  -webkit-animation-delay: 10s;
          animation-delay: 10s;
}
.snow--far {
  -webkit-animation-duration: 30s;
          animation-duration: 30s;
  background-image: url(https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-small-1ecd03b1fce08c24e064ff8c0a72c519.png);
  background-size: contain;
}
.snow--far + .snow--alt {
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
}

@-webkit-keyframes falling {
  0% {
    -webkit-transform: translate3D(-7.5%, -100%, 0);
            transform: translate3D(-7.5%, -100%, 0);
  }
  100% {
    -webkit-transform: translate3D(7.5%, 100%, 0);
            transform: translate3D(7.5%, 100%, 0);
  }
}

@keyframes falling {
  0% {
    -webkit-transform: translate3D(-7.5%, -100%, 0);
            transform: translate3D(-7.5%, -100%, 0);
  }
  100% {
    -webkit-transform: translate3D(7.5%, 100%, 0);
            transform: translate3D(7.5%, 100%, 0);
  }
}*/

// Original https://codepen.io/iamjamie/pen/wzbEXG
const Section = styled('section')`
  position: relative;
  overflow: hidden;
  background: ${theme.colors.midnightBlue};
  color: ${theme.colors.grayLight};
  padding: 80px 0;
  text-align: center;
  p {
    line-height: 2;
    font-size: 18px;
  }
  h3 {
    font-size: 32px;
    line-height: 1.6;
    margin-top: 0;
    font-weight: normal;
  }
`;

const SnowFlakes = styled('div')`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: ${fallingAnimation} linear infinite both;
  background-image: url('/static/snow-large-075d267ecbc42e3564c8ed43516dd557.png');
  background-size: contain;
  animation-duration: 10s;

  &.second {
    animation-delay: 10s;
  }
`;

const SnowSection = ({ children }) => {
  return (
    <Section>
      <SnowFlakes />
      <SnowFlakes style={{ animationDelay: '5s' }} />
      {children}
    </Section>
  );
};

SnowSection.propTypes = {
  children: PropTypes.any,
};

export default SnowSection;

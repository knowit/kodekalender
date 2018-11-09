//import { normalize } from 'polished';
import theme from './theme';

// should be ${normalize(true)} here, but emotion struggles then, so doing it directly in _document.js
export default `
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    background-color: #fff;
    color: #000;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    margin: 0;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: ${theme.colors.link};
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }

  pre {
    font-family: ${theme.fontFamilyCode};
    line-height: 20px;
    white-space: pre-wrap;
    margin: 0;
  }

  strong {
    font-weight: bold;
  }
`;

import { injectGlobal } from 'emotion';
import theme from './theme';

injectGlobal`
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
    height: 100%;
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

  #root {
    height: 100%;
    > div {
      height: 100%;
    }
  }

  a {
    color: ${theme.colors.link};
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }

  pre {
    line-height: 20px;
    white-space: pre-wrap;
    margin: 0;
  }

  strong {
    font-weight: bold;
  }
`;

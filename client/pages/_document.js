import NextDocument, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';
import { injectGlobal } from 'react-emotion';
import { normalize } from 'polished';

import globalStyles from '../style/global';

injectGlobal`
  ${normalize(true)}
  ${globalStyles}
`;

export default class Document extends NextDocument {
  static getInitialProps({ renderPage }) {
    const page = renderPage();

    // Extract Emotion's styles for SSR
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html lang="nb">
        <Head>
          {/* Viewport for responsive web design */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="En julekalender for deg som er glad i programmering. Hilsen Knowit"
          />
          <meta
            property="og:image"
            content="/static/knowit_symbol_black_white_rgb.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="385" />
          <meta property="og:image:height" content="409" />

          {/* Emotion's styles are injected here when SSRed*/}
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <link
            rel="icon"
            type="image/png"
            href="/static/knowit_symbol_black_white_rgb.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

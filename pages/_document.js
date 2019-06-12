import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    // collectStyles, helps gather all the page styles before the page is served up.
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

/*

this is a next.js specific file, used to let next know of any dependencies, including styles that need to be rendered by the server. Helps with FOUT, specifically with Next.js Basically anything
we define here next knows it needs before the page is served up, in the case of styles, any styles
necc. for the current page to render will be added to the head tag of the document before it's
rendered -- eliminating FOUT

*/

import App, { Container } from 'next/app';
// importing app & container from next's app config

import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

import Page from '../components/Page'



class MyApp extends App {
  // NOTE: extending from next js <App/>


  static async getInitialProps({ Component, ctx }) {
    // getInitialProps is a lifecycle method specific to next.js
    // it gets run before the first initial render.
    // Anything exposed from there will then be available from props in the render method.
    // essentially this will crawl every page that we load for any relevant queries and/or mutations that are available to us. This allows us to ensure that the data is available when the page renders.

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      // sets up initialProps from ctx.
    }
    // exposes the query to the users.
    (pageProps) ? pageProps.query = ctx.query : console.log('noPageProps', pageProps)

    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    // destructure <Component/> from props
    // destructure apollo from props.

    return (
      <Container>   {/* Next js container */}

        <ApolloProvider client={apollo}> {/* sets up provider for app.  */}

          <Page>    {/* <Page /> used as a wrapper for <Component /> */}

            <Component {...pageProps} />   {/* destructured above from props */}

          </Page>
        </ApolloProvider>


      </Container>
    )
  }
}

export default withData(MyApp)

//next.js custom _app.js override as per docs:
//https://github.com/zeit/next.js/#custom-app


//next.js custom _app.js override as per docs:
//https://github.com/zeit/next.js/#custom-app


import App, { Container } from 'next/app';
// importing app & container from next's app config

import Page from '../components/Page'



export default class MyApp extends App {
  // NOTE: extending from next js <App/>

  render() {
    const { Component } = this.props;
    // destructure <Component/> from props

    return (
      <Container>   {/* Next js container */}

        <Page>    {/* <Page /> used as a wrapper for <Component /> */}

          <Component />   {/* destructured above from props */}

        </Page>


      </Container>
    )
  }
}

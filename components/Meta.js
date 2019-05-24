import Head from 'next/head';
// imports custom <Head/> from next js.

const Meta = () => (

  <Head>
    {/* // Sets up head tag details for web app */}

    <meta name="viewport" content="width-device-width, initial-scale=1" />
    <meta charSet="utf-8" />

    {/* <link rel="shortcut icon" href="/static/favicon.png" /> */}
    <link rel="stylesheet" type="text/css" />

    <title>Sick Fits!</title>

  </Head>
)

export default Meta;

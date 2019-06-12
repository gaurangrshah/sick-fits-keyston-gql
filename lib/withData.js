import withApollo from 'next-with-apollo';
// HOC that exposes Apollo Client via a prop which configures with Next.js server-side rendering.

import ApolloClient from 'apollo-boost';
// apollo-boost is what handles caching, errors, loading states, etc.

import { endpoint } from '../config';
// endpoint from config.js - which handles our front-end config.

function createClient({ headers }) {
  // createClient takes in headers

  // returns a new client:
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    // passing in the url of the endpoint
    request: operation => {
      // express middleware - includes credentials with every request using logged in
      // cookies from the browser.
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);


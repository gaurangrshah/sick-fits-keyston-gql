import withApollo from 'next-with-apollo';
// HOC that exposes Apollo Client via a prop which configures with Next.js server-side rendering.
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../components/Cart';

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
    // apollo config to handle clientside local data:
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) { // cache destructured from 'client'
            const { cartOpen } = cache.readQuery({
              // 1. access cartOpen from local state:
              query: LOCAL_STATE_QUERY,
            });
            console.log(cartOpen)
            const data = {
              // toggle cartOpen:
              data: { cartOpen: !cartOpen }
            };
            // 3. Set cartOpen back to local state:
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: true,
      }
    },

  });
}

export default withApollo(createClient);


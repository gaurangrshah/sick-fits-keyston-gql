import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      #signout mutation returns a message
      message
    }
  }
`;


const Signout = () => (
  <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {/* refetchQueries will allow us to re-render the button when the user gets signed out successfully, after mutation returns the message. */}
    {(signout) => <button onClick={signout}>Sign Out</button>}
  </Mutation>
);

export default Signout

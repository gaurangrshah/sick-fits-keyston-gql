import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  // fires after mutation finishes - takes in the (cache, payload).
  // caches gives us access to everything in cache, payload is the info return from server, we expect the id of the item from the mutation that gets resolved.
  update = (cache, payload) => {
    // console.log('Running remove from cart update fn') //⚠️
    // used to un-render cart items when removed:

    // 1. read cache
    const data = cache.readQuery({
      query: CURRENT_USER_QUERY
    });
    // console.log(data); //⚠️

    // 2. remove that item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    // removeFromCart is a mutation available on payalod.data
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // remove item if the cartItem's id doesn't match the id we extractex into cartItemId

    // 3. write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  }


  render() {
    return (

      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation', // we expect the a mutation type to be returned
          removeFromCart: {   // we expect a method called removeFromCart
            __typename: 'CartItem', // expecing an item of type: CartItem
            id: this.props.id,  // expect CartItem to have an id
          } // defining optimisticReponse, mimics the behavoir of the data returned from the server.
        }}
      >
        {(removeFromCart, { loading, error }) => (
          <BigButton
            title="Delete Item"

            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}

            disabled={loading}
          >
            {loading ? '' : '❌'}
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;

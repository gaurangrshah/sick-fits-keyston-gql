import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';

import User from './User';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';

// Local State Query:
const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client,
    # @client tells apollo this data from local store --  not in remote/db.
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  // having to use render to render children, which are expected for each of these components
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
  // allows us to consolidate all of our render props into one component.
});

const Cart = () => {
  return (

    <Composed>
      {/* accessing the items we render from Composed */}
      {({ user, toggleCart, localState }) => {
        const me = user.data.me;
        if (!me) return null;
        return (

          <CartStyles
            // now access data from the localState defined in the Composed component.
            open={localState.data.cartOpen}
          >
            <header>
              <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
              <Supreme>{me.name}'s Cart</Supreme>
              <p>You have {me.cart.length} item{me.cart.length === 1 ? '' : 's'} in your cart.</p>

            </header>
            <ul>
              {me.cart.map((cartItem) =>
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                />
              )}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(me.cart))}</p>
              {/* takes in the entire cart and returns total */}

              {me.cart.length && ( // removes checkout button if cart is empty
                <TakeMyMoney> {/* component that handles stripe checkout */}
                  <SickButton>Checkout</SickButton>
                </TakeMyMoney>
              )}
            </footer>
          </CartStyles>


        );
      }}
    </Composed>
  )
}

export default Cart
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }

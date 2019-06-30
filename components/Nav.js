import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import CartCount from './CartCount'
import { Mutation } from 'react-apollo'
import { TOGGLE_CART_MUTATION } from './Cart';

const Nav = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null
      return (
        <NavStyles data-test="nav">
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <Signout />
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {(toggleCart) => (
                  // using the toggleCart method from the mutation to toggle cartOpen from local state
                  <button onClick={toggleCart}>
                    My Cart
                  <CartCount
                      // count the # of actual items in the cart using reduce to count up each item and its quantity.
                      count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}
                    >

                    </CartCount>
                  </button>
                )}
              </Mutation>
            </>
          )}
          {!me && (
            <Link href="/signup">
              <a>Sign In</a>
            </Link>

          )}
        </NavStyles>
      )
    }}
  </User>
);

export default Nav;

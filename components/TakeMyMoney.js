import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'next/router';
import Router from 'next/router';
import Nprogress from 'nprogress';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

class TakeMyMoney extends Component {
  render() {
    return <User>{({ data: { me } }) => <StripeCheckout>{this.props.children}</StripeCheckout>}</User>
  }
}

export default TakeMyMoney;

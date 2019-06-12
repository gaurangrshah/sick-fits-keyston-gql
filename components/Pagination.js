import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import Error from './ErrorMessage';

import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';


const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
    #pulling the count (# of items) from aggregate:
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      const count = data.itemsConnection.aggregate.count; // referencing the db's aggregate count
      const pages = Math.ceil(count / perPage); // references the variable imported from `config.js`
      const page = props.page
      // destructuring page off props, because the head tag cannot access the data from props
      return (
        <PaginationStyles>
          <Head>
            <title>Sick Fits! - Page: {page} of {pages}</title>
          </Head>
          <Link prefetch href={{
            pathname: 'items',
            query: { page: page - 1 },
            // will subtract  from the current page.
          }}>
            {/* back button label */}
            <a className="Prev" aria-disabled={page <= 1}>⬅ Prev</a>
          </Link>

          <p>{page} of {pages}</p>
          <p>{count} Items Total</p>
          <Link prefetch href={{
            pathname: 'items',
            query: { page: page + 1 },
            // will subtract  from the current page.
          }}>
            {/* back button label */}
            <a className="Next" aria-disabled={page >= pages}>Next ➡</a>
          </Link>
        </PaginationStyles>
      ) // output pages.
    }}
  </Query>
)

export default Pagination;

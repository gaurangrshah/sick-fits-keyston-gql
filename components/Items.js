import React, { Component } from 'react'
import { Query } from 'react-apollo'
// query allows us to query from our database.
import gql from 'graphql-tag';
// allows us to define queries in javascript using tagged template literals.
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config'
// perPage is a variable that references the number: 4


const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int=0, $first: Int=${perPage}) {
    # skip accepts an integer, and is defaulted to 0
    # first accepts an integer, and is defaulted to the value imported via perPage

    #for the output, defines the args and the expected variables for them:
    # , orderBy: createdAt_DESC
    items(first: $first, skip: $skip) {
      #expected output fields:
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
   /* pulls in the max-width fromour global styles defined earlier */
`;

class Items extends Component {
  render() {
    // return a simple string.
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            // createing defaults and defining variables to programmatically control # of items shown.
            skip: this.props.page * perPage - perPage || 0,
            first: perPage || 6,
          }}
        >
          {
            // (payload) => {
            ({ data, error, loading }) => {
              console.log('payload:', { data, error, loading });
              if (loading) return <p>Loading...</p>
              if (error) return <p>Error: {error.message}</p>
              // console.log(data.items.length);
              return (
                <ItemsList>
                  {data.items.map(item =>
                    <Item item={item} key={item.id} />
                  )}
                </ItemsList>
              )
            }
          }
        </Query>
        <Pagination page={this.props.page} />
      </Center >
    )
  }
}

export default Items;
export { ALL_ITEMS_QUERY }

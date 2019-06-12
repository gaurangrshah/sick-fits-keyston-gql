import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    # requires an ID!
    deleteItem(id: $id) {
      #passes in the id referenced by the $id variable defined above.
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    // update method has access to the cache and payload -- and allows us to manually update cache

    // 1. read items for items we want - must define a gql query to handle this.
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // use the ALL_ITEMS_QUERY to access all the items we have in cache.
    console.log(data);


    // 2. filter deleted item out of cache
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
    // removes the item that matches the id of the deleted item from the payload

    // 3. return new cache
    cache.writeQuery({query: ALL_ITEMS_QUERY, data});
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        /* grabbing the 'id' of the item to be removed from props. */
        update={this.update}
      >

        {(deleteItem, { error }) => (
          /* function takes in the mutation and any errors: */

          < button onClick={() => {
            // ask for confirmation.
            if (confirm('Are you sure?')) {
              deleteItem().catch(err => {
                alert(err.message);
              });
            }
          }}
          >
            {this.props.children}
            {/* this.props.children is just displaying the button label from parent */}
          </button>

        )
        }
      </Mutation>
    );
  }
}
export default DeleteItem;

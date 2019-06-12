import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
// importing Query which allows us to query for data.

import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
// has built-in error message handling and formatting

const SINGLE_ITEM_QUERY = gql`
# query for single items.
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      #returns:
      id
      title
      description
      price
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
# first part is equivalent to a function call
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
  # set types for each arg. and/or variables for each field

    updateItem(id: $id, title: $title, description: $description, price: $price) {
      # placeholders for content to be returned after submission
      # each assigned to a variable('$' - from template tags) of the same name -
      # '$' represents a variable, and reference the title string passed in in the above argument
      # references the items from the mutation defined in Mutation.js
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {

  state = {};
  // state is a blank object, and will get any updated fields added.

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    // corecing any inputs of type number to numerical values before setting state.
    console.log('UpdateItemChange', { name, type, value })
    this.setState({ [name]: val });
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('UPDATE_ITEM_MUTATION', this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    console.log('Updated!!');
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id, }}>
        {/* Query component runs the SINGLE_ITEM_QUERY with the id from props */}

        {({ data, loading }) => {
          // destructure data & loading off of the payload from apollo, and return the rest of our component including the mutation:
          console.log('🚧', data);

          (loading) ? <p>Loading...</p> : null;
          // once loaded then:
          (!data.item) ? <p>No Data Found for this item {this.props.id}</p> : null

          return (

            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>

                    {/* using the defaultValue prop because we don't want to save all this data to state, only the data for any fields that get changed will get set to state. */}

                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={data.item.price}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        required
                        defaultValue={data.item.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };

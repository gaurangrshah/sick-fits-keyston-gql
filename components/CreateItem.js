import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo';
// allows us to run mutations from javascript to interface with graphQL db.
import gql from 'graphql-tag';

import Form from './styles/Form'
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
// has built-in error message handling and formatting

const CREATE_ITEM_MUTATION = gql`
# first part is equivalent to a function call
  mutation CREATE_ITEM_MUTATION (
      # set types for each arg. and/or variables for each field
      $title: String!
      $description: String!
      $price:Int!
      $image:String
      $largeImage:String
  ) {
    createItem(
      # placeholders for content to be returned after submission
      # each assigned to a variable('$' - from template tags) of the same name -
      # '$' represents a variable, and reference the title string passed in in the above argument
      # references the items from the mutation defined in Mutation.js
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {

  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value;
    // corecing any inputs of type number to numerical values before setting state.
    console.log('handleChange', { name, type, value })

    this.setState({ [name]: val })
  }

  uploadFile = async (e) => {
    // will get triggered when someone selects a file to upload.
    console.log('uploading file');
    const files = e.target.files; // pulling uploaded files off e.target
    const data = new FormData(); // using javascript FormData api to prep form data.
    data.append('file', files[0]); // appends data to the file, targeting the first file it finds.
    data.append('upload_preset', 'sickfits'); // upload is a preset, that cloudinary needs.

    //fetching from cloudinary, passing the body in with the method as a second argument.
    const res = await fetch('https://api.cloudinary.com/v1_1/dvog5yjvc/image/upload', {
      method: 'POST',
      body: data,
    })

    //handle response
    const file = await res.json(); // converts the reponse object to a json object.
    console.log(file);

    // set image from response to state:
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }

  render() {
    return (

      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (

          <Form data-test="form" onSubmit={async (e) => {
            e.preventDefault();
            e.persist();
            const res = await createItem();
            console.log('CREATE_ITEM_MUTATION', { e, res });

            // redirects user using the pathname and id from the query
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id },
            });
          }}>

            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>

              <label htmlFor="file"> Image
                <input type="file" id="file" name="file" placeholder="upload an image"
                  // value={this.state.image}
                  onChange={this.uploadFile} required />
                {/* displays image after successful upload */}
                {this.state.image && <img src={this.state.image} alt="upload preview" />}

              </label>


              <label htmlFor="title"> Title
                <input type="text" id="title" name="title" placeholder="title" value={this.state.title} onChange={this.handleChange} required />
              </label>

              <label htmlFor="price"> Price
                <input type="number" id="price" name="price" placeholder="price" value={this.state.price} onChange={this.handleChange} required />
              </label>

              <label htmlFor="description"> Description
                <textarea type="textarea" id="description" name="description" placeholder="Enter a Description" value={this.state.description} onChange={this.handleChange} required />
              </label>

              <button type="submit">Submit</button>
            </fieldset>

          </Form>

        )}
      </Mutation>

    )
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION }

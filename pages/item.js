import React, { Component } from 'react'
import SingleItem from '../components/SingleItem';

const item = (props) => {
  return (
    <div>
      <SingleItem id={props.query.id} />
      {/* passed in the id that we'll need in order to query for and render the item.  available to us via pageProps */}
    </div>
  )
}
export default item

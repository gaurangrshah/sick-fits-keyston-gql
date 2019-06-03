import React, { Component } from 'react'

import Header from './Header';
// imports <Header/> to render on each page from here.

import Meta from './Meta';
// imports <Meta/> and <head> details

import styled from 'styled-components';
// imports component needed for styling react components inline


// styled components use tagged template literal to define component styles.
const MyButton = styled.button`
/* styles for MyButton which is a "styled.button" */

  background: red;

  /* you can pass in logic into the property values.  */
  font-size: ${props => (props.huge ? '100px' : '50px')};

  /* you can nest selectors in styled components */
  span {
    font-size: 100px;
  }

`;


export default class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}

        <MyButton><span>💩</span>Click Me</MyButton>
        {/* button component used to test style-components styling
            note that the styld.button actually replaces the <button> component.
        */}

        {/* We can also pass in props in our styled components:  */}
        <MyButton huge="200"><span>💩</span>Click Me</MyButton>
        {/* we can even override the styles with the props by passing in a value. */}
      </div >
    )
  }
}

import React, { Component } from 'react'

import styled, { ThemeProvider, injectGlobal } from 'styled-components';
// imports component needed for styling react components inline
// Also need Theme Provider to work with Themes and injectGlobal.

import Header from './Header';
// imports <Header/> to render on each page from here.

import Meta from './Meta';
// imports <Meta/> and <head> details


const theme = {
  // aside from standard styling styled components has a concept of themes, which is just an object full of property values that you wish to reuse through the application.
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',

};

// NOTE: themes are defined are objects, note the strings as values vs. the css like syntax of styled components below.
const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
   /* references the properties defined on the theme object above */
  background: ${props => props.theme.lightgrey};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
#font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
  html{
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  box {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
`


export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        {/* usage of the theme provider, allows us to configure which theme we're consuming from */}
        <StyledPage>{/* styles defined above are now used as the component wrapper */}
          <Meta />
          <Header />
          <Inner> {this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

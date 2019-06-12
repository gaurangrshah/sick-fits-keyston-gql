import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';

import Nav from './Nav';
// importing <Nav/>
import Router from 'next/router';
import NProgress from 'nprogress';
//package for progress indicators to use as loaders.


Router.onRouteChangestart = () => {
  console.log('onRouteChangeStart Triggered')
  NProgress.start();
}
Router.onRouteChangecomplete = () => {
  console.log('onRouteChangeComplete Triggered')
  NProgress.done()
}
Router.onRouteChangeerror = () => {
  NProgress.done()
  console.log('onRouteChangeError Triggered')
}

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a{
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    /* media queries can be nested with selectors to target specific elements. */
    margin: 0;
    text-align: center;
  }
`;


const StyledHeader = styled.header`
  /* background: blue; */
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: space-between;
    align-items: stretch;
    @media(max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
    .sub-bar {
      grid-template-columns: 1fr auto;
      border-bottom: 1px solid ${props => props.theme.lightgrey}
    }
`;


const Header = () => {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <span><Link href="/"><a>Sick Fits</a></Link></span>
        </Logo>
        <Nav />
        {/* adds nav links */}
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </StyledHeader>
  )
}

export default Header;

// <Header/> gets imported into <Page/> so that it is displayed on every page as intended.


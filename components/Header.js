import React from 'react';

import Nav from './Nav';
// importing <Nav/>


const Header = () => {
  return (
    <div>
      <div className="bar">
        <span>👖</span> <a href="">Sick Fits</a>
        <Nav />
        {/* adds nav links */}
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </div>
  )
}

export default Header;

// <Header/> gets imported into <Page/> so that it is displayed on every page as intended.


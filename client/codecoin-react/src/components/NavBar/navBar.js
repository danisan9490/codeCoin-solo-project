import React from 'react';


function NavBar() {

  return (
    <nav class="navbar text-white bg-primary justify-content-between ">
      <div class="navbar-brand bg-primary"> <h1>codeCoin</h1></div>
      <form class="form-inline">
        {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
        {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
      </form>
    </nav>
  );
}
export default NavBar;

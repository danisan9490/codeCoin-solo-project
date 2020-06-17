import React from 'react';


function NavBar() {

  return (
    <div className="position-relative overflow-hidden p-1 p-md-1  text-center bg-light">
      <div className="col-md-5 p-lg-3 mx-auto my-5">
        <img src="https://cdn.pixabay.com/photo/2018/02/18/20/48/bitcoin-3163494_960_720.png" style={{ maxWidth: 450 }} alt="" />
        <h1 className="display-4 font-weight-bold">codeCoin</h1>
        <p className="lead font-weight-normal">A new coin based in the blockChain</p>
      </div>
    </div>
  );
}
export default NavBar;

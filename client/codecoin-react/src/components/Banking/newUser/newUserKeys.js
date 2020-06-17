import React from 'react';


function Userkeys({ stateKeys }) {
  return (
    <div className=" container col mt-2 p-3 text-left">
      <div className="row">
        <div className="container mt-3">
          <h4>Public Key</h4>
          <h6>Use this key to Check your balance or Mine a new block.</h6>
          {
            stateKeys === [] ? "" : stateKeys.publicKey
          }
        </div>
      </div>
      <div className="row">
        <div className="container mt-3">
          <h4>Private Key</h4>
          <h6>Use this key to Sign and Send codeCoins.</h6>
          {
            stateKeys === [] ? "" : stateKeys.privateKey
          }
        </div>
      </div>

    </div>
  )
}

export default Userkeys;
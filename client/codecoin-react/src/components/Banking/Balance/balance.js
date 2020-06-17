import React from 'react';


function Balance({ stateBalance }) {

  return (
    <div className="row  mt-2 p-2 text-center">
      <div className="col">
        <h4>Current Balance</h4>
        <h1>
          {
            stateBalance === undefined ? 0 : stateBalance.balance
          }
        </h1>
      </div>
      <div className="col">
        <h4>Pending Balance</h4>
        <h1>
          {
            stateBalance === undefined ? 0 : stateBalance.pendingBalance
          }
        </h1>
      </div>
    </div>
  )
}

export default Balance;
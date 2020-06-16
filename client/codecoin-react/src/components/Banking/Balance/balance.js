import React from 'react';


function Balance({ state }) {

  return (
    <div className="list">
      <div>
        {
          state.balance
        }
      </div>
      <div>
        {
          state.pendingBalance
        }
      </div>
    </div>
  )
}

export default Balance;
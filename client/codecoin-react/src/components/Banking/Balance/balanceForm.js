import React, { useState } from 'react';
import Balance from './balance';

const initialState = {
  publicKey: '',
};

function GetBalanceForm({ getBalance, stateBalance }) {

  const [state, setState] = useState(initialState);

  function handleChange({ target }) {
    setState(state => ({
      ...state,
      [target.name]: target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.publicKey)
      getBalance(state.publicKey);
    setState(initialState);
  }

  return (
    <form className="form bg-white" onSubmit={handleSubmit}>
      <div className="col-6 p-3 float-right">
        <h3>Check your balance</h3>
        <div className="p-2">
          <input type="text" className="form-control " placeholder="GET BALANCE" name="publicKey" value={state.publicKey} onChange={handleChange} />
        </div>

        <div className="p-2">
          <button type="submit" className="btn btn-secondary btn-block">Get balance</button>
        </div>
        <Balance stateBalance={stateBalance} />
      </div>
    </form>
  );
}
export default GetBalanceForm;

import React, { useState } from 'react';

const initialState = {
  publicKey: '',
};

function GetBalanceForm({ getBalance }) {

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
    <form className="form  bg-primary" onSubmit={handleSubmit}>
      <div className="form-row height ">
        <div className="col-7">
          <input type="text" className="form-control " placeholder="GET BALANCE" name="publicKey" value={state.publicKey} onChange={handleChange} />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-secondary btn-block">Get balance</button>
        </div>
      </div>
    </form>
  );
}
export default GetBalanceForm;

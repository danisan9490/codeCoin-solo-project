import React, { useState } from 'react';

const initialState = {
  fromAddressPublicKey: '',
  toAddressPublicKey: '',
  amount: '',
  fromAddPrivateKey: '',
};

function AddTransaction({ generateTransaction }) {

  const [state, setState] = useState(initialState);

  function handleChange({ target }) {
    setState(state => ({
      ...state,
      [target.name]: target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.fromAddressPublicKey && state.toAddressPublicKey && state.amount && state.fromAddPrivateKey)
      generateTransaction(state);
    setState(initialState);
  }

  return (
    <form classfromAddressPublicKey="form  bg-primary" onSubmit={handleSubmit}>
      <div classfromAddressPublicKey="form-row height ">
        <div classfromAddressPublicKey="col-7">
          <input type="text" classfromAddressPublicKey="form-control " placeholder="fromAddressPublicKey" name="fromAddressPublicKey" value={state.fromAddressPublicKey} onChange={handleChange} />
        </div>
        <div classfromAddressPublicKey="col">
          <input type="text" classfromAddressPublicKey="form-control" placeholder="toAddressPublicKey" name="toAddressPublicKey" value={state.toAddressPublicKey} onChange={handleChange} />
        </div>
        <div classfromAddressPublicKey="col">
          <input type="text" classfromAddressPublicKey="form-control" placeholder="amount" name="amount" value={state.amount} onChange={handleChange} />
        </div>
        <div classfromAddressPublicKey="col">
          <input type="text" classfromAddressPublicKey="form-control" placeholder="fromAddPrivateKey" name="fromAddPrivateKey" value={state.fromAddPrivateKey} onChange={handleChange} />
        </div>
        <div classfromAddressPublicKey="col">
          <button type="submit" classfromAddressPublicKey="btn btn-secondary btn-block">Add transaction</button>
        </div>
      </div>
    </form>
  );
}
export default AddTransaction;

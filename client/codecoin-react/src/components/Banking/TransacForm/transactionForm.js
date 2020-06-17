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
    <form className="form " onSubmit={handleSubmit}>
      <div className="col-6 p-3" >
        <h3>Create transaction</h3>
        <div className="p-2">
          <input type="text" className="form-control " placeholder="From Public Key" name="fromAddressPublicKey" value={state.fromAddressPublicKey} onChange={handleChange} />
        </div>
        <div className="p-2">
          <input type="text" className="form-control" placeholder="To Public Key" name="toAddressPublicKey" value={state.toAddressPublicKey} onChange={handleChange} />
        </div>
        <div className="p-2">

          <input type="text" className="form-control" placeholder="Amount" name="amount" value={state.amount} onChange={handleChange} />
        </div>
        <div className="p-2">

          <input type="text" className="form-control" placeholder="Signature (Private Key)" name="fromAddPrivateKey" value={state.fromAddPrivateKey} onChange={handleChange} />
        </div>
        <div className="p-2">
          <button type="submit" className="btn btn-secondary btn-block">Add transaction</button>
        </div>
      </div>
    </form>
  );
}
export default AddTransaction;

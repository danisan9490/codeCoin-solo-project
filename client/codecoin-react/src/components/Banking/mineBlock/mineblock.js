import React, { useState } from 'react';

const initialState = {
  publicMinerAddress: '',
};

function MineBlock({ mineBlock }) {

  const [state, setState] = useState(initialState);

  function handleChange({ target }) {
    setState(state => ({
      ...state,
      [target.name]: target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.publicMinerAddress)
      mineBlock(state);
    setState(initialState);
  }

  return (
    <form className="form mt-5" onSubmit={handleSubmit}>
      <div className="container  text-center">
        <h2>Mine Block</h2>
        <h6>Mining you can a new Block to the Chain and get 50 codeCoins reward!</h6>
        <div className="p-2">
          <input type="text" className="form-control " placeholder="Public Key" name="publicMinerAddress" value={state.publicMinerAddress} onChange={handleChange} />
        </div>
        <div className="p-2">
          <button type="submit" className="btn btn-secondary btn-block">Mine Block</button>
        </div>
      </div>
    </form>
  );
}
export default MineBlock;

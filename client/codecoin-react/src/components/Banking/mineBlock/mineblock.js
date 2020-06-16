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
    <form className="form  bg-primary" onSubmit={handleSubmit}>
      <div className="form-row height ">
        <div className="col-7">
          <input type="text" className="form-control " placeholder="Mine block" name="publicMinerAddress" value={state.publicMinerAddress} onChange={handleChange} />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-secondary btn-block">Mine Block</button>
        </div>
      </div>
    </form>
  );
}
export default MineBlock;

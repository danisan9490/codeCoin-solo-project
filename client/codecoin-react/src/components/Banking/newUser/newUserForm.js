import React, { useState } from 'react';
import Userkeys from './newUserKeys';

const initialState = {
  name: '',
  userName: '',
  password: '',
};

function NewUserForm({ generateUser, stateKeys }) {

  const [state, setState] = useState(initialState);

  function handleChange({ target }) {
    setState(state => ({
      ...state,
      [target.name]: target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.name && state.userName && state.password)
      generateUser(state);
    setState(initialState);
  }

  return (
    <form className="form-group row mt-3 " onSubmit={handleSubmit}>

      <div className="col-6 p-3 ml-3 flex-inline">
        <h3>Create User</h3>

        <div className="p-2">
          <input type="text" className="form-control " placeholder="NAME" name="name" value={state.name} onChange={handleChange} />
        </div>

        <div className="p-2">
          <input type="text" className="form-control" placeholder="SURNAME" name="userName" value={state.userName} onChange={handleChange} />
        </div>
        <div className="p-2">
          <input type="text" className="form-control" placeholder="USERNAME" name="password" value={state.password} onChange={handleChange} />
        </div>
        <div className="p-2">
          <button type="submit" className="btn btn-secondary btn-block">Create</button>
        </div>

      </div >

      <div className="mr-5">
        <Userkeys stateKeys={stateKeys} />
      </div>

    </form >

  );
}
export default NewUserForm;

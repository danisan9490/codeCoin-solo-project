import React, { useState } from 'react';

const initialState = {
  name: '',
  userName: '',
  password: '',
};

function NewUserForm({ generateUser }) {

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
    <form className="form  bg-primary" onSubmit={handleSubmit}>
      <div className="form-row height ">
        <div className="col-7">
          <input type="text" className="form-control " placeholder="NAME" name="name" value={state.name} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="USERNAME" name="userName" value={state.userName} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="PASSWORD" name="password" value={state.password} onChange={handleChange} />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-secondary btn-block">Create User</button>
        </div>
      </div>
    </form>
  );
}
export default NewUserForm;

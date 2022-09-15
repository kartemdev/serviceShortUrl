import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuthUserThunk } from '../redux/actions/authUserAction';

function Login() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAuthUserThunk(input, navigate));
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h1>Sign In</h1>
      <form className="w-50" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">User Name</label>
          <input onChange={changeHandler} type="text" className="form-control" id="login" value={input.username} name="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={changeHandler} type="password" className="form-control" id="password" value={input.password} name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;

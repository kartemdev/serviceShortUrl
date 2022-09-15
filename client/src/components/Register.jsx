import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setAuthUserAC } from '../redux/actions/authUserAction';

function Register() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      axios({
        method: 'post',
        url: `http://79.143.31.216/register?username=${input.username}&password=${input.password}`,
        data: {
        },
      }).then((response) => {
        dispatch(setAuthUserAC(response.data.username));
        axios({
          method: 'post',
          url: `/register`,
          data: {
            user: response.data.username,
          }
        })
          .catch((err) => console.log('error axios register --->', err));
      });
      setTimeout(() => {
        navigate('/');
      }, 700);
    } catch (error) {
      console.log('error register fastApi --->', error);
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h1>Sign Up</h1>
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

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        if (!input.username || !input.password) {
          return alert('INPUT EMPTY')
        } 

        fetch('/urls/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input),
        })
          .then((response) => {
            if (response.status === 200) {
                navigate('/login');
            } else if (response.status === 400) {
              alert('MY DEAR GUEST, USER ALREADY REGISTER :)')
            } else {
              console.log(response);
            }
          });
    } catch (error) {
      console.log('error register fastApi --->', error);
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h1>Registration</h1>
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

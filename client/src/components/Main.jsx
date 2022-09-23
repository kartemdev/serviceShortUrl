import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShortUrlsThunk, getShortUrlsThunk } from '../redux/actions/shortUrlsAction';
import TableUrls from './TableUrls';
import { Link } from 'react-router-dom';

function Main() {
  const [input, setInput] = useState('');

  const user = useSelector((store) => store.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getShortUrlsThunk(user));
    }
  }, []);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addShortUrlsThunk({ username: user, url: input }))
  };

  return (
    <>
      {user ? (
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center">
            <h1>
              Hi {user}, welcome ShortUrl Service!
            </h1>
          </div>
          <form onSubmit={submitHandler} className="text-center">
            <div className="mb-3">
              <label htmlFor="url" className="form-label">Your Url</label>
              <input onChange={changeHandler} type="text" className="form-control" id="url" value={input} />
            </div>
            <button type="submit" className="btn btn-primary">Magic!</button>
          </form>
          <TableUrls />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1>
            Please, Authorized ShortUrl Service!
          </h1>
          <form className='d-flex mt-5'>
            <Link to='/register'><button type='click' className='btn btn-primary me-2'>Register</button></Link>
            <Link to='/login'><button type='click' className='btn btn-primary ms-2'>Login</button></Link>
          </form>
        </div>
      )}
    </>

  );
}

export default Main;

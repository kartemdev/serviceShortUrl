const { REACT_APP_HOST: host } = process.env;

export const setAuthUserAC = (payload) => ({ type: 'SET_AUTH_USER', payload });

export const getAuthUserThunk = (payload, navigate) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    const response = await fetch(`https://wdl-app-heroku-001.herokuapp.com:5432/login`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      if (result.access_token && result.token_type) {
        dispatch(setAuthUserAC(payload.username));

        setTimeout(() => {
          navigate('/');
        }, 700);
      } else {
        navigate('/');
      }
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log('error login fastApi --->', error);
  }
};

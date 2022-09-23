export const setAuthUserAC = (payload) => ({ type: 'SET_AUTH_USER', payload });

export const getAuthUserThunk = (payload, navigate) => async (dispatch) => {
  try {
    if (!payload.username || !payload.password) {
      return alert('INPUT EMPTY')
    } 

    const response = await fetch('/urls/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      const result = await response.json();
      dispatch(setAuthUserAC(result.userName));
      setTimeout(() => {
        navigate('/')
      }, 500)
    } else if (response.status === 404) {
      alert('MY DEAR GUEST, USER NOT FOUND :)')
    } else if (response.status === 400) {
      alert('MY DEAR GUEST, INVALID PASSWORD :)')
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log('error login fastApi --->', error);
  }
};

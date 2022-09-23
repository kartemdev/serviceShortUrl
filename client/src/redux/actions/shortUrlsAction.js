export const setShortUrlsAC = (payload) => ({ type: 'GET_URLS', payload });
export const addShortUrlsAC = (payload) => ({ type: 'ADD_URL', payload }); 

export const getShortUrlsThunk = (payload) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/urls/${payload}`, { method: 'GET' });
    if (response.ok) {
      const result = await response.json();
      dispatch(setShortUrlsAC(result));
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log('error get data(urls) --->', error);
  }
};

export const addShortUrlsThunk = (payload) => async (dispatch) => {
  try {
    const response = await fetch('/urls/s', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch(addShortUrlsAC(result))
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log('add error url --->', error);
  }
}

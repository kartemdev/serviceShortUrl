const { REACT_APP_HOST: host } = process.env;

export const setShortUrlsAC = (payload) => ({ type: 'GET_URLS', payload });

export const getShortUrlsThunk = (payload) => async (dispatch) => {
  try {
    const response = await fetch(`/urls/${payload}`, { method: 'GET' });

    if (response.ok) {
      const result = await response.json();
      dispatch(setShortUrlsAC(result));
    }
  } catch (error) {
    console.log('error get data(urls) --->', error);
  }
};

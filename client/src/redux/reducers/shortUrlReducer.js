const shortUrlReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_URLS':
    return action.payload;
  default:
    return state;
  }
};

export default shortUrlReducer;

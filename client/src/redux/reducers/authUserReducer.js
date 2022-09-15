const authUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_AUTH_USER':
    return action.payload;
  default:
    return state;
  }
};

export default authUserReducer;

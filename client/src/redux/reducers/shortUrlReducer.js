const shortUrlReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_URLS':
    return action.payload;
  case 'ADD_URL':
    return [...state, action.payload];  
  default:
    return state;
  }
};

export default shortUrlReducer;

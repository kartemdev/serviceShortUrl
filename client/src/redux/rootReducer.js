import { combineReducers } from 'redux';
import authUserReducer from './reducers/authUserReducer';
import shortUrlReducer from './reducers/shortUrlReducer';

const rootReducer = combineReducers({
  authUser: authUserReducer,
  shortUrls: shortUrlReducer,
});

export default rootReducer;

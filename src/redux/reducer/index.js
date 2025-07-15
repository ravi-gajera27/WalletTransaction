import handleCart from './handleCart';
import { combineReducers } from 'redux';
import walletReducer from './wallet';

const rootReducers = combineReducers({
  handleCart,
  wallet: walletReducer,
});
export default rootReducers;

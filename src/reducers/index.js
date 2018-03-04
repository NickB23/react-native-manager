import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CoinFormReducer from './CoinFormReducer';
import CoinListReducer from './CoinListReducer';
import CoinApiReducer from './CoinApiReducer';

export default combineReducers({
  auth: AuthReducer,
  coinForm: CoinFormReducer,
  coins: CoinListReducer,
  apiinfo: CoinApiReducer
});

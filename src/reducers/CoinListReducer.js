import {
  COINS_FETCH_SUCCESS,
  COIN_FETCH_AND_PRICE_INFO_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  coins: {
    name: '',
    qty: 0,
    uid: '',
    price: 0
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COINS_FETCH_SUCCESS:
      return action.payload;
    case COIN_FETCH_AND_PRICE_INFO_SUCCESS:
      return { ...state, coins: action.payload };
    default:
      return state;
  }
};

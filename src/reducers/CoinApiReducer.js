import {
  GET_COIN_INFO
} from '../actions/types';

const INITIAL_STATE = {
  coinPrice: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COIN_INFO:
    // action.payload === { coinName: 'bitcoin', price_eur: '9299,70' }
    return { ...state, [action.payload.coinName]: action.payload.price_eur };
    default:
      return state;
  }
};

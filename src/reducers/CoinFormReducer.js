import {
  COIN_UPDATE,
  COIN_CREATE,
  COIN_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  qty: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COIN_UPDATE:
      // action.payload === { prop: 'name', value 'bitcoin' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case COIN_CREATE:
      return INITIAL_STATE;
    case COIN_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function creditReducer(state = initialState.credits, action) {
  switch (action.type){
    case types.LOAD_CREDITS_SUCCESS:
      return action.credits;
    case types.CREATE_CREDIT_SUCCESS:
      return [...state, Object.assign({}, action.credit)];
    case types.UPDATE_CREDIT_SUCCESS:
      return [
        ...state.filter(credit => credit.id !== action.credit.id),
        Object.assign({}, action.credit)
      ];
    default:
      return state;
  }
}

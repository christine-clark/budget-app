import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function debitReducer(state = initialState.debits, action) {
  switch (action.type){
    case types.LOAD_DEBITS_SUCCESS:
      return action.debits;
    case types.CREATE_DEBIT_SUCCESS:
      return [...state, Object.assign({}, action.debit)];
    case types.UPDATE_DEBIT_SUCCESS:
      return [
        ...state.filter(debit => debit.id !== action.debit.id),
        Object.assign({}, action.debit)
      ];
    default:
      return state;
  }
}

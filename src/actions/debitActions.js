import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import DebitApi from '../api/mockDebitsApi';

export function loadDebitsSuccess(debits) {
  return { type: types.LOAD_DEBITS_SUCCESS, debits };
}

export function createDebitSuccess(debit) {
  return { type: types.CREATE_DEBIT_SUCCESS, debit };
}

export function updateDebitSuccess(debit) {
  return { type: types.UPDATE_DEBIT_SUCCESS, debit };
}

export function loadDebits() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return DebitApi.getAllDebits()
      .then(debits => {
        dispatch(loadDebitsSuccess(debits));
      })
      .catch(error => {
        throw (error);
      });
  };
}

export function saveDebit(debit) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return DebitApi.saveDebit(debit)
      .then(savedDebit => {
        debit.id ?
          dispatch(updateDebitSuccess(savedDebit)) :
          dispatch(createDebitSuccess(savedDebit));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

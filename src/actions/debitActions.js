import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import DebitApi from '../api/mockDebitsApi';

/**
 * Load debits success action.
 * @public
 * @returns {Object} The action type 'LOAD_DEBITS_SUCCESS' and debits array.
 */
export function loadDebitsSuccess(debits) {
  return { type: types.LOAD_DEBITS_SUCCESS, debits };
}

/**
 * Create new debit success action.
 * @public
 * @returns {Object} The action type 'CREATE_DEBIT_SUCCESS' and new debit object.
 */
export function createDebitSuccess(debit) {
  return { type: types.CREATE_DEBIT_SUCCESS, debit };
}

/**
 * Update existing debit success action.
 * @public
 * @returns {Object} The action type 'UPDATE_DEBIT_SUCCESS' and updated debit object.
 */
export function updateDebitSuccess(debit) {
  return { type: types.UPDATE_DEBIT_SUCCESS, debit };
}

/**
 * Load debits function that will dispatch the action to the
 * Debits API and return the debits array if successful.
 * @public
 * @returns {Promise} Resolves an object array of debits.
 */
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

/**
 * Save debit function that will dispatch the action to the
 * Debits API and return the new debit object if successful.
 * @public
 * @returns {Promise} Resolves a new debit object.
 */
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

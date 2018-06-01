import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import CreditApi from '../api/mockCreditsApi';

/**
 * Load credits success action.
 * @public
 * @returns {Object} The action type 'LOAD_CREDITS_SUCCESS' and credits array.
 */
export function loadCreditsSuccess(credits) {
  return { type: types.LOAD_CREDITS_SUCCESS, credits };
}

/**
 * Create new credit success action.
 * @public
 * @returns {Object} The action type 'CREATE_CREDIT_SUCCESS' and new credit object.
 */
export function createCreditSuccess(credit) {
  return { type: types.CREATE_CREDIT_SUCCESS, credit };
}

/**
 * Update existing credit success action.
 * @public
 * @returns {Object} The action type 'UPDATE_CREDIT_SUCCESS' and updated credit object.
 */
export function updateCreditSuccess(credit) {
  return { type: types.UPDATE_CREDIT_SUCCESS, credit };
}

/**
 * Load credits function that will dispatch the action to the
 * Credits API and return the credits array if successful.
 * @public
 * @returns {Promise} Resolves an object array of credits.
 */
export function loadCredits() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return CreditApi.getAllCredits()
      .then(credits => {
        dispatch(loadCreditsSuccess(credits));
      })
      .catch(error => {
        throw (error);
      });
  };
}

/**
 * Save credit function that will dispatch the action to the
 * Credits API and return the new credit object if successful.
 * @public
 * @returns {Promise} Resolves a new credit object.
 */
export function saveCredit(credit) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return CreditApi.saveCredit(credit)
      .then(savedCredit => {
        credit.id ?
          dispatch(updateCreditSuccess(savedCredit)) :
          dispatch(createCreditSuccess(savedCredit));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

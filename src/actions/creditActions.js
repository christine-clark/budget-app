import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import CreditApi from '../api/mockCreditsApi';

export function loadCreditsSuccess(credits) {
  return { type: types.LOAD_CREDITS_SUCCESS, credits };
}

export function createCreditSuccess(credit) {
  return { type: types.CREATE_CREDIT_SUCCESS, credit };
}

export function updateCreditSuccess(credit) {
  return { type: types.UPDATE_CREDIT_SUCCESS, credit };
}

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

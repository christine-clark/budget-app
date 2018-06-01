import * as types from './actionTypes';

/**
 * Begin the ajax call action.
 * @public
 * @returns {Object} The action type 'BEGIN_AJAX_CALL'.
 */
export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

/**
 * Ajax call error action.
 * @public
 * @returns {Object} The action type 'AJAX_CALL_ERROR'.
 */
export function ajaxCallError() {
  return { type: types.AJAX_CALL_ERROR };
}

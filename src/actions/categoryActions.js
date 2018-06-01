import * as types from '../actions/actionTypes';
import CategoryApi from '../api/mockCategoryApi';
import {beginAjaxCall} from './ajaxStatusActions';

/**
 * Load categories success action.
 * @public
 * @returns {Object} The action type 'LOAD_CATEGORIES_SUCCESS' and categories array.
 */
export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

/**
 * Load categories function that will dispatch the action to the
 * Category API and return the categories array if successful.
 * @public
 * @returns {Promise} Resolves a string array of category names.
 */
export function loadCategories() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return CategoryApi.getAllCategories()
      .then(categories => {
        dispatch(loadCategoriesSuccess(categories));
      })
      .catch(error => {
        throw (error);
      });
  };
}

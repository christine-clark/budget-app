import { combineReducers } from 'redux';
import credits from './creditReducer';
import debits from './debitReducer';
import categories from './categoryReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  credits,
  debits,
  categories,
  ajaxCallsInProgress,
  routing: routerReducer
});

export default rootReducer;

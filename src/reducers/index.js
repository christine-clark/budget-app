import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import categories from './categoryReducer';
import credits from './creditReducer';
import debits from './debitReducer';

const rootReducer = history => combineReducers({
  credits,
  debits,
  categories,
  ajaxCallsInProgress,
  router: connectRouter(history)
});

export default rootReducer;

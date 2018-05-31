import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as creditActions from '../actions/creditActions';
import * as debitActions from '../actions/debitActions';

describe('Store', function() {
  it('Should handle creating credits', function() {
    const store = createStore(rootReducer, initialState);
    const credit = { id: '1', postDate: '01/01/02018' };
    const action = creditActions.createCreditSuccess(credit);
    store.dispatch(action);

    const actual = store.getState().credits[0];
    const expected = { id: '1', postDate: '01/01/02018' };

    expect(actual).toEqual(expected);
  });

  it('Should handle creating debits', function() {
    const store = createStore(rootReducer, initialState);
    const debit = { id: '2', postDate: '02/02/02018' };
    const action = debitActions.createDebitSuccess(debit);
    store.dispatch(action);

    const actual = store.getState().debits[0];
    const expected = { id: '2', postDate: '02/02/02018' };

    expect(actual).toEqual(expected);
  });
});

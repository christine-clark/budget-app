import debitReducer from './debitReducer';
import * as actions from '../actions/debitActions';

describe('Debit Reducer', () => {
  it('should add debit when passed CREATE_DEBIT_SUCCESS', () => {
    const initialState = [{ id: '1', postDate: '01/01/2018' }, { id: '2', postDate: '02/02/2018' }];
    const newDebit = { postDate: '03/03/2018' };
    const action = actions.createDebitSuccess(newDebit);
    const newState = debitReducer(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].postDate).toEqual('01/01/2018');
    expect(newState[1].postDate).toEqual('02/02/2018');
    expect(newState[2].postDate).toEqual('03/03/2018');
  });

  it('should update debit when passed UPDATE_DEBIT_SUCCESS', () => {
    const initialState = [
      { id: '1', postDate: '01/01/2018' },
      { id: '2', postDate: '02/02/2018' },
      { id: '3', postDate: '03/03/2018' }
    ];
    const debit = { id: '2', postDate: '04/04/2018' };
    const action = actions.updateDebitSuccess(debit);
    const newState = debitReducer(initialState, action);
    const updatedDebit = newState.find(a => a.id == debit.id);
    const untouchedDebit = newState.find(a => a.id === '1');

    expect(newState.length).toEqual(3);
    expect(updatedDebit.postDate).toEqual('04/04/2018');
    expect(untouchedDebit.postDate).toEqual('01/01/2018');
  });
});

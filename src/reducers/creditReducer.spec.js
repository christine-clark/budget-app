import creditReducer from './creditReducer';
import * as actions from '../actions/creditActions';

describe('Credit Reducer', () => {
  it('should add credit when passed CREATE_CREDIT_SUCCESS', () => {
    const initialState = [{ id: '1', postDate: '01/01/2018' }, { id: '2', postDate: '02/02/2018' }];
    const newCredit = { postDate: '03/03/2018' };
    const action = actions.createCreditSuccess(newCredit);
    const newState = creditReducer(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].postDate).toEqual('01/01/2018');
    expect(newState[1].postDate).toEqual('02/02/2018');
    expect(newState[2].postDate).toEqual('03/03/2018');
  });

  it('should update credit when passed UPDATE_CREDIT_SUCCESS', () => {
    const initialState = [
      { id: '1', postDate: '01/01/2018' },
      { id: '2', postDate: '02/02/2018' },
      { id: '3', postDate: '03/03/2018' }
    ];
    const credit = { id: '2', postDate: '04/04/2018' };
    const action = actions.updateCreditSuccess(credit);
    const newState = creditReducer(initialState, action);
    const updatedCredit = newState.find(a => a.id == credit.id);
    const untouchedCredit = newState.find(a => a.id === '1');

    expect(newState.length).toEqual(3);
    expect(updatedCredit.postDate).toEqual('04/04/2018');
    expect(untouchedCredit.postDate).toEqual('01/01/2018');
  });
});

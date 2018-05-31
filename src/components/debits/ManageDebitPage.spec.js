import React from 'react';
import {mount} from 'enzyme';
import {ManageDebitPage} from './ManageDebitPage';

describe('Manage Debit Page', () => {
  it('sets error message when trying to save empty post date', () => {
    const props = {
      actions: { saveDebit: () => Promise.resolve() },
      categories: [],
      debit: {id: '', postDate: '', description: '', amount: '', category: ''}
    };
    const wrapper = mount(<ManageDebitPage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');

    saveButton.simulate('click');
    expect(wrapper.state().errors.postDate).toBe('Missing: Must have a post date.');
  });
});

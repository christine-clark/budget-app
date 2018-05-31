import React from 'react';
import {mount} from 'enzyme';
import {ManageCreditPage} from './ManageCreditPage';

describe('Manage Credit Page', () => {
  it('sets error message when trying to save empty post date', () => {
    const props = {
      actions: { saveCredit: () => Promise.resolve() },
      categories: [],
      credit: {id: '', postDate: '', description: '', amount: '', category: ''}
    };
    const wrapper = mount(<ManageCreditPage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');

    saveButton.simulate('click');
    expect(wrapper.state().errors.postDate).toBe('Missing: Must have a post date.');
  });
});

import React from 'react';
import {mount} from 'enzyme';
import {ManageCreditPage} from './ManageCreditPage';

describe('Manage Credit Page', () => {
  it('creates a new credit successfully', () => {
    const props = {
      actions: { saveCredit: () => Promise.resolve() },
      categories: [],
      credit: {id: '', postDate: '01/01/2018', description: 'Freelance', amount: '100.00', category: 'miscellaneous'}
    };
    const wrapper = mount(<ManageCreditPage {...props} />);
    const h1Text = wrapper.find('h1').text();
    const saveButton = wrapper.find('input').last();

    saveButton.simulate('click');
    expect(h1Text).toBe('Add New Credit');
    expect(wrapper.state().credit.postDate).toBe('01/01/2018');
    expect(wrapper.state().credit.amount).toBe('100.00');
    expect(wrapper.state().errors).toEqual({});
  });

  it('updates an existing credit successfully', () => {
    const props = {
      actions: { saveCredit: () => Promise.resolve() },
      categories: [],
      credit: {id: '1', postDate: '01/01/2018', description: 'Freelance', amount: '100.00', category: 'miscellaneous'}
    };
    const wrapper = mount(<ManageCreditPage {...props} />);
    const h1Text = wrapper.find('h1').text();
    const amountInput = wrapper.find('input[name="amount"]').first();
    const saveButton = wrapper.find('input').last();
    expect(wrapper.state().credit.amount).toBe('100.00');

    amountInput.simulate('change', {target: {name: 'amount', value: '150.00'}});
    saveButton.simulate('click');

    expect(h1Text).toBe('Update Credit');
    expect(wrapper.state().credit.postDate).toBe('01/01/2018');
    expect(wrapper.state().credit.amount).toBe('150.00');
    expect(wrapper.state().errors).toEqual({});
  });

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

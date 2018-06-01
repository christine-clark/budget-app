import React from 'react';
import {mount} from 'enzyme';
import {ManageCreditPage} from './ManageCreditPage';

describe('Manage Credit Page', () => {
  it('creates a new credit successfully', () => {
    const props = setupProps('', false);
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
    const props = setupProps('1', false);
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

  it('sets error message when trying to save empty post date and empty amount', () => {
    const props = setupProps('', true);
    const wrapper = mount(<ManageCreditPage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');

    saveButton.simulate('click');
    expect(Object.keys(wrapper.state().errors).length).toBe(2);
    expect(wrapper.state().errors.postDate).toBe('Post date is required. Please enter a post date.');
    expect(wrapper.state().errors.amount).toBe('Amount is required. Please enter an amount.');
  });

  it('checks for a valid post date format as mm/dd/yyyy', () => {
    const props = setupProps('', true);
    const wrapper = mount(<ManageCreditPage {...props} />);
    const postDateInput = wrapper.find('input[name="postDate"]').first();
    const amountInput = wrapper.find('input[name="amount"]').first();
    const saveButton = wrapper.find('input').last();

    postDateInput.simulate('change', {target: {name: 'postDate', value: '01/01/2018'}});
    amountInput.simulate('change', {target: {name: 'amount', value: '150.00'}});
    saveButton.simulate('click');

    expect(wrapper.state().errors).toEqual({});
  });

  it('errors when an ivalid post date is entered', () => {
    const props = setupProps('', true);
    const wrapper = mount(<ManageCreditPage {...props} />);
    const postDateInput = wrapper.find('input[name="postDate"]').first();
    const amountInput = wrapper.find('input[name="amount"]').first();
    const saveButton = wrapper.find('input').last();

    postDateInput.simulate('change', {target: {name: 'postDate', value: '02/30/2018'}});
    amountInput.simulate('change', {target: {name: 'amount', value: '150.00'}});
    saveButton.simulate('click');

    expect(Object.keys(wrapper.state().errors).length).toBe(1);
    expect(wrapper.state().errors.postDate).toBe('Invalid date format. Please enter date as mm/dd/yyyy.');
  });

  it('errors when an ivalid amount is entered', () => {
    const props = setupProps('', true);
    const wrapper = mount(<ManageCreditPage {...props} />);
    const postDateInput = wrapper.find('input[name="postDate"]').first();
    const amountInput = wrapper.find('input[name="amount"]').first();
    const saveButton = wrapper.find('input').last();

    postDateInput.simulate('change', {target: {name: 'postDate', value: '01/01/2018'}});
    amountInput.simulate('change', {target: {name: 'amount', value: '$1,50.29724'}});
    saveButton.simulate('click');

    expect(Object.keys(wrapper.state().errors).length).toBe(1);
    expect(wrapper.state().errors.amount).toBe('Amount is not a valid currency. Please enter amount as XXXX.XX without ($) dollar symbol, for example: 100.00.');
  });
});

function setupProps(id, isEmpty) {
  return {
    actions: { saveCredit: () => Promise.resolve() },
    categories: [],
    credit: {
      id: id ? id : '',
      postDate: isEmpty ? '' : '01/01/2018',
      description: isEmpty ? '' : 'Freelance',
      amount: isEmpty ? '' : '100.00',
      category: isEmpty ? '' : 'miscellaneous'
    }
  };
}

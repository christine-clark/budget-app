import { shape, number, string, oneOfType } from 'prop-types';

export const credit = shape({
  id: oneOfType([number,string]),
  postDate: string,
  description: string,
  amount: oneOfType([number,string]),
  category: string
});

export const debit = shape({
  id: oneOfType([number,string]),
  postDate: string,
  description: string,
  amount: oneOfType([number,string]),
  category: string
});

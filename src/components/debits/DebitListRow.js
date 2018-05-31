import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getCurrencyFormattedNumber} from '../../utils/numberFormat';

const DebitListRow = ({debit}) => {
  return (
    <tr>
      <td><Link to={'/debit/' + debit.id}>{debit.postDate}</Link></td>
      <td>{debit.description}</td>
      <td className="debit">{getCurrencyFormattedNumber(debit.amount)}</td>
      <td className="capitalize">{debit.category}</td>
    </tr>
  );
};

DebitListRow.propTypes = {
  debit: PropTypes.object.isRequired
};

export default DebitListRow;

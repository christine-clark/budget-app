import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getCurrencyFormattedNumber} from '../../utils/numberFormat';

/**
 * Display a row for each credit transaction in the table.
 */
const CreditListRow = ({credit}) => {
  return (
    <tr>
      <td><Link to={'/credit/' + credit.id}>{credit.postDate}</Link></td>
      <td>{credit.description}</td>
      <td className="credit">{getCurrencyFormattedNumber(credit.amount)}</td>
      <td className="capitalize">{credit.category}</td>
    </tr>
  );
};

CreditListRow.propTypes = {
  credit: PropTypes.object.isRequired
};

export default CreditListRow;

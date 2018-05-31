import React from 'react';
import PropTypes from 'prop-types';
import DebitListRow from './DebitListRow';

const DebitList = ({debits/*, deleteDebit*/}) => {
  return (
    <div>
      {debits.length > 0 ? (
        <table className="debits-list">
          <thead>
            <tr>
              <th>Post Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {debits.map(
              debit => <DebitListRow key={debit.id} debit={debit} />
            )}
          </tbody>
        </table>
      ) : (
        <p>No debits available.</p>
      )}
    </div>
  );
};

DebitList.propTypes = {
  debits: PropTypes.array.isRequired
};

export default DebitList;

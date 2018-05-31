import React from 'react';
import PropTypes from 'prop-types';
import CreditListRow from './CreditListRow';

const CreditList = ({credits/*, deleteCredit*/}) => {
  return (
    <div>
      {credits.length > 0 ? (
        <table className="credits-list">
          <thead>
            <tr>
              <th>Post Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {credits.map(
              credit => <CreditListRow key={credit.id} credit={credit} />
            )}
          </tbody>
        </table>
      ) : (
        <p>No credits available.</p>
      )}
    </div>
  );
};

CreditList.propTypes = {
  credits: PropTypes.array.isRequired
};

export default CreditList;

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {calculateSum, getCurrencyFormattedNumber} from '../../utils/numberFormat';
import * as debitActions from '../../actions/debitActions';
import DebitList from './DebitList';
import LoadingDots from '../common/LoadingDots';

/**
 * Display all debit transactions in a table list with an Add Debit button.
 * Also display a sum of total debit transactions in the header.
 */
class DebitsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.debitsSum = this.debitsSum.bind(this);
    this.redirectToAddDebitPage = this.redirectToAddDebitPage.bind(this);
  }

  /**
   * Sum all the debit transactions.
   * @returns {string} The debits sum in currency format.
   */
  debitsSum() {
    const debitsSum = calculateSum(this.props.debits);
    return getCurrencyFormattedNumber(debitsSum);
  }

  /**
   * Redirect to the add debit page (ManageDebitPage).
   * @returns {undefined}
   */
  redirectToAddDebitPage() {
    this.props.history.push('/debit');
  }

  /**
   * Render the debits sum, table of debit transactions, and the "Add Debit" button.
   * @returns {HTMLElement} The html to display in UI.
   */
  render() {
    const {debits, loading} = this.props;

    return (
      <div>
        <h1 className="left">Debits:&nbsp;
          <span className="debit">{this.debitsSum()}</span>
        </h1>
        <input type="submit"
               value="Add Debit"
               className="add-btn"
               onClick={this.redirectToAddDebitPage} />
        {loading && <LoadingDots interval={100} dots={20} />}
        {!loading && <DebitList debits={debits} />}
      </div>
    );
  }
}

DebitsPage.propTypes = {
  debits: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    debits: state.debits,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(debitActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DebitsPage);

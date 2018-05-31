import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {calculateSum, getCurrencyFormattedNumber} from '../../utils/numberFormat';
import * as creditActions from '../../actions/creditActions';
import * as debitActions from '../../actions/debitActions';
import CreditList from '../credits/CreditList';
import DebitList from '../debits/DebitList';
import LoadingDots from '../common/LoadingDots';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.budget = this.budget.bind(this);
    this.redirectToAddPage = this.redirectToAddPage.bind(this);
  }

  budget() {
    const creditsSum = calculateSum(this.props.credits);
    const debitsSum = calculateSum(this.props.debits);
    const totalSum = creditsSum - debitsSum;

    return {
      total: getCurrencyFormattedNumber(totalSum),
      totalClass: totalSum >= 0 ? 'credit' : 'debit',
      creditsSum: getCurrencyFormattedNumber(creditsSum),
      debitsSum: getCurrencyFormattedNumber(debitsSum)
    }
  }

  redirectToAddPage(pageType) {
    this.props.history.push(`/${pageType}`);
  }

  render() {
    const {credits, debits, loading} = this.props;

    return (
      <main>
        <h1>A Personal Budgeting App</h1>
        <p>Manage your budget by adding credits and debits below to see your total cash flow each month.</p>
        <h2 className="total">Total Cashflow:&nbsp;
          <span className={this.budget().totalClass}>{this.budget().total}</span>
        </h2>

        <h2 className="left">
          <Link to="/credits">Credits</Link>:&nbsp;
          <span className="credit">{this.budget().creditsSum}</span>
        </h2>
        <input type="submit"
               value="Add Credit"
               className="add-btn"
               onClick={this.redirectToAddPage.bind(this, 'credit')} />
        {loading && <LoadingDots interval={100} dots={20} />}
        {!loading && <CreditList credits={credits} />}

        <h2 className="left">
          <Link to="/debits">Debits</Link>:&nbsp;
          <span className="debit">{this.budget().debitsSum}</span>
        </h2>
        <input type="submit"
               value="Add Debit"
               className="add-btn"
               onClick={this.redirectToAddPage.bind(this, 'debit')} />
        {loading && <LoadingDots interval={100} dots={20} />}
        {!loading && <DebitList debits={debits} />}
      </main>
    );
  }
}

HomePage.propTypes = {
  credits: PropTypes.array.isRequired,
  debits: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    credits: state.credits,
    debits: state.debits,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(creditActions, debitActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

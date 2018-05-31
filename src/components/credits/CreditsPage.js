import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {calculateSum, getCurrencyFormattedNumber} from '../../utils/numberFormat';
import * as creditActions from '../../actions/creditActions';
import CreditList from './CreditList';
import LoadingDots from '../common/LoadingDots';

class CreditsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.creditsSum = this.creditsSum.bind(this);
    this.redirectToAddCreditPage = this.redirectToAddCreditPage.bind(this);
  }

  creditsSum() {
    const creditsSum = calculateSum(this.props.credits);
    return getCurrencyFormattedNumber(creditsSum);
  }

  redirectToAddCreditPage() {
    this.props.history.push('/credit');
  }

  render() {
    const {credits, loading} = this.props;

    return (
      <div>
        <h1 className="left">Credits:&nbsp;
          <span className="credit">{this.creditsSum()}</span>
        </h1>
        <input type="submit"
               value="Add Credit"
               className="add-btn"
               onClick={this.redirectToAddCreditPage} />
        {loading && <LoadingDots interval={100} dots={20} />}
        {!loading && <CreditList credits={credits} />}
      </div>
    );
  }
}

CreditsPage.propTypes = {
  credits: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    credits: state.credits,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(creditActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditsPage);

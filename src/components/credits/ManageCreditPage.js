import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as creditActions from '../../actions/creditActions';
import CreditForm from './CreditForm';
import {categoriesFormattedForDropdown} from '../selectors/categoriesSelector';
import {validateForm} from '../../utils/validation';

export class ManageCreditPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      credits: props.credits ? props.credits.slice(0) : [],
      credit: Object.assign({}, props.credit),
      categories: props.categories.slice(0),
      errors: {},
      saving: false
    };

    this.updateCreditState = this.updateCreditState.bind(this);
    this.saveCredit = this.saveCredit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.credit.id !== nextProps.credit.id) {
      this.setState({credit: Object.assign({}, nextProps.credit)});
    }
  }

  updateCreditState(event) {
    const field = event.target.name;
    let credit = Object.assign({}, this.state.credit);
    credit[field] = event.target.value;
    return this.setState({credit: credit});
  }

  creditFormIsValid() {
    const credit = Object.assign({}, this.state.credit);
    const form = validateForm(credit);
    this.setState({errors: form.errors});
    return form.formIsValid;
  }

  saveCredit(event) {
    event.preventDefault();

    if (!this.creditFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCredit(this.state.credit)
      .then(() => {
        const credit = this.state.credit;
        const credits = this.props.credits.slice(0);

        if (credit.id) {
          const existingCreditIndex = credits.findIndex(a => a.id == credit.id);
          credits.splice(existingCreditIndex, 1, credit);
        }

        this.setState({credits: credits});
        this.redirect();
      })
      .catch(error => {
        alert(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    const self = this;
    const alertElement = document.getElementsByClassName('alert')[0];
    alertElement.classList.add('alert-success');
    alertElement.textContent = 'Saved!';

    setTimeout(() => {
      self.setState({saving: false});
      self.props.history.push('/');
    }, 800);
  }

  render() {
    return(
      <CreditForm credit={this.state.credit}
                  allCategories={this.state.categories}
                  errors={this.state.errors}
                  saving={this.state.saving}
                  onChange={this.updateCreditState}
                  onSave={this.saveCredit} />
    );
  }
}

ManageCreditPage.propTypes = {
  credits: PropTypes.array,
  credit: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCreditPage.contextTypes = {
  router: PropTypes.object
};

function getCreditById(credits, id) {
  const credit = credits.filter(credit => credit.id === id);
  return credit ? credit[0] : null;
}

function mapStateToProps(state, ownProps) {
  const creditId = ownProps.match.params.id;  // from the path `/credit/:id`
  let credit = creditId && state.credits.length > 0 ?
    getCreditById(state.credits, creditId) :
    {id: '', postDate: '', description: '', amount: '', category: ''};

  return {
    credits: state.credits,
    credit: credit,
    categories: categoriesFormattedForDropdown(state.categories)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(creditActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCreditPage);

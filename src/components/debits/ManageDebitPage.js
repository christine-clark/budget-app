import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as debitActions from '../../actions/debitActions';
import DebitForm from './DebitForm';
import {categoriesFormattedForDropdown} from '../selectors/categoriesSelector';
import {validateForm} from '../../utils/validation';

/**
 * Display debit form to update or add a debit.
 */
export class ManageDebitPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      debits: props.debits ? props.debits.slice(0) : [],
      debit: Object.assign({}, props.debit),
      categories: props.categories.slice(0),
      errors: {},
      saving: false
    };

    this.updateDebitState = this.updateDebitState.bind(this);
    this.saveDebit = this.saveDebit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.debit.id !== nextProps.debit.id) {
      this.setState({debit: Object.assign({}, nextProps.debit)});
    }
  }

  /**
   * Update the debit state every time a change is made in the input field.
   * @param {Event} event - The event from onChange fired from the input field.
   * @returns {*} The result from setting the state of debit object.
   */
  updateDebitState(event) {
    const field = event.target.name;
    let debit = Object.assign({}, this.state.debit);
    debit[field] = event.target.value;
    return this.setState({debit: debit});
  }

  /**
   * Validate the debit form and check if all fields are valid, such as post date and amount.
   * @returns {boolean} True or false whether the form is valid or not.
   */
  debitFormIsValid() {
    const debit = Object.assign({}, this.state.debit);
    const form = validateForm(debit);
    this.setState({errors: form.errors});
    return form.formIsValid;
  }

  /**
   * Save the debit object when the submit button is clicked in the debit form.
   * Update the states for 'saving' and 'debits' with the updated debit object.
   * Redirect back to the home page once successfully saved.
   * @param {Event} event - The event from submit button click.
   * @returns {undefined}
   */
  saveDebit(event) {
    event.preventDefault();

    if (!this.debitFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveDebit(this.state.debit)
      .then(() => {
        const debit = this.state.debit;
        const debits = this.props.debits.slice(0);

        if (debit.id) {
          const existingDebitIndex = debits.findIndex(a => a.id == debit.id);
          debits.splice(existingDebitIndex, 1, debit);
        }

        this.setState({debits: debits});
        this.redirect();
      })
      .catch(error => {
        alert(error);
        this.setState({saving: false});
      });
  }

  /**
   * Redirect back to the home page and also display success alert for
   * 800ms before automatically redirecting user.
   * @returns {undefined}
   */
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

  /**
   * Render the debit form for updating or adding a debit.
   * @returns {HTMLElement} The html to display in UI.
   */
  render() {
    return(
      <DebitForm debit={this.state.debit}
                 allCategories={this.state.categories}
                 errors={this.state.errors}
                 saving={this.state.saving}
                 onChange={this.updateDebitState}
                 onSave={this.saveDebit} />
    );
  }
}

ManageDebitPage.propTypes = {
  debits: PropTypes.array,
  debit: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageDebitPage.contextTypes = {
  router: PropTypes.object
};

/**
 * Get a debit by id. Filter the existing list of debits to retrieve a single debit.
 * @returns {Object} The debit object if found.
 */
function getDebitById(debits, id) {
  const debit = debits.filter(debit => debit.id === id);
  return debit ? debit[0] : null;
}

function mapStateToProps(state, ownProps) {
  const debitId = ownProps.match.params.id;  // from the path `/debit/:id`
  let debit = debitId && state.debits.length > 0 ?
    getDebitById(state.debits, debitId) :
    {id: '', postDate: '', description: '', amount: '', category: ''};

  return {
    debits: state.debits,
    debit: debit,
    categories: categoriesFormattedForDropdown(state.categories)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(debitActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDebitPage);

import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../common/SelectInput';
import TextInput from '../common/TextInput';

/**
 * The Debit Form which will allow for adding new debits or
 * updating existing debits depending on the debit object
 * passed into the form. This will also handle displaying
 * errors if available or a success message if saved successfully.
 */
const DebitForm = ({debit, allCategories, onSave, onChange, saving, errorMessage, errors}) => (
  <form>
    {saving && <div className="alert">Saving...</div>}
    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    <h1>{debit.id ? 'Update' : 'Add New'} Debit</h1>
    <TextInput name="postDate"
               label="Post Date"
               value={debit.postDate}
               onChange={onChange}
               error={errors.postDate} />
    <TextInput name="description"
               label="Description"
               value={debit.description}
               onChange={onChange}
               error={errors.description} />
    <TextInput name="amount"
               label="Amount"
               value={debit.amount}
               onChange={onChange}
               error={errors.amount} />
    <SelectInput name="category"
                 label="Category"
                 value={debit.category}
                 defaultOption="Select Category"
                 options={allCategories}
                 onChange={onChange}
                 error={errors.category} />
    <input type="submit"
           disabled={saving}
           value={saving ? 'Saving...' : 'Save'}
           className="btn btn-primary"
           onClick={onSave}/>
  </form>
);

DebitForm.propTypes = {
  debit: PropTypes.object.isRequired,
  allCategories: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errorMessage: PropTypes.string,
  errors: PropTypes.object
};

export default DebitForm;

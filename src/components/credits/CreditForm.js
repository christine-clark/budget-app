import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../common/SelectInput';
import TextInput from '../common/TextInput';

/**
 * The Credit Form which will allow for adding new credits or
 * updating existing credits depending on the credit object
 * passed into the form. This will also handle displaying
 * errors if available or a success message if saved successfully.
 */
const CreditForm = ({credit, allCategories, onSave, onChange, saving, errors}) => (
  <form>
    {saving && <div className="alert">Saving...</div>}
    <h1>{credit.id ? 'Update' : 'Add New'} Credit</h1>
    <TextInput name="postDate"
               label="Post Date"
               value={credit.postDate}
               onChange={onChange}
               error={errors.postDate} />
    <TextInput name="description"
               label="Description"
               value={credit.description}
               onChange={onChange}
               error={errors.description} />
    <TextInput name="amount"
               label="Amount"
               value={credit.amount}
               onChange={onChange}
               error={errors.amount} />
    <SelectInput name="category"
                 label="Category"
                 value={credit.category}
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

CreditForm.propTypes = {
  credit: PropTypes.object.isRequired,
  allCategories: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default CreditForm;

/**
 * Format the category names for the select dropdown in the forms.
 * @param {Array|String} categories - The category names in string array.
 * @return {Array|Object} The categories formatted to display capitalized in the dropdown.
 */
export function categoriesFormattedForDropdown(categories) {
  return categories.map(category => {
    return {
      value: category,
      text: category.toUpperCase()
    };
  });
}

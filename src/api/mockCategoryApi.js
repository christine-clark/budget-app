import delay from './delay';

/**
 * The initial mock categories to load in the project.
 * @type {Array|String}
 */
const categories = [
  "employment",
  "mortgage",
  "insurance",
  "medical/dental",
  "utilities",
  "merchandise",
  "groceries",
  "restaurants",
  "gasoline",
  "home improvement",
  "services",
  "entertainment",
  "miscellaneous"
];

/**
 * Class representing the Category API mocked for demo purposes.
 * It mocks a web API by working with the hard-coded data below.
 * It uses setTimeout to simulate the delay of an AJAX call.
 */
class CategoryApi {

  /**
   * Get all the categories.
   * @static
   * @returns {Promise} Resolves with a string array of all category names.
   */
  static getAllCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], categories));
      }, delay);
    });
  }

  /**
   * Save a category, whether an existing or new category.
   * @static
   * @param {string} category - The category name.
   * @returns {Promise} Resolves with the saved category.
   */
  static saveCategory(category) {
    category = Object.assign({}, category); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCategoryNameLength = 3;
        if (category.length < minCategoryNameLength) {
          reject(`Category must be at least ${minCategoryNameLength} characters.`);
        }

        if (category) {
          const existingCategoryIndex = categories.findIndex(a => a == category);
          categories.splice(existingCategoryIndex, 1, category);
        } else {
          //Just simulating creation here.
          categories.push(category);
        }

        resolve(category);
      }, delay);
    });
  }

  /**
   * Delete a category.
   * @static
   * @param {string} categoryName - The category name.
   * @returns {Promise} The promise object.
   */
  static deleteCategory(categoryName) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfCategoryToDelete = categories.findIndex(category => {
          category == categoryName;
        });
        categories.splice(indexOfCategoryToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CategoryApi;

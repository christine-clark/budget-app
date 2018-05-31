import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
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

class CategoryApi {
  static getAllCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], categories));
      }, delay);
    });
  }

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

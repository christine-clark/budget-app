import delay from './delay';

/**
 * The initial mock credits to load in the project.
 * @type {Array|Object}
 */
const credits = [{
  id: "1",
  postDate: "05/01/2018",
  description: "Salary",
  amount: "5000.00",
  category: "employment"
}];

/**
 * Generates an id for a new mock credit.
 * @type {Function}
 */
const generateId = () => {
  return String(credits.length + 1);
};

/**
 * Class representing the Credit API mocked for demo purposes.
 * It mocks a web API by working with the hard-coded data below.
 * It uses setTimeout to simulate the delay of an AJAX call.
 */
class CreditApi {

  /**
   * Get all the credit transactions.
   * @static
   * @returns {Promise} Resolves with an object array of all credits.
   */
  static getAllCredits() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], credits));
      }, delay);
    });
  }

  /**
   * Save a credit, whether an existing or new credit.
   * @static
   * @param {object} credit - The credit.
   * @returns {Promise} Resolves with the saved credit.
   */
  static saveCredit(credit) {
    credit = Object.assign({}, credit); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCreditAmountLength = 1;
        if (credit.amount.length < minCreditAmountLength) {
          reject(`Amount must be at least ${minCreditAmountLength} numbers.`);
        }

        if (credit.id) {
          const existingCreditIndex = credits.findIndex(a => a.id == credit.id);
          credits.splice(existingCreditIndex, 1, credit);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new credits in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          credit.id = generateId();
          credits.push(credit);
        }

        resolve(credit);
      }, delay);
    });
  }

  /**
   * Delete a credit.
   * @static
   * @param {string} creditId - The credit id.
   * @returns {Promise} The promise object.
   */
  static deleteCredit(creditId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfCreditToDelete = credits.findIndex(credit => {
          credit.id == creditId;
        });
        credits.splice(indexOfCreditToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CreditApi;

import delay from './delay';

/**
 * The initial mock debits to load in the project.
 * @type {Array|Object}
 */
const debits = [{
    id: "1",
    postDate: "05/01/2018",
    description: "PNC Mortgage",
    amount: "1266.15",
    category: "mortgage"
  },
  {
    id: "2",
    postDate: "05/05/2018",
    description: "RaceTrac",
    amount: "39.60",
    category: "gasoline"
  },
  {
    id: "3",
    postDate: "05/14/2018",
    description: "Duke Energy",
    amount: "88.13",
    category: "utilities"
  },
  {
    id: "4",
    postDate: "05/21/2018",
    description: "Publix Supermarket",
    amount: "100.00",
    category: "groceries"
  },
  {
    id: "5",
    postDate: "05/30/2018",
    description: "Verizon Wireless",
    amount: "113.83",
    category: "services"
  }
];

/**
 * Generates an id for a new mock debit.
 * @type {Function}
 */
const generateId = () => {
  return String(debits.length + 1);
};

/**
 * Class representing the Debit API mocked for demo purposes.
 * It mocks a web API by working with the hard-coded data below.
 * It uses setTimeout to simulate the delay of an AJAX call.
 */
class DebitApi {

  /**
   * Get all the debit transactions.
   * @static
   * @returns {Promise} Resolves with an object array of all debits.
   */
  static getAllDebits() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], debits));
      }, delay);
    });
  }

  /**
   * Save a debit, whether an existing or new debit.
   * @static
   * @param {object} debit - The debit.
   * @returns {Promise} Resolves with the saved debit.
   */
  static saveDebit(debit) {
    debit = Object.assign({}, debit); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minDebitAmountLength = 1;
        if (debit.amount.length < minDebitAmountLength) {
          reject(`Amount must be at least ${minDebitAmountLength} numbers.`);
        }

        if (debit.id) {
          const existingDebitIndex = debits.findIndex(a => a.id == debit.id);
          debits.splice(existingDebitIndex, 1, debit);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new debits in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          debit.id = generateId();
          debits.push(debit);
        }

        resolve(debit);
      }, delay);
    });
  }

  /**
   * Delete a debit.
   * @static
   * @param {string} debitId - The debit id.
   * @returns {Promise} The promise object.
   */
  static deleteDebit(debitId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfDebitToDelete = debits.findIndex(debit => {
          debit.id == debitId;
        });
        debits.splice(indexOfDebitToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default DebitApi;

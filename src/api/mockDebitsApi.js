import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
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
    amount: "100.50",
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

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return String(debits.length + 1);
};

class DebitApi {
  static getAllDebits() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], debits));
      }, delay);
    });
  }

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

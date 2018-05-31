import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const credits = [{
  id: "1",
  postDate: "05/01/2018",
  description: "Salary",
  amount: "5000.00",
  category: "employment"
}];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return String(credits.length + 1);
};

class CreditApi {
  static getAllCredits() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], credits));
      }, delay);
    });
  }

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

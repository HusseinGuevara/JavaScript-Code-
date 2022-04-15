'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// Will the displlay all transctions
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

      containerMovements.insertAdjacentHTML
      ('afterbegin', html);
  })
}

// This function will add up all the values in the movements array and display on the UI
const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + 
  cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

// This function will display the incomes and outcomes
const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
    labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc, cur) => acc + cur);
  labelSumOut.textContent = `${Math.abs(out)}€`

  const interest = acc.movements  
    .filter(mov => mov > 0)
    .map(deposits => (deposits * `${acc.interestRate}`) / 100)
    .filter((mov, i, arr) => {
      // console.log(arr);
      return mov >= 1})
    .reduce((acc, cur) => acc + cur);
    labelSumInterest.textContent = `${Math.floor(interest)}€`
}

// This function will create user names for all account owners
const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0]) 
      .join("");
  })
};
createUsernames(accounts);

const updateUI = function(acc) {
   // Display movements
  displayMovements(acc.movements);
   // Display balance
  calcDisplayBalance(acc);
   // Display Summry
  calcDisplaySummary(acc);
}

// Event Handlers 

// Login Event
let currentAccount; 
btnLogin.addEventListener("click", function(e) {
  // Prevents the form from submitting
  e.preventDefault()
  
  currentAccount = accounts.find(acc => 
    acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Disply UI and messege
    labelWelcome.textContent = `Welcome back, 
      ${currentAccount.owner.split(" ")[0]}`;
      containerApp.style.opacity = 100;

    // Clear Input Fields 
    inputLoginUsername.value = inputLoginPin.value = "";
    // This will take away the focus on that input
    inputLoginPin.blur()
    
    // Display movements
    updateUI(currentAccount);
    // displayMovements(currentAccount.movements);
    // // Display balance
    // calcDisplayBalance(currentAccount);
    // // Display Summry
    // calcDisplaySummary(currentAccount);
  }
})

// Transfer Money Event
btnTransfer.addEventListener("click", function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
  console.log(receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();

  if(receiverAcc && amount > 0 && currentAccount.balance >= amount && receiverAcc?.userName !== currentAccount.userName) {
    console.log("Transfer Valid!!")
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);

  }
})

// Close Account Event
btnClose.addEventListener("click", function(e) {
  e.preventDefault()
  console.log("Close");
  // console.log(inputCloseUsername.value);
  // console.log(inputClosePin.value);

  const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
  console.log(index);

  if(inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin) {
      // Close Account
      accounts.splice(index, 1);
      console.log(accounts);

      // Hide UI
      containerApp.style.opacity = 0; 
    }
    inputClosePin.blur();   
    inputCloseUsername.value = "";
    inputClosePin.value = "";
  
})

// Get Loan
btnLoan.addEventListener("click", function(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  console.log(amount);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * .1)) {
    // Push Amount Into Movements Array
    currentAccount.movements.push(amount);

    // Clear Inputs
    inputLoanAmount.value = "";
    inputLoanAmount.blur();

    // Update UI
    updateUI(currentAccount);

  }
})

// Sort Movements

let sorted = false;
btnSort.addEventListener("click", function(e) {
  e.preventDefault();
  // console.log("Hello");
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





/////////////////////////////////////////////////

// Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// // console.log(arr.slice(2));
// // console.log(arr.slice(2, 4));
// // console.log(arr.slice(-2));
// // console.log(arr.slice(-1));
// // console.log(arr.slice(1, -2));
// // console.log(arr.slice());
// // console.log([...arr]);

// SPLICE
console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// // console.log(arr2.reverse());
// // console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// // console.log(letters);
// // console.log([...arr, ...arr2]);

// // JOIN
// // console.log(letters.join(' - '));

// // forEach() method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
//   for (const [i, movement] of movements.entries()) {
//   if(movement > 0) {
//     // console.log(`Movement ${i + 1}: You are withdrawing $${movement}.`)
//   } else {
//     // console.log(`Movement ${i + 1}: You are depositing $${Math.abs(movement)}.`)
//   }
// };

// // forEach() 
// movements.forEach(function(movement, index, array) { // the first argument in the function is the item in the array, second is the index, and third is the entire array
//   if(movement > 0) {
//     console.log(`Movement ${index + 1}: You are withdrawing $${movement}.`)
//   } else {
//     console.log(`Movement ${index + 1}: You are depositing $${Math.abs(movement)}.`)
//     // with a forEach() loop, one cannot break out of the loop
//   }
// });


// // forEach() with a map

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value, key) { 
//   // console.log(`Key: ${key}`)
//   // console.log(`Value: ${value}`)
// })

// // forEach() with a Set

// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR", "USD"]);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function(value, _, map) {
//   console.log(`${value}`)
// })

// Coding Challange #1



const checkDogs = function(dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0,1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJuliaCorrected);
  // console.log(dogsKate);

  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function(dog, i) {
    if(dog >= 3 ){
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old!`)
    } else {
      console.log(`Dog number ${i + 1} is still a puppy!`)
    }
  })

};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Data Transformation with array methods
// map()

// const eurToUsd = 1.1;

// const movementsUSD = account1.movements.map(function(mov) { // First argument is the current item, second is the index
//   console.log(mov * eurToUsd);
//   return mov * eurToUsd;
// });


// const movementsUSD = account1.movements.map(mov => mov * eurToUsd);


const movementsDescriptions = account1.movements.map((mov, i, arr) => {
  return `Movement ${i + 1}: You are ${mov > 0 ? "withdrawing" : 
  "depositing"} $${Math.abs(mov)}.`

  // if(mov > 0) {
  //   return `Movement ${i + 1}: You are withdrawing $${mov}.`
  // } else {
  //   return `Movement ${i + 1}: You are depositing $${Math.abs(mov)}.`
  // }
})

// console.log(movementsDescriptions);

// Filther method Array.filter()

const deposits = account1.movements.filter(function(mov) {
  return mov > 0;
})
// console.log(deposits);

const withdrawals = account1.movements.filter(mov => mov < 0);
// console.log(withdrawals);

// Reduce Method

const balance = account1.movements.reduce(function(acc, cur, i, arr) {
  return acc + cur
}, 0)
// console.log(balance);

// Maximum Value
const max = account1.movements.reduce((acc, cur) => {
  if(acc > cur) {
    return acc;
  } else {
    return cur;
  }
}, account1.movements[0])
// console.log(max);

// Coding Challange #2
const calcAverageHumanAge = function(ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age: 16 + age * 4));
  const adult = humanAges.filter(age => age >= 18);
  const average = adult.reduce((acc, cur, i, arr) => {
    return acc + cur / arr.length;
  }, adult[0] )
  console.log(adult);
  console.log(humanAges);
  console.log(average);
};
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// Chaining Methods

const eurToUsd = 1.1;

const totalDepositsUSD = Math.floor(account1.movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => { 
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov));

// console.log(totalDepositsUSD);

// Coding Challange #3
const calcAverageHumanAge2 = (ages) => 
  ages
  .map((age) => (age <= 2 ? age * 2: 16 + age * 4))
  .filter(age => age > 18)
  .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

  // console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));

// Find Method .find()

const firstWithdrawal = account1.movements.find(mov => mov < 0);
// console.log(account1.movements);
// console.log(firstWithdrawal);

// console.log(accounts);

const account = accounts.find(acc => acc.owner === "Jonas Schmedtmann");
// console.log(account);

// Some and Every Methods

// Includes checks to see if that element exist, it checks for  equality 
// console.log(account1.movements.includes(-130));

const anyDeposits = account1.movements.some(mov => mov > 1500);
// console.log(anyDeposits);

// Every Method. Checks to see if every element satisfies the conditon

// console.log(account1.movements.every(mov => mov > 0));
// console.log(account2.movements.every(mov => mov > 0));
// console.log(account3.movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// Seperate Callbacks 
const deposit = mov => mov > 0;

// console.log(account1.movements.some(deposit))
// console.log(account1.movements.filter(deposit))
// console.log(account1.movements.every(deposit))

// Flat Method
const nestedArr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(nestedArr.flat());

const deepArr = [[[1, 2], 3], [4, [5, 6], 7]];
// console.log(deepArr.flat(2)); // The argument in the .flat(2) is the number of levels the function can go

const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
const allMovements = accountMovements.flat();
// console.log(allMovements);

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
// console.log(overalBalance);

// Flat Map
const overalBalance2 = accounts
  .flatMap(acc => acc.movements) // The flatMap() cmethod can only go one level deep.
  .reduce((acc, cur) => acc + cur, 0);
// console.log(overalBalance2);

// Sort()

const owners = ["Harold", "Brianna", "Andrea", "Charlie"];
// console.log(owners.sort());

// console.log(account1.movements.sort());

// return < 0, A, B
// return > 0, B, A

// Ascending Order
account1.movements.sort((a, b) => { // The sort() method mutates the string, so use with caution;
  if(a > b) {
    return 1
  }
  if(b > a) {
    return -1
  }
})
// console.log(account1.movements)

// Descending Order
account1.movements.sort((a, b) => {
  if(a > b) {
    return -1  
  }
  if(b > a) {
    return 1
  }
})
// console.log(account1.movements)

// Fill Method

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const x = new Array(7);
// console.log(x);
// x.fill(1);
// console.log(x);
// x.fill(1, 4);
// console.log(x);
x.fill(9, 2, x.length-1); // The arguments are first: the item the item that will fill the array, second: what index to start at; third: what index to end
console.log(x);

// From Method
const y = Array.from({length: 10}, () => 1);
console.log(y);

const z = Array.from({length: 10}, (cur, i) => i + 10);
console.log(z);
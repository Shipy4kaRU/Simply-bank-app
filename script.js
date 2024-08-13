'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumPercent = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

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

// DISPLAY TRANSACTIONS

const displayTransactions = function (transactions) {
  containerTransactions.innerHTML = '';

  transactions.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const transactionRow = `
        <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">2 дня назад</div>
          <div class="transactions__value">${trans}$</div>
        </div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

displayTransactions(account1.transactions);

// CREATE THE NICKNAME OF USER

const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createNicknames(accounts);

// BALANCE

const displayBalance = function (acc) {
  const balance = acc.transactions.reduce((accum, trans) => {
    return accum + trans;
  }, 0);
  labelBalance.textContent = `${balance}$`;
};

displayBalance(account1);

// DEPOSITS

const displayDeposit = function (acc) {
  const totalDeposits = acc.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${totalDeposits}$`;
};

displayDeposit(account1);

// WITHDRAWS

const displayWithdraws = function (acc) {
  const totalWithdraws = acc.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + Math.abs(trans), 0);
  labelSumOut.textContent = `-${totalWithdraws}$`;
};

displayWithdraws(account1);

// PERCENT

const displayPercent = function (acc) {
  const totalPercent = acc.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => (acc = acc + (trans * this.interest) / 100), 0);
  labelSumPercent.textContent = `${totalPercent}$`;
};

displayPercent.call(account1, account1);

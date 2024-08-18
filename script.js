'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500.25, 250, -300.89, 5000, -850.1, -110.08, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

// SET DATA

const date = new Date();
const year = `${date.getFullYear()}`;
const month = `${date.getMonth() + 1}`.padStart(2, '0');
const day = `${date.getDate()}`.padStart(2, '0');

labelDate.innerHTML = `${day}/${month}/${year}`;

// DISPLAY TRANSACTIONS

// clear transactions box
const clearTrasaction = function () {
  containerTransactions.innerHTML = '';
};

// transactions sort by: -1: to Low, 0: No sort, 1: to Up
let areSorted = 0;

const displayTransactions = function (transactions) {
  let transactionSortBy;
  clearTrasaction();

  switch (areSorted) {
    case -1:
      transactionSortBy = transactions.slice().sort((x, y) => x - y);
      break;
    case 0:
      transactionSortBy = transactions;
      break;
    case 1:
      transactionSortBy = transactions.slice().sort((x, y) => y - x);
      break;
  }

  transactionSortBy.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const transactionRow = `
        <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">2 дня назад</div>
          <div class="transactions__value">${trans.toFixed(2)}$</div>
        </div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

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
  acc.balance = acc.transactions.reduce((accum, trans) => {
    return accum + trans;
  }, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}$`;
};

// DEPOSITS

const displayDeposit = function (acc) {
  const totalDeposits = acc.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${totalDeposits.toFixed(2)}$`;
};

// WITHDRAWS

const displayWithdraws = function (acc) {
  const totalWithdraws = acc.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + Math.abs(trans), 0);
  labelSumOut.textContent = `-${totalWithdraws.toFixed(2)}$`;
};

// PERCENT

const displayPercent = function (acc) {
  const totalPercent = acc.transactions
    .filter(trans => trans > 0)
    .reduce(
      (accum, trans) => (accum = accum + (trans * acc.interest) / 100),
      0
    );
  labelSumPercent.textContent = `${+totalPercent.toFixed(2)}$`;
};

// UPDATE USER UI

const updateUserUI = function () {
  //display total transactions
  displayTransactions(currentUser.transactions);
  // display balance
  displayBalance(currentUser);
  // display deposits, withdraws, percents
  displayDeposit(currentUser);
  displayWithdraws(currentUser);
  displayPercent(currentUser);
};

// USERS LOG IN

let currentUser;

const logIn = function (e) {
  e.preventDefault();
  const trimUserLogin = inputLoginUsername.value.trim();
  const UserPin = +inputLoginPin.value;
  const logUser = accounts.find(account => account.nickname === trimUserLogin);
  if (logUser?.pin === UserPin) {
    currentUser = logUser;
    // clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    // display UI
    labelWelcome.style.color = '#444';
    containerApp.style.opacity = '1';
    labelWelcome.textContent = `Рады, что вы снова с нами, ${
      currentUser.userName.split(' ')[0]
    }!`;
    updateUserUI();
  } else {
    // clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    // display UI-error
    labelWelcome.style.color = '#A0051C';
    labelWelcome.textContent = 'Неверный логин и/или пароль!';
    containerApp.style.opacity = '0';
  }
};

btnLogin.addEventListener('click', logIn);

//always log in for developing
currentUser = account1;
updateUserUI();
containerApp.style.opacity = '1';

// TRANSFERS

const transferTo = function (e) {
  e.preventDefault();
  const trimTransferNicknameTo = inputTransferTo.value.trim();
  const trimTransferAmount = +inputTransferAmount.value.trim();
  const trimTransferAccountTo = accounts.find(
    account => account.nickname === trimTransferNicknameTo
  );
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  if (
    trimTransferAmount > 0 &&
    trimTransferAmount <= currentUser.balance &&
    trimTransferAccountTo &&
    trimTransferAccountTo !== currentUser
  ) {
    currentUser.transactions.push(-trimTransferAmount);
    trimTransferAccountTo.transactions.push(trimTransferAmount);
    updateUserUI();
  }
};

btnTransfer.addEventListener('click', transferTo);

// DELETE ACCOUNT

const closeAccount = function (e) {
  e.preventDefault();
  const trimCloseNickname = inputCloseUsername.value;
  const trimClosePin = +inputClosePin.value.trim();
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  if (
    trimCloseNickname === currentUser.nickname &&
    trimClosePin === currentUser.pin
  ) {
    const closeIndexAccount = accounts.findIndex(
      account => account.nickname === trimCloseNickname
    );
    accounts.splice(closeIndexAccount, 1);
    labelWelcome.textContent = 'Войдите в свой аккаунт';
    containerApp.style.opacity = '0';
  }
};

btnClose.addEventListener('click', closeAccount);

// ASK LOANS

accounts.forEach(account => (account.isLoan = false));

const askLoan = function (e) {
  e.preventDefault();
  const loanValue = Math.trunc(inputLoanAmount.value);
  inputLoanAmount.value = '';
  if (
    loanValue > 0 &&
    currentUser.transactions.some(
      transaction => transaction >= loanValue / 10
    ) &&
    currentUser.isLoan === false
  ) {
    currentUser.transactions.push(loanValue);
    updateUserUI();
    currentUser.isLoan = true;
  }
};

btnLoan.addEventListener('click', askLoan);

//  SORT TRANSACTIONS BUTTON

btnSort.addEventListener('click', function () {
  areSorted >= 1 ? (areSorted = -1) : areSorted++;
  switch (areSorted) {
    case 1:
      btnSort.innerHTML = '&downarrow; СОРТИРОВКА';
      break;
    case 0:
      btnSort.innerHTML = 'СОРТИРОВКА ПО ДАТЕ';
      break;
    case -1:
      btnSort.innerHTML = '&uparrow; СОРТИРОВКА';
      break;
  }
  displayTransactions(currentUser.transactions);
});

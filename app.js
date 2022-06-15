
const prevDisp = document.querySelector('.previous-display');
const currDisp = document.querySelector('.current-display');

//?Button container
const btnContainer = document.querySelector('.container');


let currOperand = '';
let previousOperand = '';
let operation = '';

let equalOrPercentPressed = false;


btnContainer.addEventListener('click', (e) => {

  if (e.target.classList.contains('num')) {
    appendNumber(e.target.textContent);
    updateDisplay();
  }

  
  if (e.target.classList.contains('operator')) {
    chooseOperator(e.target.textContent);
    updateDisplay();
  }

  if (e.target.classList.contains('equal')) {
    calculate();
    updateDisplay();
    equalOrPercentPressed = true;
  }


  if (e.target.classList.contains('ac')) {
    previousOperand = '';
    currOperand = '';
    operation = '';
    updateDisplay();
  }

  if (e.target.classList.contains('pm')) {
    if (!currOperand) return;
    currOperand *= -1;
    updateDisplay();
  }

  
  if (e.target.classList.contains('percent')) {
    if (!currOperand) return;
    currOperand = currOperand / 100;
    updateDisplay();
    equalOrPercentPressed = true;
  }
});

const appendNumber = (num) => {

  if (currOperand === '0' && num === '0') return;


  if (currOperand === '0' && num !== '.') {
    currOperand = num;
    return;
  }


  if (num === '.' && currOperand.includes('.')) return;

  if (currOperand.length > 10) return;

  if (equalOrPercentPressed) {
    currOperand = num;
    equalOrPercentPressed = false;
    return;
  }

  currOperand += num;
};

const updateDisplay = () => {
  if (currOperand.toString().length > 11) {
    currOperand = Number(currOperand).toExponential(3);
  }
  currDisp.textContent = currOperand;

  if (operation && previousOperand) {
    prevDisp.textContent = `${previousOperand} ${operation}`;
  } else {
    prevDisp.textContent = '';
  }
};

const chooseOperator = (op) => {

  if (previousOperand) {
    calculate();
  }


  operation = op;
  previousOperand = currOperand;
  currOperand = '';
};

const calculate = () => {
  let calculation = 0;

  const prev = Number(previousOperand);
  const current = Number(currOperand);

  switch (operation) {
    case '+':
      calculation = prev + current;
      break;
    case '-':
      calculation = prev - current;
      break;
    case 'x':
      calculation = prev * current;
      break;
    case '÷':
      calculation = prev / current;
      break;
    default:
      return;
  }

  currOperand = calculation;
  previousOperand = '';
  operation = '';
};

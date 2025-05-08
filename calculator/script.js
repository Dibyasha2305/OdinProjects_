let currentOperand = '0';
let previousOperand = '';
let operation = null;
let resetScreen = false;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function updateDisplay() {
  currentDisplay.textContent = currentOperand;
  previousDisplay.textContent = previousOperand;
}

function handleButton(value) {
  if (!isNaN(value)) {
    appendNumber(value);
  } else if (value === '.') {
    appendDecimal();
  } else if (value === 'AC') {
    clearAll();
  } else if (value === '+/-') {
    toggleSign();
  } else if (value === '%') {
    percentage();
  } else if (['+', '-', '*', '/'].includes(value)) {
    setOperation(value);
  } else if (value === '=') {
    calculate();
  }
  updateDisplay();
}

function appendNumber(number) {
  if (currentOperand === '0' || resetScreen) {
    currentOperand = number;
    resetScreen = false;
  } else {
    currentOperand += number;
  }
}

function appendDecimal() {
  if (resetScreen) {
    currentOperand = '0.';
    resetScreen = false;
    return;
  }
  if (!currentOperand.includes('.')) {
    currentOperand += '.';
  }
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = null;
}

function toggleSign() {
  currentOperand = (parseFloat(currentOperand) * -1).toString();
}

function percentage() {
  currentOperand = (parseFloat(currentOperand) / 100).toString();
}

function setOperation(op) {
  if (currentOperand === '') return;
  if (operation !== null) calculate();
  operation = op;
  previousOperand = currentOperand;
  resetScreen = true;
}

function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+': computation = prev + current; break;
    case '-': computation = prev - current; break;
    case '*': computation = prev * current; break;
    case '/': computation = prev / current; break;
    default: return;
  }

  currentOperand = computation.toString();
  operation = null;
  previousOperand = '';
  resetScreen = true;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (/[0-9]/.test(e.key)) handleButton(e.key);
  else if (e.key === '.') handleButton('.');
  else if (e.key === 'Escape') handleButton('AC');
  else if (e.key === 'Enter' || e.key === '=') handleButton('=');
  else if (['+', '-', '*', '/'].includes(e.key)) handleButton(e.key);
});

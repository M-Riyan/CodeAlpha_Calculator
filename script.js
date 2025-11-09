const calculator = {
    displayValue: '0',
    history: '',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    document.querySelector('.calculator-screen').value = calculator.displayValue;
    document.querySelector('.history-screen').value = calculator.history;
}

function inputDigit(digit) {
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
    }
}

function inputDecimal() {
    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculator.displayValue);

    if (calculator.firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
        calculator.displayValue = calculate(calculator.firstOperand, inputValue, calculator.operator);
        calculator.firstOperand = parseFloat(calculator.displayValue);
    }

    calculator.operator = nextOperator;
    calculator.waitingForSecondOperand = true;
}

function calculate(op1, op2, operator) {
    switch (operator) {
        case '+': return op1 + op2;
        case '-': return op1 - op2;
        case '*': return op1 * op2;
        case '/': return op2 === 0 ? 'Error' : op1 / op2;
        default: return op2;
    }
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.history = '';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

function backspace() {
    calculator.displayValue = calculator.displayValue.slice(0, -1) || '0';
}

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const value = event.target.value;
    if (!value) return;

    if (['+', '-', '*', '/'].includes(value)) handleOperator(value);
    else if (value === '=') handleOperator(value);
    else if (value === '.') inputDecimal();
    else if (value === 'clear') resetCalculator();
    else if (value === 'backspace') backspace();
    else inputDigit(value);

    updateDisplay();
});

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') inputDigit(key);
    else if (['+', '-', '*', '/'].includes(key)) handleOperator(key);
    else if (key === 'Enter') handleOperator('=');
    else if (key === '.') inputDecimal();
    else if (key === 'Backspace') backspace();

    updateDisplay();
});

updateDisplay();

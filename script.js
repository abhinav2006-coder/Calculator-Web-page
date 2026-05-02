let display = document.getElementById('display');
let currentInput = '0';
let operators = ['+', '-', '*', '/'];

function updateDisplay() {
    display.innerText = currentInput;
}

function SetNumber(num) {
    let lastNumber = currentInput.split(/[\+\-\*\/]/).pop();

    if (num === '.' && lastNumber.includes('.')) return;

    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }

    updateDisplay();
}

function SetOperator(op) {
    let lastChar = currentInput.slice(-1);

    if (currentInput === '0') return;

    if (operators.includes(lastChar)) {
        currentInput = currentInput.slice(0, -1);
    }

    currentInput += op;
    updateDisplay();
}

function ClearAll() {
    currentInput = '0';
    updateDisplay();
}

function Clear() {
    currentInput = currentInput.slice(0, -1);

    if (currentInput === '' || currentInput === '-') {
        currentInput = '0';
    }

    updateDisplay();
}

function percentage() {
    try {
        let value = parseFloat(currentInput);
        if (!isNaN(value)) {
            currentInput = (value / 100).toString();
        }
    } catch {
        currentInput = 'Error';
    }

    updateDisplay();
}

function Calculate() {
    try {
        let lastChar = currentInput.slice(-1);

        if (operators.includes(lastChar)) {
            currentInput = currentInput.slice(0, -1);
        }

        let result = eval(currentInput);

        if (!isFinite(result)) {
            throw new Error();
        }

        currentInput = result.toString();
    } catch {
        currentInput = 'Error';
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1000);
    }

    updateDisplay();
}

document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) SetNumber(e.key);

    if (operators.includes(e.key)) SetOperator(e.key);

    if (e.key === '.') SetNumber('.');

    if (e.key === 'Enter') Calculate();

    if (e.key === 'Backspace') Clear();

    if (e.key === 'Escape') ClearAll();
});
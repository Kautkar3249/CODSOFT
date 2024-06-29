// Get display element and all buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';  // Current input value
let operator = '';      // Current operator
let previousInput = ''; // Previous input value

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        // Handle clear button
        if (value === 'C') {
            clearCalculator();
            return;
        }

        // Handle equals button
        if (value === '=') {
            calculateResult();
            return;
        }

        // Handle operator buttons
        if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
            return;
        }

        // Handle number and decimal input
        appendInput(value);
    });
});

// Function to clear the calculator
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.textContent = '';
    display.style.fontSize = '2em';
}

// Function to calculate and display the result
function calculateResult() {
    if (currentInput && previousInput) {
        currentInput = calculate(previousInput, currentInput, operator);
        adjustFontSize(currentInput);
        display.textContent = currentInput;
        previousInput = '';
        operator = '';
    }
}

// Function to set the current operator
function setOperator(value) {
    if (currentInput) {
        previousInput = currentInput;
        currentInput = '';
        operator = value;
    }
}

// Function to append input values to the current input
function appendInput(value) {
    currentInput += value;
    adjustFontSize(currentInput);
    display.textContent = currentInput;
}

// Function to perform the calculation
function calculate(a, b, operator) {
    let result;
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
        default:
            result = 0;
    }

    return result.toString();
}

// Function to adjust font size based on input length
function adjustFontSize(input) {
    const length = input.length;
    if (length > 10) {
        display.style.fontSize = '1.5em';
    } else if (length > 7) {
        display.style.fontSize = '1.75em';
    } else {
        display.style.fontSize = '2em';
    }
}

// Get the display element
const display = document.getElementById('display');

// Global variable to store the current display string and full calculation string
display.textContent = '';
let calculation = '';
let decimalPresent = false;
let operatorPresent = false;

// Function to update the display
const updateDisplay = (value) => {
    // Display options for number inputs
    if (Number.isInteger(+value)) {
        if (display.textContent.length < 8) {
            display.textContent += value;
        }
        operatorPresent = false;
    }
    
    // Display options for operator inputs
    if (['+', '-', '/', '*'].includes(value)) {
        if (operatorPresent === false) {
            const displayToCalculation = display.textContent += value;
            calculation += displayToCalculation;
            clearDisplay(value);
            operatorPresent = true;
        }
    }

    // Display options for decimal input
    if (value === '.') {
        if (decimalPresent === false && display.textContent.length > 0) {
            display.textContent += value;
            decimalPresent = true;
        }

        else {
            display.textContent;
        }
    }

    // Display options for equals sign and perform calculation
    if (value === '=') {
        if (operatorPresent === false) {
            calculation += display.textContent;
            display.textContent = calculate();
        }
    }
};

// Function to clear display back to blank 
const clearDisplay = (value) => {
    if (value === 'AC') {
        display.textContent = '';
        calculation = '';
        decimalPresent = false;
    }
    else if (['+', '-', '/', '*'].includes(value)) {
        display.textContent = '';
        decimalPresent = false;
    };
};

// Function to make calculation 
const calculate = () => {
    // Split the calculation string into operands and operators
    const operands = calculation.split(/\+|\-|\*|\//g);
    const operators = calculation.match(/\+|\-|\*|\//g);
  
    // Perform the calculations
    let result = parseFloat(operands[0]);
  
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const operand = parseFloat(operands[i + 1]);
  
        switch (operator) {
            case '+':
                result += operand;
                break;
            case '-':
                result -= operand;
                break;
            case '*':
                result *= operand;
                break;
            case '/':
                result /= operand;
                break;
        }
    }
  
    // Check if result is an integer, if so, don't display decimal places
    if (Number.isInteger(result)) {
        result = result.toString(); // If result is an integer
    } else {
        result = result.toFixed(2); // If result is not an integer
    }
  
    calculation = '';
    return result;
};

// Function to set up event listeners
const setupEventListeners = () => {
    // Get all number buttons and operator buttons using query selector
    const numBtns = document.querySelectorAll('.btn-num');
    const operatorBtns = document.querySelectorAll('.btn-operator');
    const equalBtn = document.getElementById('btn-equal');
    const clearBtn = document.getElementById('clear');
    const decimalBtn = document.getElementById('btn-decimal');

    // Add event listeners to number buttons
    numBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
          const { value } = event.target;
          updateDisplay(value);
        });
      });

    // Add event listeners to operator buttons
    operatorBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
            const { value } = event.target;
            updateDisplay(value);
        });
    });

    // Add event listener to equal button
    equalBtn.addEventListener('click', () => {
        updateDisplay('=');
    })

    // Add event listener to 'AC' button
    clearBtn.addEventListener('click', () => {
        clearDisplay('AC');
    });

    // Add event listener to decimal button
    decimalBtn.addEventListener('click', () => {
        updateDisplay('.')
    })
};

// Set up event listeners
setupEventListeners();
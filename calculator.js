// Get the display element
const display = document.getElementById('display');

// Variable to store the current calculation
let calculation = '';

// Get the 'AC' button
const clearButton = document.getElementById('clear');

// Add event listener to 'AC' button
clearButton.addEventListener('click', () => {
  updateDisplay('AC');
});

// Function to update the display
let isOperatorClicked = false;

const updateDisplay = (value) => {
    if (value === 'AC') {
        // Clear the display and calculation
        display.textContent = '';
        calculation = '';
    } else if (value === '=') {
        // Check if there's a valid calculation to perform
        if (calculation) {
            calculate();
            return; // Exit the function to prevent further execution
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        // Check if the calculation string is empty or already has an operator
        if (calculation === '' || /[\+\-\*\/]$/.test(calculation)) {
            // Replace the last operator in the calculation string
            calculation = calculation.slice(0, -1) + value;
        } else {
            // Append the operator to the calculation string
            calculation += value;
        }
        isOperatorClicked = true;
    } else {
        // Append the number to the calculation string
        calculation += value;
        // We only display the number buttons pressed, but clear the display if operator was clicked
        if (isOperatorClicked) {
            display.textContent = value;
            isOperatorClicked = false;
        } else {
            display.textContent += value;
        }
    }
};

  
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
        display.textContent = result.toString(); // If result is an integer
    } else {
        display.textContent = result.toFixed(2); // If result is not an integer
    }
  
    calculation = '';
};

// Function to set up event listeners
const setupEventListeners = () => {
  // Get all number buttons
  const numberButtons = document.querySelectorAll('.btn-num');
  // Get all operator buttons
  const operatorButtons = document.querySelectorAll('.btn-operator');

  // Add event listeners to number buttons
  numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const { value } = event.target;
      updateDisplay(value);
    });
  });

  // Add event listeners to operator buttons
  operatorButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const { value } = event.target;
      updateDisplay(value);
    });
  });

   // Add event listener to equal button
   const equalButton = document.getElementById('btn-equal');
   equalButton.addEventListener('click', () => {
     updateDisplay('=');
   });
};

// Set up event listeners
setupEventListeners();

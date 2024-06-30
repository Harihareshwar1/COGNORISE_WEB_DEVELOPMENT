// script.js

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const clearButton = document.getElementById('clear');
    const equalButton = document.getElementById('equal');

    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('operator')) {
                if (currentInput && !operator) {
                    firstOperand = currentInput;
                    operator = value;
                    currentInput = '';
                } else if (currentInput && operator) {
                    // If there's already an operator, calculate the result first
                    firstOperand = calculate(parseFloat(firstOperand), operator, parseFloat(currentInput));
                    operator = value;
                    currentInput = '';
                }
                displayResult();
            } else {
                if (resultDisplayed) {
                    currentInput = value;
                    resultDisplayed = false;
                } else {
                    currentInput += value;
                }
                displayResult();
            }
        });
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        operator = '';
        firstOperand = '';
        display.innerText = '0';
    });

    equalButton.addEventListener('click', () => {
        if (currentInput && operator) {
            const result = calculate(parseFloat(firstOperand), operator, parseFloat(currentInput));
            display.innerText = formatResult(result);
            currentInput = result.toString();
            operator = '';
            firstOperand = '';
            resultDisplayed = true;
        }
    });

    function displayResult() {
        let displayText = firstOperand + ' ' + operator + ' ' + currentInput;
        if (displayText.length > 15) {
            displayText = formatResult(parseFloat(currentInput));
        }
        display.innerText = displayText;
    }

    function formatResult(result) {
        return result.toLocaleString(undefined, { maximumFractionDigits: 6 });
    }

    function calculate(firstOperand, operator, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return 0;
        }
    }
});

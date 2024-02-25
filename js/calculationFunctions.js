/**
 * @Function to evaluate and display the result of the mathematical expression.
 * Also handles errors during expression evaluation.
 */
function calculate() {
    if (display.value === '') return;
    clearErrors();
    let expression = prepareExpression(display.value);
    let result;
    try {
        result = eval(expression);
    } catch (error) {
        ereur = true;
        displayError();
        return;
    }
    display.value = result;
}

/**
 * @Function to prepare the expression for evaluation.
 * Replaces mathematical functions with their JavaScript equivalents.
 * @param {string} expression - The expression to prepare.
 * @returns {string} The prepared expression.
 */
function prepareExpression(expression) {
    return expression.replace(/sqrt|cos|sin|tan|log|π|\^/g, function(match) {
        switch (match) {
            case 'sqrt': return 'Math.sqrt';
            case 'cos': return 'Math.cos';
            case 'sin': return 'Math.sin';
            case 'tan': return 'Math.tan';
            case '^': return '**';
            case 'log': return 'Math.log';
            case 'π': return 'Math.PI';
        }
    });
}

/**
 * @Function to convert the displayed expression to binary.
 * Handles errors during conversion.
 */
function convertToBinary() {
    let expression = document.getElementById('display').value;
    if (expression === '') return;
    if (isNaN(expression)) {
        displayError();
        ereur = true;
        return;
    }
    let result;
    try {
        result = parseInt(expression, 10).toString(2);
    } catch (error) {
        displayError();
        ereur = true;
    }
    document.getElementById('display').value = result;
}

/**
 * @Function to calculate the percentage of the displayed expression.
 * Handles errors during calculation.
 */
function calculatePercentage() {
    let expression = document.getElementById('display').value;
    if (expression === '') return;
    clearErrors();
    let result;
    try {
        result = eval(prepareExpression(expression)) * 0.01; 
    }
    catch (error) {
        result = 'Error';
        ereur = true;
    }
    display.value = result;
}
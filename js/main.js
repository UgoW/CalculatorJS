// Constants for DOM selectors
const display = document.getElementById('display');
const graphCanvas = document.getElementById('graphCanvas');

var ereur = false;

/**
 * @Function to append a value to the display.
 * If a previous error was displayed, clears the display.
 * @param {string} value - The value to append to the display.
 */
function appendToDisplay(value) {
    if (ereur) {
        clearDisplay();
        ereur = false;
    }
    display.value += value;
}

/**
 * @Function that handles keydown events registered on the document.
 * Detects the pressed keys and performs appropriate actions.
    * If a letter or number key is pressed, appends the key to the display.
 * @param {Event} event - The triggered keydown event.
 */
document.addEventListener('keydown', function(event) {
    const key = event.key;
    switch (key) {
        case 'Enter':
            if (ereur == false) {
                calculate();
            }    
            break;
        case 'Backspace':
            deleteLast();
            break;
        default:
            if (key.length === 1 && key !== ' ') {
                appendToDisplay(key);
            }
            break;
    }
});

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
 * @Function to display an error message on the display.
 * Clears the display and sets the value to 'Error'.
*/
function displayError() {
    clearDisplay();
    display.value = 'Error';
}

/**
 * @Function to clear the display.
 * Resets the value of the display to an empty string.
 * Also hides the canvas used for the graph.
 */
function clearDisplay() {
    display.value = '';
    graphCanvas.style.display = 'none';
}

/**
 * @Function to prepare the expression for evaluation.
 * Replaces mathematical functions with their JavaScript equivalents.
 * @param {string} expression - The expression to prepare.
 * @returns {string} The prepared expression.
 * @example
 * // returns 'Math.sqrt(4) + Math.PI'
 * prepareExpression('sqrt(4) + π');
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
    let result;
    try {
        // Convert the expression to binary
        result = parseInt(expression, 10).toString(2);
    } catch (error) {
        result = 'Error';
        ereur = true;
    }
    document.getElementById('display').value = result;
}

/**
 * @Function hide Graph Canvas
 * if graph is displayed, hide it
*/
function clearErrors() {
    if (graphCanvas.style.display !== 'none') {
        hideGraphCanvas();
    }
}

/**
 * @Function to draw the graph of the displayed expression.
 * Handles cases where the expression is empty or contains only numbers.
 * Uses Chart.js to draw the graph.
 */
function drawGraph() {
    let expression = document.getElementById('display').value;
    if (expression === '') {
        document.getElementById('graphCanvas').style.display = 'none';
        return 0;
    }
    // If the expression contains only numbers, do not display the graph
    if (expression.match(/^[0-9]+$/) != null) {
        document.getElementById('graphCanvas').style.display = 'none';
        return 0;
    }
    document.getElementById('graphCanvas').style.display = 'block';
    // Replace mathematical functions with their JavaScript equivalents
    expression = expression.replace(/sqrt/g, 'Math.sqrt');
    expression = expression.replace(/cos/g, 'Math.cos');
    expression = expression.replace(/sin/g, 'Math.sin');
    expression = expression.replace(/tan/g, 'Math.tan');
    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/log/g, 'Math.log');
    expression = expression.replace(/π/g, 'Math.PI');
    const canvas = document.getElementById('graphCanvas');
    canvas.width = 400;
    canvas.height = 200; 
    const ctx = canvas.getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    const xValues = [];
    for (let x = 0; x <= 20; x += 1) {
        xValues.push(x);
    }
    const yValues = xValues.map(x => {
        if (expression.includes('x')) {
            let yExpression = expression.replace(/x/g, x); 
            let y = eval(yExpression);
            return {x: x, y: y};
        } else {
            let yExpression = expression.replace(/\((\d+)\)/g, '(' + x + ')'); 
            let y = eval(yExpression);
            return {x: x, y: y};
        }
    });
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                data: yValues,
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: expression.includes('x') ? 'blue' : yValues.map(point => point.y === eval(expression) ? 'red' : 'blue')
            }]
        },
        options: {
            responsive: false, 
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    
                }
        }
    }});
}

/**
 * @Function to toggle between dark mode and light mode.
 * Adds or removes the 'dark-mode' class from the document body.
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

/**
 * @Function to delete the last character from the display.
 * If an error was displayed, also clears the display.
 * If the last character is the beginning of a function, deletes the entire function.
 */
function deleteLast() {
    var display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    if (ereur) {
        console.log('ereur');
        clearDisplay();
        ereur = false;
    }
    if (display.value.slice(-3) == 'sin' || display.value.slice(-3) == 'cos' || display.value.slice(-3) == 'tan' || display.value.slice(-4) == 'sqrt' || display.value.slice(-3) == 'log'){
        display.value = display.value.slice(0, -3);
    }
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
        result = 'Error';
        ereur = true;
    }
    catch (error) {
        result = 'Error';
        ereur = true;
    }
    display.value = result;
}
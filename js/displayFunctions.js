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
    hideGraphButtons();
}

/**
 * @Function to show the graph canvas.
 * Sets the display of the canvas to 'flex'.
 */
function showGraphButtons() {
    document.getElementById('graphButtonsRow').style.display = 'flex';
}

/**
 * @Function to hide the graph canvas.
 * Sets the display of the canvas to 'none'.
 */
function hideGraphButtons() {
    document.getElementById('graphButtonsRow').style.display = 'none';
}

/**
 * @Function to clear the graph canvas.
 * Sets the display of the canvas to 'none'.
 */
function clearErrors() {
    if (graphCanvas.style.display !== 'none') {
        graphCanvas.style.display = 'none';
    }
}
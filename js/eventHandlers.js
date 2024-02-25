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
        case 'ArrowLeft':
            moveGraphLeft();
            break;
        case 'ArrowRight':
            moveGraphRight();
            break;
        default:
            if (key.length === 1 && key !== ' ') {
                appendToDisplay(key);
            }
            break;
    }
});

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
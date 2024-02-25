/**
 * @Function to move the graph to the left.
 * Decrements the current offset and redraws the graph.
 */
function moveGraphLeft() {
    currentOffset -= 1;
    drawGraph();
}

/**
 * @Function to move the graph to the right.
 * Increments the current offset and redraws the graph.
 */
function moveGraphRight() {
    currentOffset += 1;
    drawGraph();
}

/**
 * @Function to reset the graph offset to the center.
 */
function resetGraphOffset() {
    currentOffset = 0;
    drawGraph();
}

/**
 * @Function to draw the graph of the displayed expression.
 * Handles cases where the expression is empty or contains only numbers.
 * Uses Chart.js to draw the graph.
 */
function drawGraph() {
    let expression = document.getElementById('display').value;
    showGraphButtons();
    document.getElementById('graphCanvas').style.display = 'block';
    // If the expression contains only numbers, do not display the graph
    if (expression.match(/^[0-9]+$/) != null || expression === '' || ereur) {
        document.getElementById('graphCanvas').style.display = 'none';
        hideGraphButtons();
        return 0;
    }
    try {
        eval(prepareExpression(expression).replace(/x/g, '0'));
    } catch (error) {
        document.getElementById('graphCanvas').style.display = 'none';
        hideGraphButtons();
        ereur = true;
        displayError();
        return;
    }

    document.getElementById('graphCanvas').style.display = 'block';
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
    for (let x = currentOffset - 5; x <= currentOffset + 5; x += 0.4) {
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
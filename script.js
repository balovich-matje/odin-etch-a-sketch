const gridContainer = document.querySelector('.grid');
const gridSize = 20;

function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b})`;
}

function drawSquares(size) {
    const containerWidth = gridContainer.clientWidth;
    const squareSize = containerWidth / size;

    for (let i = 0; i < size * size; i++) {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('grid-square');
        squareDiv.classList.add('grid-square-not-painted');
        squareDiv.style.width = `${squareSize}px`;
        squareDiv.style.height = `${squareSize}px`;
        squareDiv.addEventListener('mouseover', () => {
            if (squareDiv.classList.contains('grid-square-not-painted')) {
                squareDiv.classList.remove('grid-square-not-painted');
                squareDiv.classList.add('grid-square-painted');
                const randomColor = getRandomRGB();
                squareDiv.style.backgroundColor = randomColor;
                console.log(randomColor);
            }

            if (squareDiv.classList.contains('grid-square-painted')) {
                let bgColor = window.getComputedStyle(squareDiv).backgroundColor;

                // Check if the background color is in RGB or RGBA format
                let match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+)?\)/);

                if (match) {
                    let r = match[1];
                    let g = match[2];
                    let b = match[3];
                    let a = match[4] !== undefined ? parseFloat(match[4]) : 1; // Default to 1 if no alpha

                    // Decrease opacity by 10%
                    a = Math.max(0, a - 0.1); // Ensure opacity doesn't go below 0

                    // Set the new background color with decreased opacity
                    squareDiv.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
                }
            }
        }
        );
        gridContainer.appendChild(squareDiv);
    }
}



window.addEventListener('resize', function () {
    gridContainer.innerHTML = '';
    drawSquares(gridSize);
});

const sizeButton = document.querySelector('.ask-size-btn');
sizeButton.addEventListener('click', () => {
    const newGridSize = prompt("Gib size(1-100): ");
    if (newGridSize > 100) {
        alert("Error, too big number");
    }
    else if (newGridSize < 1) {
        alert("Error, number needs to be > 0");
    }
    else {
        gridContainer.innerHTML = '';
        drawSquares(newGridSize);
    }
})

drawSquares(gridSize);
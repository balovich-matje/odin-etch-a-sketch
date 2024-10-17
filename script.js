const gridContainer = document.querySelector('.grid');
const gridSize = 20;

function drawSquares(size) {
    const containerWidth = gridContainer.clientWidth;
    const squareSize = containerWidth / size;

    for (let i = 0; i < size * size; i++) {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('grid-square');
        squareDiv.classList.add('grid-square-not-painted');
        squareDiv.style.width = `${squareSize}px`;
        squareDiv.style.height = `${squareSize}px`;

        // The drawing logic
        squareDiv.addEventListener('mouseover', () => {
            if (squareDiv.classList.contains('grid-square-painted')) {
                squareDiv.classList.remove('grid-square.painted');
                squareDiv.classList.add('grid-square-not-painted');
            }
            else {
                squareDiv.classList.remove('grid-square-not-painted');
                squareDiv.classList.add('grid-square-painted')
            }
        })
        gridContainer.appendChild(squareDiv);
    }
}

window.addEventListener('resize', function () {
    gridContainer.innerHTML = '';
    createGrid(gridSize);
});

const sizeButton = document.querySelector('.ask-size-btn');
document.addEventListener('click', () => {
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
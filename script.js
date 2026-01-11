const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".grid-resize");
let currentSize = 16;

resizeButton.addEventListener("click", () => {
    const input = prompt("Enter the number of squares per side for the new grid (1-100):");
    const newSize = parseInt(input, 10);
    if (Number.isNaN(newSize)) return;
    currentSize = newSize;
    drawGrid(currentSize);
});

window.addEventListener('resize', () => {
    drawGrid(currentSize);
});

function drawGrid(size) {
    size = Number(size);
    if (!Number.isInteger(size) || size < 1 || size > 100) {
        alert("Please enter an integer between 1 and 100.");
        currentSize = 16;
        size = 16;
    }

    // calculate available inner size (account for container padding)
    const containerStyle = getComputedStyle(gridContainer);
    const paddingX = parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight);
    const paddingY = parseFloat(containerStyle.paddingTop) + parseFloat(containerStyle.paddingBottom);

    const availableWidth = gridContainer.clientWidth - paddingX;
    const availableHeight = gridContainer.clientHeight - paddingY;

    const cellSize = Math.floor(Math.min(availableWidth / size, availableHeight / size));

    gridContainer.innerHTML = "";

    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.style.height = `${cellSize}px`;
        for (let j = 0; j < size; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.width = `${cellSize}px`;
            square.style.height = `${cellSize}px`;
            square.addEventListener("mouseover", () => {
                square.style.backgroundColor = "black";
            });

            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }
}

function switchToDefaultMode() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = "black";
        });
    });
    clearGrid();
}

function switchToRainbowMode() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            square.style.backgroundColor = randomColor;
        });
    });
    clearGrid();
}

function switchToGradientMode() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        let opacity = 0;
        square.addEventListener("mouseover", () => {
            if (opacity < 1) {
                opacity += 0.1;
            }
            square.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        });
    });
    clearGrid();
}

function clearGrid() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.style.backgroundColor = "white";
    });
}

const defaultButton = document.querySelector(".grid-default");
const rainbowButton = document.querySelector(".grid-rainbow");
const gradientButton = document.querySelector(".grid-gradient");

defaultButton.addEventListener("click", switchToDefaultMode);
rainbowButton.addEventListener("click", switchToRainbowMode);
gradientButton.addEventListener("click", switchToGradientMode);

drawGrid(currentSize);
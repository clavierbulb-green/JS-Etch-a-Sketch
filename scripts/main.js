const grid = document.getElementById("grid");
const defaultSideLength = 24;

const clearButton = document.getElementById("clear_button");
clearButton.addEventListener("click", () => clearGrid());

const drawButton = document.getElementById("draw_button");
drawButton.addEventListener("click", () => {
    drawButton.classList.toggle("active");
});

const sizeSlider = document.getElementById("grid_size");
sizeSlider.addEventListener("mouseup", () => {
    removeSquares();
    populateGrid(sizeSlider.value);
});

window.addEventListener("load", () => {
    populateGrid(defaultSideLength);
});


function removeSquares() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function clearGrid() {
    let squares = grid.childNodes;
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        if (square.classList.contains("marked")) {
            square.classList.remove("marked");
        }
    }
}


function populateGrid(sideLength) {
    grid.style["grid-template-columns"] = `repeat(${sideLength}, 1fr)`;
    for (let row = 0; row < sideLength; row++) {
        for (let col = 0; col < sideLength; col++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.addEventListener("mouseenter", () => {
                if (drawButton.classList.contains("active")) {
                    square.classList.add("marked");
                }
            });
            grid.appendChild(square);
        }
    }
}

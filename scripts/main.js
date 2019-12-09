const DEFAULT_SIZE = 16;

const grid = document.getElementById("grid");

const clearButton = document.getElementById("clear_button");
clearButton.addEventListener("click", () => clearGrid());

const drawButton = document.getElementById("draw_button");
drawButton.addEventListener("click", () => {
    drawButton.classList.toggle("active");
});

const sizeButtons = document.getElementsByClassName("size");
for (let i = 0; i < sizeButtons.length; i++){
    let button = sizeButtons[i];
    button.addEventListener("click", () => {
        removeSquares();
        populateGrid(button.textContent);

        for (let j = 0; j < sizeButtons.length; j++) {
            sizeButtons[j].classList.remove("current_size");
        }
        button.classList.add("current_size");
    });
    if (button.textContent == DEFAULT_SIZE) {
        button.classList.add("current_size");
    }
}

window.addEventListener("load", () => {
    populateGrid(DEFAULT_SIZE);
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

            function markSquare() {
                if (drawButton.classList.contains("active")) {
                    square.classList.add("marked");
                }
            }
            square.addEventListener("mouseenter", markSquare);
            square.addEventListener("pointerdown", (e) => {
                markSquare();
                square.releasePointerCapture(e.pointerId);
            });
            square.addEventListener("pointerenter", markSquare);

            grid.appendChild(square);
        }
    }
}

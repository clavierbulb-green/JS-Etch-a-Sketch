//Create a webpage with a 16x16 grid of square divs 

//variables
let numRows= 32;
let numColumns = 32;
let isDrawing = false; 
let fineDraw = false;

let grid__container = document.querySelector(".grid__container");

//add functionality to button
let clear__button = document.querySelector("#clear__button");
clear__button.addEventListener("click", e => {
    clearGrid();
    if (prompt("Make a new grid?" + 
    " (enter 'yes' for a new grid)").toLowerCase() === "yes") {
        makeNewGrid(); 
    }
});

let toggle__gradient__button =
document.querySelector("#toggle__gradient__button");
toggle__gradient__button.addEventListener("click", e => {
    fineDraw = !fineDraw;
    if (fineDraw) {
        toggle__gradient__button.textContent = "TOGGLE MODE [FINE]";
    }
    else {
        toggle__gradient__button.textContent = "TOGGLE MODE [BASIC]";
    }
});

/*==========FUNCTIONS==========*/

function addSquares() {
    for (let row = 1; row <= numRows; row++) {
        for (let col = 1; col <= numColumns; col++) {
            let square = document.createElement('div');
            square.style["grid-column"] = col;
            square.style["grid-row"] = row;

            square.setAttribute("color-key", "0");
            square.style["background-color"] = "black";
            square.style.border = "1px #AAAAAA solid";

            /*a square is marked by a mouse-click on the square
            squares continue to be marked as the mouse hovers over them
            as long as the mouse is down*/
            square.addEventListener("mouseenter", e => {
                if (isDrawing) {
                    if (fineDraw) {
                        changeColor(square);
                    }
                    else {
                        square.setAttribute("color-key", "f");
                        square.style["background-color"] = 'white';
                    }
                }
            });
            square.addEventListener("mousedown", e => {
                isDrawing = true;
                if (fineDraw) {
                    changeColor(square);
                }
                else {
                    square.setAttribute("color-key", "f");
                    square.style["background-color"] = 'white';
                }
            });
            square.addEventListener("mouseup", e => {
                isDrawing = false;
            });

            grid__container.appendChild(square);
        }
    }
}

function changeColor(square) {
    let colorHex = parseInt(square.getAttribute("color-key"), 16);
    colorHex += 4;
    let colorString = colorHex.toString(16);
    square.setAttribute("color-key", colorString);
    colorString = "#" + colorString.repeat(6);
    square.style["background-color"] = colorString;
}

function clearGrid() {
    //console.log('in clearGrid()');
    let squares = document.querySelectorAll('.grid__container div');
    squares.forEach(listObj => {
        listObj.setAttribute("color-key", "0");
        listObj.style["background-color"] = "black";
    });
}

function makeNewGrid() {
    let newLength = 0;
    while (newLength < 2 || newLength >= 100) {
        newLength = prompt("how many squares per side to make the new grid?" +
        "(Enter a length between 2 and 100)");
    }
    numRows = newLength;
    numColumns = newLength;

    let squares = document.querySelectorAll('.grid__container div');
    squares.forEach(listObj => {
        listObj.remove();
    });
    addSquares();
}

addSquares();


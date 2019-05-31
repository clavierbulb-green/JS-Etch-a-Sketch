//Create a webpage with a 16x16 grid of square divs 

//variables
let numRows= 16;
let numColumns = 16;
let isDrawing = false; 

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

/*==========FUNCTIONS==========*/

function addSquares() {
    for (let row = 1; row <= numRows; row++) {
        for (let col = 1; col <= numColumns; col++) {
            let newSquare = document.createElement('div');
            newSquare.style["grid-column"] = col;
            newSquare.style["grid-row"] = row;

            newSquare.style.border = "1px #AAAAAA solid";

            /*a square is marked by a mouse-click on the square
            squares continue to be marked as the mouse hovers over them
            as long as the mouse is down*/
            newSquare.addEventListener("mouseenter", e => {
                if (isDrawing) {
                    newSquare.style["background-color"] = 'black';
                }
            });
            newSquare.addEventListener("mousedown", e => {
                isDrawing = true;
                newSquare.style["background-color"] = 'black';
            });
            newSquare.addEventListener("mouseup", e => {
                isDrawing = false;
            });

            grid__container.appendChild(newSquare);
        }
    }
}

function clearGrid() {
    //console.log('in clearGrid()');
    let squares = document.querySelectorAll('.grid__container div');
    squares.forEach(listObj => {
        listObj.style["background-color"] = "white";
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


//Create a 16x16 grid of square divs 

//variables
let numRows= 16;
let numColumns = 16;
let drawing = false; 
let fineDrawing = false;

let grid__container = document.querySelector(".grid__container");

//add functionality to buttons
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
    fineDrawing = !fineDrawing;
    if (fineDrawing) {
        toggle__gradient__button.textContent = "TOGGLE MODE [FINE]";
    }
    else {
        toggle__gradient__button.textContent = "TOGGLE MODE [BASIC]";
    }
});

/*
let invert__color__button = 
document.querySelector("#invert__color__button");
invert__color__button.addEventListener("click", e => {
    //TODO support inverting shaded squares
    let squares = document.querySelectorAll('.grid__container div');
    squares.forEach(listObj => {
        //TODO
    });
});
*/

/*==========FUNCTIONS==========*/

function addSquares() {
    for (let row = 1; row <= numRows; row++) {
        for (let col = 1; col <= numColumns; col++) {
            let square = document.createElement('div');
            square.style["grid-column"] = col;
            square.style["grid-row"] = row;

            square.setAttribute("color-key", "0");
            square.style["background-color"] = "#000000";
            square.style.border = "1px #AAAAAA solid";

            /* A square is marked by a mouse-click on the square.
            Squares continue to be marked as the mouse hovers over them
            as long as the mouse is down */
            square.addEventListener("mouseenter", e => {
                if (drawing) {
                    if (fineDrawing) {
                        shade(square);
                    }
                    else {
                        invertColor(square);
                    }
                }
            });
            square.addEventListener("mousedown", e => {
                drawing = true;
                if (fineDrawing) {
                    shade(square);
                }
                else {
                    invertColor(square);
                }
            });
            square.addEventListener("mouseup", e => {
                drawing = false;
            });

            grid__container.appendChild(square);
        }
    }
}


function invertColor(square) {
    square.setAttribute("color-key", "255");
    square.style["background-color"] = "rgb(255, 255, 255)";
}


function shade(square) {
    let colorKey = Number(square.getAttribute("color-key"))
    // 256/32 = 8, so 9 shades total including black and white
    if (colorKey < 255) {
        colorKey += 32;
        console.log(colorKey);
        square.setAttribute("color-key", colorKey);

        let colorString = 
            "rgb(" + colorKey + ", " + colorKey + ", " + colorKey + ")";
        square.style["background-color"] = colorString;
    }
}


function clearGrid() {
    let squares = document.querySelectorAll('.grid__container div');
    squares.forEach(listObj => {
        listObj.setAttribute("color-key", "0");
        listObj.style["background-color"] = "#000000";
    });
}


function makeNewGrid() {
    let newLength = 0;
    while (newLength < 2 || newLength >= 100) {
        newLength = prompt("How many squares per side to make the new grid?" +
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

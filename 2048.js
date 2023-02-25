// 2048 - James Betz

// INITIAL VARIABLES
let gameFrame = [
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ]
];
let prevFrame = [
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ]    
];
let colorDict = {
    "standard"  :   {    // taken from play.2048.co
        null    :   "rgb(238,228,218, 0.35)",
        2       :   "#eee4da",
        4       :   "#eee1c9",
        8       :   "#f3b27a",
        16      :   "#f69664",
        32      :   "#f77c5f",
        64      :   "#f75f3b",
        128     :   "#edd073",
        256     :   "#edcc62",
        512     :   "#edc950",
        1024    :   "#edc53f",
        2048    :   "#edc22e",
        4096    :   "#3c3a33",
    },
    "gradient"  :   {
        null    :   "rgb(238,228,218, 0.35)",
        2       :   "#d66c5c",
        4       :   "#de8a50",
        8       :   "#e7a745",
        16      :   "#efc539",
        32      :   "#cbda3e",  
        64      :   "#9fd24f",
        128     :   "#72CA60",
        256     :   "#46c271",
        512     :   "#3dad8d",
        1024    :   "#3598aa",
        2048    :   "#2c83c6",
        4096    :   "#6528ad",
    },
    "palette"  :   {
        null    :   "rgb(238,228,218, 0.35)",
        2       :   "#4f8c9d",
        4       :   "#0df38f",
        8       :   "#97127b",
        16      :   "#6eae3d",
        32      :   "#553a76",
        64      :   "#8ae1f9",
        128     :   "#294d46",
        256     :   "#d6bcf5",
        512     :   "#0b29d0",
        1024    :   "#f27ff5",
        2048    :   "#056e12",
        4096    :   "#fa2e55",
    }
};
let colorTheme = colorDict['standard'];
let score = 0;

// TOUCH MOVEMENT FOR MOBILE
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xStart = null;
var yStart = null;

function getTouches(evt) {
    console.log('enter getTouches')
    return evt.touches || evt.originalEvent.touches
}
function handleTouchStart(evt) {
    console.log('enter handleTouchStart')
    const firstTouch = getTouches(evt)[0];
    xStart = firstTouch.clientX;
    yStart = firstTouch.clientY;
}
function handleTouchMove(evt) {
    console.log('enter handleTouchMove')
    if (!xStart || !yStart) {
        return;
    };
    
    var xEnd = evt.touches[0].clientX;
    var yEnd = evt.touches[0].clientY;
    var xDiff = xStart - xEnd;
    var yDiff = yStart - yEnd;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // x direction is dominant
        if (xDiff > 0) {  
            // left swipe
            prevFrame = clone(gameFrame)
            gameFrame = move(0)
            render()
        } else {  
            // right swipe
            prevFrame = clone(gameFrame)
            gameFrame = move(2)
            render()
        }
    } else {
        if (yDiff > 0) {  
            // up swipe
            prevFrame = clone(gameFrame)
            gameFrame = move(1)
            render()            
        } else {  
            // down swipe
            prevFrame = clone(gameFrame)
            gameFrame = move(3)
            render()
        }        
    }
    // reset values
    xStart = null;
    yStart = null;
}

// MOVEMENT FOR ARROW KEYS
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {    
        // up arrow
        prevFrame = clone(gameFrame)
        gameFrame = move(1)
        render()
    }
    else if (e.keyCode == '40') {
        // down arrow
        prevFrame = clone(gameFrame)
        gameFrame = move(3)
        render()
    }
    else if (e.keyCode == '37') {
        // left arrow
        prevFrame = clone(gameFrame)
        gameFrame = move(0)
        render()
    }
    else if (e.keyCode == '39') {
        // right arrow
        prevFrame = clone(gameFrame)
        gameFrame = move(2)
        render()
    }
}

// UTILITY FUNCITON - COPY GRID WITHOUT REFERENCE
function clone (e) {
    copy = []; l = copy.length = e.length
    for (var i=0; i<l; i++) { 
        copy[i] = [i] 
    }
    for (i in e.flat()) {
        copy[Math.floor(i/l)][i%l] = e.flat()[i]
    }
    return copy
}

// GENERATE RANDOM NEW BLOCKS
function generate2or4 () {
    return 2 * Math.floor(Math.random()+1.1)  // 90% chance of 2
}
function generateRandomBlock(grid = gameFrame) {
    empty = [];
    grid.flat().forEach( function (e,i) {
        (e === null) ? empty = empty.concat([i]) : false
    });
    index = empty[(Math.floor(Math.random()*empty.length))]
    num = generate2or4(); row = Math.floor(index/4); col = index%4
    console.log('New Block: ',num,' @ ',row,col)
    grid[row][col] = num
    return grid
}

// PRIMARY MOVEMENT FUNCTIONS 
function leftShift (grid = gameFrame) {
    for (var i=0; i<4; i++) {
        row = grid[i].filter(e => e!= null)
        row = row.concat([null, null, null, null])
        row.length = 4
        grid[i] = row
    }
    return grid
}
function leftCompress (grid = gameFrame) {
    for (var i=0; i <4; i++) {
        for (var c=0; c<4; c++) {
            if (grid[i][c] === null) { continue }
            else if (grid[i][c] === grid[i][c+1]) {
                grid[i][c] *= 2
                grid[i][c+1] = null
                score += grid[i][c]
            }
        }
    }
    return grid
}
function leftRotate (grid = gameFrame) {
    copy = clone(grid)
    for (var i=0; i<4; i++) {
        for (var c=0; c<4; c++) {
            copy[3-c][i] = grid[i][c]
        }
    }
    return copy
}

// SECONDARY MOVE FUNCITONS
function move (n, grid=gameFrame) {
    copy = clone(grid)
    for (var i=0; i<4; i++) {
        if (i === n) {
            console.log('Shifting')
            copy = leftShift( leftCompress( leftShift (copy)))
        }
        console.log('Rotating')
        copy = leftRotate(copy)
    }
    console.log(grid)
    console.log(copy)
    if (grid.toString() != copy.toString()) {
        grid = generateRandomBlock(copy)
    }
    return grid
}

// RENDER GAME FRAME TO HTML
function render () {
    grid = gameFrame.flat()
    text = document.querySelectorAll(".grid-text")
    grid.forEach(function (e, i){
        text[i].innerText = (e === null) ? "" : e
        text[i].style.backgroundColor = colorTheme[e]
        if (colorTheme[e] === "#eee4da" || colorTheme[e] === "#eee1c9") {
            text[i].style.color = "#776e65"
        } else {
            text[i].style.color = "#f9f6f2"
        }
    })
    document.getElementById("score").innerText = "Current Score: "+ score.toString()
}

// GAME INITIALIZATION
function initialize () {
    console.log('enter initialize')
    gameFrame = [
        [ null, null, null, null ],
        [ null, null, null, null ],
        [ null, null, null, null ],
        [ null, null, null, null ]
    ]
    generateRandomBlock()
    generateRandomBlock()
    render()
    console.log('exit initialize')
}
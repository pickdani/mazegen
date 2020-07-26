let board = []
let canvas = document.getElementById("mazeCanvas")
let drawing = canvas.getContext("2d")
const width = height = 20
let size = canvas.width / width
canvas.onmousemove = trackMouse;
let start = false;
let timer;
let ms = 0;

function trackMouse(event) {
    let x = event.pageX - 20;
    let y = event.pageY - 15;
    if (Math.floor(y / size) <= 19 && Math.floor(y / size) >= 0
        && Math.floor(x / size) <= 19 && Math.floor(x / size) >= 0) {
        let currCell = board[Math.floor(y / size)][Math.floor(x / size)]
        if ((currCell.r == 0 && currCell.c == 0) && !start) {
            startClock();
            start = true;
        }
        let prevCell = drawStack.pop()
        let neighbors = prevCell.getValidNeighbors()
        if (neighbors.includes(currCell)) {
            console.log(currCell.r + ", " + currCell.c);
            if (currCell.r == 19 && currCell.c == 19) {
                window.clearInterval(timer);
            }
            currCell.fillCell("green")
            drawStack.pop()
            prevCell.unfillCell()
            drawStack.push(currCell)
        } else {
            drawStack.push(prevCell)
        }
    }
}

function time(ms) {
    return new Date(ms).toISOString().slice(11, -1);
}

function updateClock() {
    ms += 1;
    document.getElementById("timer").innerHTML = time(ms);
}

function startClock() {
    timer = window.setInterval("updateClock()", 1);
    console.log(timer);
}

initBoard()
genMaze()
board[0][0].visited = true
board[0][0].fillCell("green")
board[height - 1][width - 1].fillCell("red")
drawBoard()
unVisit()

let drawStack = []
drawStack.push(board[0][0])
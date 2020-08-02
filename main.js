let board = []
let canvas = document.getElementById("mazeCanvas")
let drawing = canvas.getContext("2d")
const width = height = 20
let size = canvas.width / width
canvas.onmousemove = trackMouse
let start = false
let timer
let ms = 0
let startTime
let won = false

function trackMouse(event) {
    let x = event.pageX - 20;
    let y = event.pageY - 15;
    if (Math.floor(y / size) <= 19 && Math.floor(y / size) >= 0
        && Math.floor(x / size) <= 19 && Math.floor(x / size) >= 0 && !won) {
        let currCell = board[Math.floor(y / size)][Math.floor(x / size)]
        let prevCell = drawStack.pop()
        let neighbors = prevCell.getValidNeighbors()
        if (neighbors.includes(currCell)) {
            if (!start) {
                startTime = Date.now();
                startClock();
                start = true;
            }
            if (currCell.r == 19 && currCell.c == 19) {
                window.clearInterval(timer);
                won = true;
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

function hsv2rgb(h,s,v)
{
    let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);
    return [f(5),f(3),f(1)];
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
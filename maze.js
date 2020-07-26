function drawBoard() {
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            board[r][c].drawCell()
        }
    }
}

function line(x1, y1, x2, y2) {
    drawing.beginPath();
    drawing.moveTo(x1, y1);
    drawing.lineTo(x2, y2);
    drawing.stroke();
}

function initBoard() {
    for (let r = 0; r < height; r++) {
        let row = []
        for (let c = 0; c < width; c++) {
            row.push(new Cell(r, c))
        }
        board.push(row)
    }
}

function unVisit() {
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            board[r][c].visited = false
        }
    }
}

// recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm
function genMaze() {
    let stack = []
    // choose initial cell, mark visited and push to stack
    let initialCell = board[0][0]
    initialCell.visited = true
    stack.push(initialCell)
    // while stack is not empty
    while (stack.length > 0) {
        // pop cell from stack and make it current cell
        let currentCell = stack.pop()
        let neighbors = currentCell.getNeighbors()
        // if current cell has unvisited neighbors
        if (neighbors.length > 0) {
            // push current cell to the stack
            stack.push(currentCell)
            // randomly choose one of the unvisited neighbors
            let chosen = neighbors[Math.floor(Math.random() * neighbors.length)]
            // remove wall between current cell and chosen cell
            // above
            if (chosen.r < currentCell.r) {
                currentCell.removeWall("up")
            }
            // below
            if (chosen.r > currentCell.r) {
                currentCell.removeWall("down")
            }
            // left
            if (chosen.c < currentCell.c) {
                currentCell.removeWall("left")
            }
            // right
            if (chosen.c > currentCell.c) {
                currentCell.removeWall("right")
            }
            // mark chosen cell as visited and push to the stack
            chosen.visited = true
            stack.push(chosen)
        }
    }
}
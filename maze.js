let dist = []

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

// bfs for shortest path start to end
// cell.up, cell.down, cell.left, cell.right are true
// if there is a wall, false if there is no wall
// if board[r][c].up == false then there exists an edge
// from board[r-1][c] to board[r][c]
function BFS() {
    let queue = []
    board[0][0].dist = 0
    board[0][0].visited = true
    queue.push(board[0][0])

    while (queue.length != 0) {
        let currentCell = queue.pop()
        let r = currentCell.r;
        let c = currentCell.c;
        // go to all unvisited neighbors
        // up
        if (r - 1 >= 0 && !board[r][c].up && !board[r - 1][c].visited) {
            board[r - 1][c].visited = true;
            board[r - 1][c].dist = board[r][c].dist + 1
            board[r - 1][c].parentNode = board[r][c]
            queue.push(board[r - 1][c])
            if (r - 1 == 19 && c == 19) {
                return true;
            }
        }
        //down
        if (r + 1 < 20 && !board[r][c].down && !board[r + 1][c].visited) {
            board[r + 1][c].visited = true
            board[r + 1][c].dist = board[r][c].dist + 1
            board[r + 1][c].parentNode = board[r][c]
            queue.push(board[r + 1][c])
            if (r + 1 == 19 && c == 19) {
                return true;
            }
        }
        //left
        if (c - 1 >= 0 && !board[r][c].left && !board[r][c - 1].visited) {
            board[r][c - 1].visited = true
            board[r][c - 1].dist = board[r][c].dist + 1
            board[r][c - 1].parentNode = board[r][c]
            queue.push(board[r][c - 1])
            if (r == 19 && c - 1 == 19) {
                return true;
            }
        }
        //right
        if (c + 1 < 20 && !board[r][c].right && !board[r][c + 1].visited) {
            board[r][c + 1].visited = true
            board[r][c + 1].dist = board[r][c].dist + 1
            board[r][c + 1].parentNode = board[r][c]
            queue.push(board[r][c + 1])
            if (r == 19 && c + 1 == 19) {
                return true;
            }
        }
    }
    return false;
}

// constructs shortest path from BFS parents
function solvePath() {
    let r = 19
    let c = 19
    shortestPath.push(board[r][c])
    while (true) {
        let parent = board[r][c].parentNode
        shortestPath.unshift(parent);
        r = parent.r
        c = parent.c
        if (r == 0 && c == 0) {
            return
        }
    }
}

function solve() {
    if (!solving) {
        solving = true
        timer2 = window.setInterval("nextStep()", 40)
    }
}

function nextStep() {
    if (shortestPath.length >= 2) {
        let from = shortestPath.shift()
        let to = shortestPath[0]
        drawing.fillStyle = "black"
        drawing.strokeStyle = "grey";
        line(from.c * size + 15, from.r * size + 15,
            to.c * size + 15, to.r * size + 15);
    }
}
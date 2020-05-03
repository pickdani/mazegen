class Cell {
  constructor(r, c) {
    this.r = r
    this.c = c
    this.visited = false
    this.up = this.down = this.left = this.right = true
  }

  drawCell() {
    let size = canvas.width / width
    let x = this.c * size
    let y = this.r * size
    if (this.up) {
      line(x, y, x + size, y)
    }
    if (this.down) {
      line(x, y + size, x + size, y + size)
    }
    if (this.left) {
      line(x, y, x, y + size)
    }
    if (this.right) {
      line(x + size, y, x + size, y + size)
    }
  }

  fillCell(color) {
    let x = this.c * size
    let y = this.r * size
    drawing.fillStyle = color
    drawing.fillRect(x + 2, y + 2, size - 4, size - 4)
    this.filled = true;
  }

  unfillCell() {
    let x = this.c * size
    let y = this.r * size
    drawing.clearRect(x + 2, y + 2, size - 4, size - 4)
    this.filled = false;
  }

  removeWall(direction) {
    let r = this.r
    let c = this.c
    switch (direction) {
      case "up":
        this.up = false
        if (r - 1 >= 0) {
          board[r - 1][c].down = false
        }
        break;
      case "down":
        this.down = false
        if (r + 1 < height) {
          board[r + 1][c].up = false
        }
        break;
      case "left":
        this.left = false
        if (c - 1 >= 0) {
          board[r][c - 1].right = false
        }
        break;
      case "right":
        this.right = false
        if (c + 1 < width) {
          board[r][c + 1].left = false
        }
        break;
    }
  }

  getNeighbors() {
    let neighbors = []
    let r = this.r
    let c = this.c
    if (r - 1 >= 0 && !board[r - 1][c].visited) {
      neighbors.push(board[r - 1][c])
    }
    if (c - 1 >= 0 && !board[r][c - 1].visited) {
      neighbors.push(board[r][c - 1])
    }
    if (c + 1 < width && !board[r][c + 1].visited) {
      neighbors.push(board[r][c + 1])
    }
    if (r + 1 < height && !board[r + 1][c].visited) {
      neighbors.push(board[r + 1][c])
    }
    return neighbors
  }

  getValidNeighbors() {
    let neighbors = []
    let r = this.r
    let c = this.c
    if (r - 1 >= 0 && !board[r - 1][c].visited && !this.up) {
      neighbors.push(board[r - 1][c])
    }
    if (c - 1 >= 0 && !board[r][c - 1].visited && !this.left) {
      neighbors.push(board[r][c - 1])
    }
    if (c + 1 < width && !board[r][c + 1].visited && !this.right) {
      neighbors.push(board[r][c + 1])
    }
    if (r + 1 < height && !board[r + 1][c].visited && !this.down) {
      neighbors.push(board[r + 1][c])
    }
    return neighbors
  }
}

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

let board = []
let canvas = document.getElementById("mazeCanvas")
let drawing = canvas.getContext("2d")
const width = height = 20
let size = canvas.width / width

canvas.onmousemove = trackMouse;

function trackMouse(event) {
  let x = event.pageX - 20;
  let y = event.pageY - 15;
  let currCell = board[Math.floor(y / size)][Math.floor(x / size)]
  let prevCell = drawStack.pop()
  let neighbors = prevCell.getValidNeighbors()
  if (neighbors.includes(currCell)) {
    currCell.fillCell("green")
    drawStack.pop()
    prevCell.unfillCell()
    drawStack.push(currCell)
  } else {
    drawStack.push(prevCell)
  }
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
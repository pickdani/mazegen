let fillColor
let trailColor = [255, 255, 255]

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
        fillColor = color
        let x = this.c * size
        let y = this.r * size
        drawing.fillStyle = fillColor
        drawing.fillRect(x + 2, y + 2, size - 4, size - 4)
        this.filled = true;
    }

    unfillCell() {
        let x = this.c * size
        let y = this.r * size
        drawing.clearRect(x + 2, y + 2, size - 4, size - 4)

        // color gradient trail
        drawing.fillStyle = 'rgb('
            + trailColor[0] + ','
            + trailColor[1] + ','
            + trailColor[2] + ')';
        drawing.fillRect(x + 10, y + 10, size - 20, size - 20)
        trailColor = [
            trailColor[0] - 1.5,
            trailColor[1] - 1.5,
            trailColor[2] - 1.5,]
        console.log(trailColor)
        drawing.fillStyle = fillColor
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
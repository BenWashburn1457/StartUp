
class Grid {
    constructor(height=4, width=4) {
        this.height = height;
        this.width = width;
        this.grid = [];
        for (let y = 0; i < this.height; i++){
            this.grid.push([]);
            for (let x=0; i<this.width; i++){
                this.grid[i].push(0);
            }
        }
    }

    getSquare(x, y) {
        if((x>=0 && x<this.width) && (y>=0 && y<this.height)){
            return this.grid[y][x];
        } else {
            return undefined
        }
    }

    setSquare(x, y, value) {
        if((x>=0 && x<this.width) && (y>=0 && y<this.height)){
            this.grid[y][x] = value;
            return true
        } else{
            return undefined
        }

    }
}

class Square {
    constructor(number, x, y, grid) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.grid = grid;
        grid.setSquare(x, y, self);
    }

    move(direction) {
        if(direction == "up"){
            if (this.checkSquare(this.x, this.y-1, this.grid)){
                // move up
            }
        }
        else if(direction == "down"){
            if (this.checkSquare(this.x, this.y+1, this.grid)){
                // move down
            }
        }
        else if(direction == "left"){
            if (this.checkSquare(this.x-1, this.y, this.grid)){
                // move left
            }
        }
        else if(direction == "right"){
            if (this.checkSquare(this.x+1, this.y, this.grid)){
                // move right
            }
        }
    }

    checkSquare(x, y, grid) {
        if(grid.getSquare){
            return true;
        } else {
            return false;
        }
    }


}

userName = localStorage.getItem("userName");

if (userName) {
    const user = document.querySelector(".name");

    if(user) {
        user.textContent = userName;
    }
}

// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the size of each grid cell and the number of cells
const cellSize = 500/4;
const numRows = canvas.height / cellSize;
const numCols = canvas.width / cellSize;

// Function to draw the grid
function drawGrid() {
    ctx.beginPath();

    ctx.fillStyle = 'rgb(200, 230, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw vertical lines
    for (let col = 0; col <= numCols; col++) {
        const x = col * cellSize;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    // Draw horizontal lines
    for (let row = 0; row <= numRows; row++) {
        const y = row * cellSize;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    // Set the style and stroke the lines
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

// Call the drawGrid function
drawGrid();
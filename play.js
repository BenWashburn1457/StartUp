
class Grid {
    constructor(height=4, width=4) {
        this.height = height;
        this.width = width;
        this.grid = [];
        for (let y = 0; y < this.height; y++){
            this.grid.push([]);
            for (let x=0; x<this.width; x++){
                this.grid[y].push(0);
            }
        }
    }

    getSquare(x, y) {
        if(this.checkSquare(x, y)){
            return this.grid[y][x];
        } else {
            return false
        }
    }

    setSquare(x, y, value){
        if(this.checkSquare(x,y)){
            this.grid[y][x] = value;
            return true
        } else{
            return false
        }
    }

    checkSquare(x, y){
        if((x>=0 && x<this.width) && (y>=0 && y<this.height)){
            return true
        } else{
            return false;
        }
}
}

class Square {
    constructor(number, x, y, grid) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.grid = grid;
        grid.setSquare(x, y, this);
    }

    up_key(){
        this.direction_control("up")
    }

    down_key(){
        this.direction_control("down")
    }

    left_key(){
        this.move_control(this.x-1, this.y, "left")
    }

    right_key(){
        this.move_control(this.x+1, this.y, "right")
    }

    direction_control(direction){
        if(direction == "up"){
            this.move_control(this.x, this.y-1, direction)
        } else if(direction == "down"){
            console.log("move down")
            this.move_control(this.x, this.y+1, direction)
        } else if(direction == "left"){
            this.move_control(this.x-1, this.y, direction)
        } else if(direction == "right"){
            this.move_control(this.x+1, this.y, direction)
        }
    }

    collision(other){
        if(other.number == this.number){
            return true;
        } else{
            return false;
        }
    }

    move_control(x, y, direction) {
            if (this.grid.checkSquare(x, y)){
                let other = this.grid.getSquare(x, y)
                console.log(other)
                if (other === 0){
                    this.move(x, y, direction)
                }
                else if (this.collision(other)){
                    this.combine(other)
                }
            }
       
    }


    move(x, y, direction){
        this.grid.setSquare(this.x, this.y, 0)
        this.x = x
        this.y = y
        this.grid.setSquare(this.x, this.y, this);
        this.direction_control(direction)
    }

    combine(other) {
        other.number *=2;
        this.grid.setSquare(this.x, this.y, 0);
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
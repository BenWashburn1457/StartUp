var squares = [];
var move = false;
document.addEventListener("keydown", handleArrowKey)
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

function populate(grid){
    let newx = -1;
    let newy = -1;
    let newNumber = (Math.floor(Math.random())+1)*2
    while(grid.getSquare(newx, newy)!== 0){
        newx = Math.floor(Math.random() *(4))
        newy = Math.floor(Math.random() *(4))
    }
    new Square(newNumber, newx, newy, grid)
    move = false
}

function handleArrowKey(event) {
    if (event.keyCode === 37) {
        // Left arrow key pressed
        // Call your function for left arrow key
        left_key()
    } else if (event.keyCode === 38) {
        // Up arrow key pressed
        // Call your function for up arrow key
        up_key()
    } else if (event.keyCode === 39) {
        // Right arrow key pressed
        // Call your function for right arrow key
        right_key()
    } else if (event.keyCode === 40) {
        // Down arrow key pressed
        // Call your function for down arrow key
        down_key()
    }
    if(move){populate(g1)}
        
    let debug = [];
    g1.grid.forEach(y => {
        debug = [];
        y.forEach(x => {
            if(x == 0){
                debug.push(x);
            } else{
                debug.push(x.number)
            }
        })
        console.log(debug)
    })
    console.log("")
}

function up_key(){
    squares.slice().sort((a, b) => (a.x+a.y*4) - (b.x+b.y*4)).forEach(square =>{
        square.direction_control("up")
        });
}

function down_key(){
    squares.slice().sort((a, b) => (b.x+b.y*4) - (a.x+a.y*4)).forEach(square =>{
        square.direction_control("down")
        });
}

function right_key(){
    squares.slice().sort((a, b) => (b.y+b.x*4) - (a.y+a.x*4)).forEach(square =>{
        square.direction_control("right")
        });
}

function left_key(){
    squares.slice().sort((a, b) => (a.y+a.x*4) - (b.y+b.x*4)).forEach(square =>{
        square.direction_control("left")
        });
}

class Square {
    constructor(number, x, y, grid) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.grid = grid;
        grid.setSquare(x, y, this);
        squares.push(this)
    }

    direction_control(direction){
        if(direction == "up"){
            this.move_control(this.x, this.y-1, direction)
        } else if(direction == "down"){
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
                if (other === 0){
                    this.move(x, y, direction)
                }
                else if (this.collision(other)){
                    this.combine(other)
                }
            }
       
    }


    move(x, y, direction){
        move = true
        this.grid.setSquare(this.x, this.y, 0)
        this.x = x
        this.y = y
        this.grid.setSquare(this.x, this.y, this);
        this.direction_control(direction)
    }

    combine(other) {
        move = true
        other.number *=2;
        this.grid.setSquare(this.x, this.y, 0);
        squares = squares.filter(i => i !== this);
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


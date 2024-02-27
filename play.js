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

function populate(grid){
    let newx = -1;
    let newy = -1;
    let newNumber = Math.random() < 0.5 ? 2 : 4;

    while(grid.getSquare(newx, newy)!== 0){
        newx = Math.floor(Math.random() *(4))
        newy = Math.floor(Math.random() *(4))
    }
    new Square(newNumber, newx, newy, grid)
    move = false
}

function handleArrowKey(event) {
    if (event.keyCode === 37) {
        squares.slice().sort((a, b) => (a.y+a.x*4) - (b.y+b.x*4)).forEach(square =>{
            square.direction_control("left")
            });
    } else if (event.keyCode === 38) {
        squares.slice().sort((a, b) => (a.x+a.y*4) - (b.x+b.y*4)).forEach(square =>{
            square.direction_control("up")
            });
    } else if (event.keyCode === 39) {
        squares.slice().sort((a, b) => (b.y+b.x*4) - (a.y+a.x*4)).forEach(square =>{
            square.direction_control("right")
            });
    } else if (event.keyCode === 40) {
        squares.slice().sort((a, b) => (b.x+b.y*4) - (a.x+a.y*4)).forEach(square =>{
            square.direction_control("down")
            });
    }
    if(move){populate(g1); changeScreen(g1)}
    
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


function changeScreen(grid){
    let game = document.getElementById("game");
    console.log("screen changed")
    for(let y = 0; y< grid.grid.length; y++){
        let row = game.rows[y];
        for(let x = 0; x< grid.grid[y].length; x++){
            let column = row.cells[x]
            console.log(column)
            if(grid.getSquare(x, y) === 0){
                column.textContent = "";
            } else {
                column.textContent = grid.getSquare(x, y).number
            }
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

g1 = new Grid()

populate(g1)
populate(g1)
changeScreen(g1)
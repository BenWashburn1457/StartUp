import React, { useState, useEffect } from 'react';
import './game.css';
document.addEventListener("keydown", handleArrowKey)

export function Game(props) {


    const tableSize = 4;
    let tempGrid = []
    let total = 0;
    let baseNum1 = 2;
    let baseNum2 = 4;

    for (let y = 0; y < tableSize; y++){
        tempGrid.push([]);
        for (let x=0; x<tableSize; x++){
            tempGrid[y].push(0);
        }
    }

    const [gridState, setGridState] = useState(tempGrid);

    function populate(grid){
        let tempGrid = [...grid];
        let newx = -1;
        let newy = -1;
        let newNumber = Math.random() < 0.5 ? baseNum1 : baseNum2;

        while(tempGrid.getSquare(newx, newy)!== 0){
            newx = Math.floor(Math.random() *(tableSize))
            newy = Math.floor(Math.random() *(tableSize))
        }
        tempGrid[newy][newx] = newNumber;
        total += newNumber;
        return tempGrid;
    }

    function move(grid,x,y,newx,newy,){
        let tempGrid = [...grid];
        tempGrid[newy][newx] == tempGrid[y][x];
        return tempGrid;
    }

    function moveControl(grid, x, y, newx, newy) {
        let tempGrid = [...grid];
        if (checkSquare(x, y)) {
            if (grid[newy][newx] == 0) {
                tempGrid = move(tempGrid, x, y, newx, newy);
            } else if (collision(tempGrid, x, y, newx, newy)) {
                tempGrid = combine(tempGrid, x, y, newx, newy);
            }
        }
        return tempGrid;
    }

    function checkSquare(x, y){
        if (x >=0 && x<tableSize && y >=0 && y < tableSize){
            return true;
        }
        return false;
    }

    function collision(grid, x, y, newx, newy){
        if(grid[y][x] == grid[newx][newy]) {
            return true;
        }
        return false;
    }

    function combine(grid, x, y, newx, newy) {
        let tempGrid = [...grid];
        tempGrid[newy][newx] *= 2;
        tempGrid[y][x] = 0;
        return tempGrid;
    }

    function handleArrowKey(event) {
        //Woroking on this function, have to change loops so that x and y can be passed on
        if (event.keyCode === 37) {
            squares.slice().sort((a, b) => (a.y+a.x*4) - (b.y+b.x*4)).forEach(square =>{
                moveControl(gridState, )
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
        if(move){populate(g1); score(); if(squares.length >= 16){endgame()} changeScreen(g1)}
    
    }


    return (
        <main>
            <div><h1 className="score">Score: 0</h1></div>
            <div className="game">
            <div className="side">
                <h2 id = "online">Players Online: <span id="num">0</span></h2>
                <label>Recent Updates</label>
                <table id="updateTable">
                    <tbody className="updates">
                    </tbody>
                </table>
            
            </div>
            <div className="grid">
                <table id="game">
                    <tbody>
                        <tr><td></td><td></td><td></td><td></td></tr>
                        <tr><td></td><td></td><td></td><td></td></tr>
                        <tr><td></td><td></td><td></td><td></td></tr>
                        <tr><td></td><td></td><td></td><td></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        </main>
    )
}
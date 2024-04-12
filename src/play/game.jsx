import React, { useState, useEffect } from 'react';
import './game.css';


export function Game(props) {

    useEffect(() => {
        const handleKeyDown = (event => {
            handleArrowKey(event);
        });
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    let hasMoved = true;
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
        let newx = Math.floor(Math.random() *(tableSize))
        let newy = Math.floor(Math.random() *(tableSize))
        let newNumber = Math.random() < 0.5 ? baseNum1 : baseNum2;        
        
        while(tempGrid[newy][newx] !== 0){
            newx = Math.floor(Math.random() *(tableSize))
            newy = Math.floor(Math.random() *(tableSize))
        }
        tempGrid[newy][newx] = newNumber;
        total += newNumber;
        return tempGrid;
    }

    function move(grid,x,y,newx,newy,){
        hasMoved = true;
        let tempGrid = [...grid];
        tempGrid[newy][newx] = tempGrid[y][x];
        tempGrid[y][x] = 0;
        return tempGrid;
    }

    function moveControl(grid, x, y, newx, newy) {
        let tempGrid = [...grid];
        if(tempGrid[y][x] > 0){
            if (checkSquare(tempGrid, newx, newy)) {
                if (grid[newy][newx] == 0) {
                    tempGrid = move(tempGrid, x, y, newx, newy);
                    tempGrid = moveControl(tempGrid, newx, newy, newx + (newx-x), newy + (newy-y))
                } else if (collision(tempGrid, x, y, newx, newy)) {
                    tempGrid = combine(tempGrid, x, y, newx, newy);
                }
            }
        }
        return tempGrid;
    }

    function checkSquare(grid, x, y){
        if ((x >=0 && x<tableSize) && (y >=0 && y < tableSize)){
            return true;
        }
        return false;
    }

    function collision(grid, x, y, newx, newy){
        if(grid[y][x] === grid[newy][newx]) {
            return true;
        }
        return false;
    }

    function combine(grid, x, y, newx, newy) {
        hasMoved = true;
        let tempGrid = [...grid];
        tempGrid[newy][newx] *= 2;
        tempGrid[y][x] = 0;
        return tempGrid;
    }

    function handleArrowKey(event) {
        if (event.keyCode === 37) {
            //left
            for (let x=0; x<tableSize; x++){
                for (let y=0; y<tableSize; y++){
                    setGridState(moveControl(gridState, x, y, x-1, y));
                }
            }
        } else if (event.keyCode === 38) {
            //up
            for (let y=0; y<tableSize; y++){
                for (let x=0; x<tableSize; x++){
                    setGridState(moveControl(gridState, x, y, x, y-1));
                }
            }
        } else if (event.keyCode === 39) {
            //right
            for (let x=tableSize-1; x>=0; x--){
                for (let y=0; y<tableSize; y++){
                    setGridState(moveControl(gridState, x, y, x+1, y));
                }
            }
        } else if (event.keyCode === 40) {
            //down
            for (let y=tableSize-1; y>=0; y--){
                for (let x=0; x<tableSize; x++){
                    setGridState(moveControl(gridState, x, y, x, y+1));
                }
            }
        }
        if(hasMoved){
            hasMoved = false;
            setGridState(populate(gridState)); 
        }
    }
    let start = true;
    for (let y = 0; y < tableSize; y++){
        for (let x=0; x<tableSize; x++){
            if(gridState[y][x] > 0){
                start = false;
            }
        }
    }
    if (start){
        setGridState(populate(gridState));
        setGridState(populate(gridState));
    }

    return (
        <div className='center'>
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
                            <tr><td>{gridState[0][0] !== 0 && gridState[0][0]}</td><td>{gridState[0][1] !== 0 && gridState[0][1]}</td><td>{gridState[0][2] !== 0 && gridState[0][2]}</td><td>{gridState[0][3] !== 0 && gridState[0][3]}</td></tr>
                            <tr><td>{gridState[1][0] !== 0 && gridState[1][0]}</td><td>{gridState[1][1] !== 0 && gridState[1][1]}</td><td>{gridState[1][2] !== 0 && gridState[1][2]}</td><td>{gridState[1][3] !== 0 && gridState[1][3]}</td></tr>
                            <tr><td>{gridState[2][0] !== 0 && gridState[2][0]}</td><td>{gridState[2][1] !== 0 && gridState[2][1]}</td><td>{gridState[2][2] !== 0 && gridState[2][2]}</td><td>{gridState[2][3] !== 0 && gridState[2][3]}</td></tr>
                            <tr><td>{gridState[3][0] !== 0 && gridState[3][0]}</td><td>{gridState[3][1] !== 0 && gridState[3][1]}</td><td>{gridState[3][2] !== 0 && gridState[3][2]}</td><td>{gridState[3][3] !== 0 && gridState[3][3]}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
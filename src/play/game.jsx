import React, { useState, useEffect, useRef } from 'react';
import './game.css';



export function Game(props) {
    const socketRef = useRef(null); // Define socket as a ref

    useEffect(() => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const newSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socketRef.current = newSocket; // Assign newSocket to socketRef.current

        newSocket.onopen = (event) => {
            console.log("game connected");
            displayMsg("Game Connected")
            configureWebSocket(); // No need to pass socket, use socketRef.current inside the function
            broadcastEvent(props.userName, 'gameStart', "null");
        };

        return () => {
            newSocket.close();
        };
    }, []);
    

    

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
    const [messages, setMessages] = React.useState([]);

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
        total+=newNumber;
        showScore(total)
        return tempGrid;
    }

    function showScore(total) {
        let score = document.querySelector(".score");
        if (score) {
            score.textContent = `Score: ${total}`;
        }
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
            endgame()
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

    function getSquare(x,y){
        if(checkSquare(gridState,x,y)){
            return gridState[y][x]
        }
    }

    function endgame() {
        for (let y = 0; y < tableSize; y++)
            for (let x = 0; x < tableSize; x++) {
                if (getSquare(x,y) === 0){
                    return false;
                }
                if (getSquare(x,y) === getSquare(x-1,y) ||
                    getSquare(x,y) === getSquare(x+1,y) ||
                    getSquare(x,y) === getSquare(x,y+1) ||
                    getSquare(x,y) === getSquare(x,y-1)) {
                    // If any adjacent square has the same number, return false
                    return false;
                }
            }
        // If no adjacent squares have the same number, return true
            let score = document.getElementsByClassName("score");
            score[0].textContent = `Gameover   Score: ${total}`
    
            localStorage.setItem("score", total);
            saveScore(total);
    }

    function saveScore(score){
        const date = new Date().toLocaleDateString();
    
        fetch('/api/update/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: props.userName,
                score: score,
                date: date
            })
        })
        .then(Response =>{
            if(!Response.ok){
                throw new error('Network response was not ok');
            }
            return Response.json();
        })
        .then(data => {
            console.log("Successfully posted data:", data);
        })
        .catch(error => {
            console.error('Error posting data: ', error)
        })
    
        broadcastEvent(props.userName, 'gameEnd', score);
    }

    function configureWebSocket() {
        
        socketRef.current.onclose = (event) => {
          displayMsg('game disconnected');
        };
        socketRef.current.onmessage = async (event) => {
            const msg = JSON.parse(event.data); // Parse the JSON data directly
            if (msg.type === 'gameEnd') {
                displayMsg(`${msg.userName} scored ${msg.value}`);
            } else if (msg.type === 'gameStart') { // Corrected event type string
                displayMsg(`${msg.userName} started a new game`);
            } else if (msg.type === "connections") {
                setOnline(msg.online);
            } else if (msg === 'ping') {
                socketRef.current.send('pong');
                displayMsg(`Pinged`);
            }
        };
    }



    function broadcastEvent(userName, type, value) {

        const event = {
            userName: userName,
            type: type,
            value: value
        };
        socketRef.current.send(JSON.stringify(event));
    }

    function setOnline(connections) {
        const onlineCount = document.getElementById('num');
        onlineCount.textContent = connections
    }

    

    function displayMsg(message) {
        // Update messages array using setMessages
        setMessages(prevMessages => [
            ...prevMessages,
            <tr key={prevMessages.length + 1}>
                <td>{message}</td>
            </tr>
        ]);
    }

    return (
        <div className='center'>
            <div><h1 className="score">Score: {total}</h1></div>
            <div className="game">
                <div className="side">
                    <h2 id = "online">Players Online: <span id="num">0</span></h2>
                    <label>Recent Updates</label>
                    <table id="updateTable">
                        <tbody className="updates">{messages}</tbody>
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
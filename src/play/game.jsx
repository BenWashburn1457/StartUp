import React from 'react';
import './game.css';

export function Game(props) {

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
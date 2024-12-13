import React from "react";
import '../App.css'

const GameInstruction = () => { 
    return (
    <div className = "instruction-box">
        <h2>Game Instructions:</h2>
        <p>Welcome to the Maze game! Here is how you can play:</p>
        <ul> 
        <li>First, select your facing direction using either the arrow keys on your keyboard or the provided buttons!</li>
        <li>Next, press 'Enter' to move forward in the selected direction.</li>
        <li> Try to navigate towards the exit and reach the Exit (E) to win.</li>
        </ul>
    <p> Good Luck! </p>
  </div>)
  }

export default GameInstruction
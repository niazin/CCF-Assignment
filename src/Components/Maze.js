//assumptions:
// - I'll define a predefined structure in my code for a two dimensional maze
// - We need to create a css file for the maze to define the format of Maze grid, maze row, and maze cell! 
// - 
import React, {useState, useEffect} from "react";
import './Maze.css'
/* Hardcoded Maze structure, here 
    "w" represents walls in the maze
    "" represents path blocks
    "s" represents starting point
    "e" represents exit point
*/
const Maze = () => {
    const maze = [
        ["S", "", "", "", "", ""],
        ["", "W", "W", "", "W", ""],
        ["", "", "W", "", "W", ""],
        ["W", "", "W", "", "", ""],
        ["", "", "", "W", "W", ""],
        ["", "W", "", "", "", "E"]
    ];


    /* at each stage of the game we would have 
    - the player direction, 
    - the player position,  and
    - at the end of the game, we would have a congratulation message
    *** assumption: the user has option for selecting the direction either through buttons in the UI or through arrow keys in the keyboard, 
                    but for move forward, they can only go with Enter key on the keyboard or a button on the screen "Move Forward"!
    */

    const [playerPosition, setPlayerPosition] = useState({row: 0, col:0})
    const [playerDirection, setPlayerDirection] = useState("right") //initially the player is facing right!
    const [message, setMessage] = useState("")

    const movePlayerForward = (playerDirection) => {
        let {row,col} = playerPosition;

        if (message) return; //to manage exit and end of the game!
        switch (playerDirection){
            case "up":
                //check to see if within bounds of grid:
                if (row > 0 && maze[row - 1][col] !== "W") row --
                break
            case "down":
                if (row < maze.length -1 && maze[row+1][col] !== "W") row++
                break
            case "right":
                if (col < maze.length -1 && maze[row][col+1] !== "W") col++
                break
            case "left":
                if (col > 0 && maze[row][col-1] !== "W") col--
                break
            default:
                break;
        }
        //now that row and col are updated, we need to update the state of the playerposition!
        setPlayerPosition({row, col});

        // check to see if through last move forward, the player reached the exit point:
        if (maze[row][col] === "E"){
            setMessage("☑ Congratulations, you exited the maze and the game is Over! You can refresh the page to play again!")
        }
    }; //end of move player arrow function

    // in the maze we want the user to choose their direction through keyborad arrow keys! 
    const handleKey = (e) => {
        switch (e.key){
            case "ArrowUp":
                setPlayerDirection("up")
                break
            case "ArrowDown":
                setPlayerDirection("down")
                break
            case "ArrowLeft":
                setPlayerDirection("left")
                break
            case "ArrowRight":
                setPlayerDirection("right")
                break
            case "Enter":
                movePlayerForward(playerDirection); //TODO I need to make sure if this is ok and if the direction is not clear, the user cannot move forward!
                break
            default:
                break; 
        }
    }
    
    // we already took care of movement, direction, updating position! now we need to render the page each time user make a movement! 
    useEffect (() => {
        window.addEventListener("keydown", handleKey);
        return () =>{
            window.removeEventListener("keydown", handleKey)
        };
    }, [playerPosition, playerDirection, handleKey]);

    return (
        <div>
            <div className="maze-container">
                {maze.map((row, rowIndex) => (
                    <div key = {rowIndex} className="maze-row">
                        {row.map((cell,colIndex) => (
                            <div
                                key = {colIndex}
                                className={`maze-cell ${
                                    playerPosition.row === rowIndex && playerPosition.col === colIndex
                                    ? "player"
                                    : cell === "W"
                                    ? "wall"
                                    : ""
                                }`}
                            >
                                {playerPosition.row === rowIndex && playerPosition.col === colIndex
                                ? "👤"
                                : cell === "S"
                                ? "Start"
                                : cell === "E"
                                ? "Exit"
                                : ""}
                            </div>  
                        ))}
                    </div>
                ))}
            </div>
            <div className="controls">
                <h3 style = {{color: 'navy'}}>Select Direction, or alternatively use (↑ → ↓ ←) on the Keyboard</h3>
                <button onClick={()=> setPlayerDirection("up")}>Face Up</button>
                <button onClick={()=> setPlayerDirection("right")}>Face Right</button>
                <button onClick={()=> setPlayerDirection("down")}>Face Down</button>
                <button onClick={()=> setPlayerDirection("left")}>Face Left</button>
            </div>
            <div className="controls">
                <h3 style= {{color: "navy"}}>Click to Move, or Alternatively use *Enter* on the keyboard</h3>
                <button onClick={movePlayerForward}>Move Forward</button>
            </div>
            {message && <div className="message"> {message}</div>}
        </div>
    );
}
export default Maze;
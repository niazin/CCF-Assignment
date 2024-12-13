import './App.css';
import Maze from './Components/Maze';
import GameInstruction from './Components/GameInstruction';

function App() {
  return (
    <div className='App'>
      <h1>Maze Game!</h1>
      <GameInstruction/>
      <Maze/>
    </div>
  );
};

export default App;

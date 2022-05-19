import React, { useEffect, useState } from 'react';

import './App.css';
import BoardComponents from './components/BoardComponents';
import LostFiguresComponents from './components/LostFiguresComponents';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Color';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures()
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)  
  }

  return (
    <div className="app">
      <div><Timer restart={restart} currentPlayer={currentPlayer}/></div>
      <BoardComponents board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
      <div>
        <LostFiguresComponents figures={board.lostBlackFigures} title="Черные фигуры"/>
        <LostFiguresComponents figures={board.lostWhiteFigures} title="Белые фигуры"/>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";

const calculateWinner = (board) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; 
    }
  }

  if (board.every(cell => cell !== null)) {
    return "Draw"; 
  }

  return null; 
};

const App = () => {
  const [history, setHistory] = useState([{ board: Array(9).fill(null) }]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentBoard = history[currentMove].board;
  const winner = calculateWinner(currentBoard);
  const isXNext = currentMove % 2 === 0;

  const handleClick = (index) => {
    if (currentBoard[index] || winner) return; 
    const newBoard = [...currentBoard];
    newBoard[index] = isXNext ? "X" : "O";
    
    setHistory([...history.slice(0, currentMove + 1), { board: newBoard }]);
    setCurrentMove(history.length);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
  };

  const resetGame = () => {
    
    setHistory([{ board: Array(9).fill(null) }]);
    setCurrentMove(0); 
  };

  const renderCell = (index) => (
    <button 
      className="cell"
      onClick={() => handleClick(index)}
    >
      {currentBoard[index]}
    </button>
  );

  return (
    <div className="game flex flex-col items-center p-4 bg-gradient-to-r from-blue-300 to-indigo-500 min-h-screen">
      <h1 className="text-4xl font-semibold text-white mb-4">Tic Tac Toe</h1>
      {winner ? (
        winner === "Draw" ? (
          <h2 className="text-2xl text-white mb-4">Durang!</h2>
        ) : (
          <h2 className="text-2xl text-white mb-4">G‘olib: {winner}</h2>
        )
      ) : (
        <h2 className="text-xl text-white mb-4">Navbat: {isXNext ? "X" : "O"}</h2>
      )}
      <div className="board grid grid-cols-3 gap-2 mb-4">
        {Array.from({ length: 9 }, (_, index) => renderCell(index))}
      </div>
      <button 
        className="reset-button"
        onClick={resetGame} 
      >
        O‘yinni qayta boshlash
      </button>
      <div className="mt-4">
        <h2 className="text-white text-xl">O‘yinda Qadamlar</h2>
        <ul className="text-white">
          {history.map((step, move) => {
            const description = move ? `Harakat #${move}` : "Boshlanish";
            return (
              <li key={move} className="mb-2">
                <button 
                  className="text-blue-400 hover:underline hover:text-blue-600"
                  onClick={() => jumpTo(move)}
                >
                  {description}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;






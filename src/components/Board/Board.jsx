import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import calculateWinner from '../../utils/calculateWinner';
import { useSearchParams, useNavigate } from "react-router-dom";
import Modal from '../UI/Modal';

export default function Board() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlDifficulty = searchParams.get("difficulty") || "easy";
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState(urlDifficulty);
  const [showResults, setShowResults] = useState(false);

  // Sound effects
  const playSound = (soundName) => {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  function getBotMove(board, difficulty) {
    const emptyIndices = board
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((val) => val !== null);
    if (emptyIndices.length === 0) return null;
    if (difficulty === 'easy') {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
    if (difficulty === 'medium') {
      // 50% chance to play optimally, 50% random
      if (Math.random() < 0.5) {
        // Optimal move (like hard)
        for (let idx of emptyIndices) {
          const testBoard = [...board];
          testBoard[idx] = 'O';
          if (calculateWinner(testBoard) === 'O') return idx;
          testBoard[idx] = 'X';
          if (calculateWinner(testBoard) === 'X') return idx;
        }
      }
      // Otherwise random
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
    // Hard: always play optimally
    for (let idx of emptyIndices) {
      const testBoard = [...board];
      testBoard[idx] = 'O';
      if (calculateWinner(testBoard) === 'O') return idx;
      testBoard[idx] = 'X';
      if (calculateWinner(testBoard) === 'X') return idx;
    }
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  const handleCellClick = (index) => {
    if (!isPlayerTurn || board[index] !== null || winner) return;
    playSound('click');
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const robotMove = getBotMove(board, difficulty);
        if (robotMove !== null) {
          const newBoard = [...board];
          newBoard[robotMove] = 'O';
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner, difficulty]);

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result);
      setShowResults(true);
      // Play appropriate sound
      if (result === 'X') {
        playSound('win');
      } else if (result === 'O') {
        playSound('lose');
      } else if (result === 'draw') {
        playSound('draw');
      }
    }
  }, [board]);

  useEffect(() => {
    setDifficulty(urlDifficulty);
  }, [urlDifficulty]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setShowResults(false);
  };

  const getResultMessage = () => {
    if (winner === 'X') return '🎉 مبروك! أنت فزت';
    if (winner === 'O') return '💻 الروبوت فاز! حاول مرة ثانية';
    if (winner === 'draw') return '⚖️ تعادل!';
    return '';
  };

  const getResultColor = () => {
    if (winner === 'X') return 'text-green-600';
    if (winner === 'O') return 'text-red-600';
    if (winner === 'draw') return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="flex flex-col items-center mt-8 px-2 w-full min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 drop-shadow">لعبة XO ضد الروبوت 🤖</h1>
      
      <div className="grid grid-cols-3 gap-2 md:gap-4 bg-white rounded-2xl shadow-lg p-4 md:p-6 w-full max-w-xs md:max-w-md aspect-square">
        {board.map((cell, idx) => (
          <Cell key={idx} value={cell} onClick={() => handleCellClick(idx)} />
        ))}
      </div>
      
      {!showResults && (
        <p className="mt-6 text-xl md:text-2xl font-semibold text-gray-700 min-h-[2.5rem]">
          {!winner && (isPlayerTurn ? '🧍 دورك الآن (X)' : '🤖 الروبوت يلعب...')}
        </p>
      )}

      <Modal isOpen={showResults} onClose={() => setShowResults(false)}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-6 ${getResultColor()}`}>
            {getResultMessage()}
          </h2>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/game-history")}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition transform hover:scale-105"
            >
              📋 عرض القائمة
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition transform hover:scale-105"
            >
              🏠 العودة للقائمة
            </button>
            
            <button
              onClick={resetGame}
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition transform hover:scale-105"
            >
              🔁 لعب مرة أخرى
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

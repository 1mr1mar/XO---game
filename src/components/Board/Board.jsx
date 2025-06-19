import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 📌 دالة: اختيار خانة عشوائية فاضية للروبوت
function getRandomEmptyIndex(board) {
  const emptyIndices = board
    .map((cell, idx) => (cell === null ? idx : null))
    .filter((val) => val !== null);
  if (emptyIndices.length === 0) return null;
  const randomIndex =
    emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  return randomIndex;
}

// 📌 دالة: التحقق من الفوز أو التعادل
function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // 'X' أو 'O'
    }
  }

  if (board.every((cell) => cell !== null)) {
    return 'draw';
  }

  return null;
}

// 📦 مكون Cell (خانة)
const Cell = ({ value, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="w-20 h-20 border border-gray-700 text-4xl font-bold flex items-center justify-center bg-white"
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {value}
    </motion.button>
  );
};

// 🎮 مكون Board (اللوحة الرئيسية)
export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  // ⬅️ عند نقر اللاعب على خانة
  const handleCellClick = (index) => {
    if (!isPlayerTurn || board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // 🤖 حركة الروبوت بعد اللاعب
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const robotMove = getRandomEmptyIndex(board);
        if (robotMove !== null) {
          const newBoard = [...board];
          newBoard[robotMove] = 'O';
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner]);

  // ✅ التحقق من الفائز بعد كل حركة
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result);
    }
  }, [board]);

  // 🔁 إعادة تشغيل اللعبة
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">لعبة XO ضد الروبوت 🤖</h1>

      <div className="grid grid-cols-3 gap-1">
        {board.map((cell, idx) => (
          <Cell key={idx} value={cell} onClick={() => handleCellClick(idx)} />
        ))}
      </div>

      <p className="mt-6 text-xl font-semibold">
        {winner === 'X' && '🎉 مبروك! أنت فزت'}
        {winner === 'O' && '💻 الروبوت فاز! حاول مرة ثانية'}
        {winner === 'draw' && '⚖️ تعادل!'}
        {!winner && (isPlayerTurn ? '🧍 دورك الآن (X)' : '🤖 الروبوت يلعب...')}
      </p>

      {winner && (
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          🔁 إعادة اللعب
        </button>
      )}
    </div>
  );
}

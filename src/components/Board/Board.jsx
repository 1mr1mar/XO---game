import React from 'react';
import Cell from './Cell';
import { useSearchParams, useNavigate } from "react-router-dom";
import Modal from '../UI/Modal';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGame } from '../../contexts/GameContext';

export default function Board() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    board,
    isPlayerTurn,
    winner,
    difficulty,
    botThinking,
    makeMove,
    resetGame,
    setDifficulty,
    playSound,
    isGameActive,
    currentPlayer
  } = useGame();

  const urlDifficulty = searchParams.get("difficulty") || "easy";

  // Set difficulty from URL on component mount
  React.useEffect(() => {
    setDifficulty(urlDifficulty);
  }, [urlDifficulty, setDifficulty]);

  const handleCellClick = (index) => {
    if (!isPlayerTurn || board[index] !== null || winner || botThinking) return;
    
    playSound('click');
    makeMove(index, 'X');
  };

  const getResultMessage = () => {
    if (winner === 'X') return t('congratulations');
    if (winner === 'O') return t('botWon');
    if (winner === 'draw') return t('draw');
    return '';
  };

  const getResultColor = () => {
    if (winner === 'X') return 'text-green-600';
    if (winner === 'O') return 'text-red-600';
    if (winner === 'draw') return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="flex flex-col items-center px-2 py-8">
      <h1 
        className="text-3xl md:text-4xl font-bold mb-4 drop-shadow"
        style={{ color: 'var(--text-theme)' }}
      >
        {t('gameTitle')}
      </h1>
      
      <div 
        className="grid grid-cols-3 gap-2 md:gap-4 rounded-2xl shadow-lg p-4 md:p-6 w-full max-w-xs md:max-w-md aspect-square"
        style={{
          backgroundColor: 'var(--bg1-theme)',
          border: `2px solid var(--line-theme)`
        }}
      >
        {board.map((cell, idx) => (
          <Cell key={idx} value={cell} onClick={() => handleCellClick(idx)} />
        ))}
      </div>
      
      {!winner && (
        <p 
          className="mt-6 text-xl md:text-2xl font-semibold min-h-[2.5rem]"
          style={{ color: 'var(--text1-theme)' }}
        >
          {isGameActive && (isPlayerTurn ? t('yourTurn') : t('botPlaying'))}
          {botThinking && <span className="animate-pulse">...</span>}
        </p>
      )}

      <Modal isOpen={!!winner} onClose={() => {}}>
        <div className="text-center">
          <h2 
            className={`text-2xl font-bold mb-6 ${getResultColor()}`}
            style={{ color: 'var(--text-theme)' }}
          >
            {getResultMessage()}
          </h2>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/game-history")}
              className="w-full px-4 py-3 rounded-lg font-semibold transition transform hover:scale-105"
              style={{
                backgroundColor: 'var(--line1-theme)',
                color: 'var(--bg-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              📋 {t('showList')}
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="w-full px-4 py-3 rounded-lg font-semibold transition transform hover:scale-105"
              style={{
                backgroundColor: 'var(--line-theme)',
                color: 'var(--bg-theme)',
                border: `1px solid var(--line1-theme)`
              }}
            >
              🏠 {t('returnToMenu')}
            </button>
            
            <button
              onClick={resetGame}
              className="w-full px-4 py-3 rounded-lg font-semibold transition transform hover:scale-105"
              style={{
                backgroundColor: 'var(--line1-theme)',
                color: 'var(--bg-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              🔁 {t('playAgainModal')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

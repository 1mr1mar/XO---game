import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';

export default function GameHistoryPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { gameHistory, clearHistory } = useGame();
  
  const [filter, setFilter] = useState('all'); // 'all', 'wins', 'losses', 'draws'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'result', 'difficulty'

  const getResultIcon = (result) => {
    switch (result) {
      case 'X': return '🏆';
      case 'O': return '😔';
      case 'draw': return '🤝';
      default: return '❓';
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'X': return 'text-green-600';
      case 'O': return 'text-red-600';
      case 'draw': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getResultText = (result) => {
    switch (result) {
      case 'X': return t('win') || 'Win';
      case 'O': return t('loss') || 'Loss';
      case 'draw': return t('draw') || 'Draw';
      default: return 'Unknown';
    }
  };

  // Filter games
  const filteredGames = gameHistory.filter(game => {
    if (filter === 'all') return true;
    if (filter === 'wins') return game.result === 'X';
    if (filter === 'losses') return game.result === 'O';
    if (filter === 'draws') return game.result === 'draw';
    return true;
  });

  // Sort games
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'result':
        return a.result.localeCompare(b.result);
      case 'difficulty':
        return a.difficulty.localeCompare(b.difficulty);
      default:
        return 0;
    }
  });

  const handleClearHistory = () => {
    if (window.confirm(t('clearHistoryConfirm') || 'Are you sure you want to clear all game history?')) {
      clearHistory();
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--text-theme)' }}
            >
              📊 {t('gameHistory') || 'Game History'}
            </h1>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('viewAllGames') || 'View all your past games'}
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/game?difficulty=easy')}
              className="px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--line1-theme)',
                color: 'var(--bg-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              🎮 {t('playGame') || 'Play Game'}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--bg1-theme)',
                color: 'var(--text-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              🏠 {t('dashboard') || 'Dashboard'}
            </button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div 
          className="mb-6 p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border transition"
                style={{
                  backgroundColor: 'var(--bg-theme)',
                  color: 'var(--text-theme)',
                  borderColor: 'var(--line-theme)'
                }}
              >
                <option value="all">{t('allGames') || 'All Games'}</option>
                <option value="wins">{t('wins') || 'Wins'}</option>
                <option value="losses">{t('losses') || 'Losses'}</option>
                <option value="draws">{t('draws') || 'Draws'}</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border transition"
                style={{
                  backgroundColor: 'var(--bg-theme)',
                  color: 'var(--text-theme)',
                  borderColor: 'var(--line-theme)'
                }}
              >
                <option value="date">{t('sortByDate') || 'Sort by Date'}</option>
                <option value="result">{t('sortByResult') || 'Sort by Result'}</option>
                <option value="difficulty">{t('sortByDifficulty') || 'Sort by Difficulty'}</option>
              </select>
            </div>

            <button
              onClick={handleClearHistory}
              className="px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--accent-red)',
                color: 'white',
                border: `1px solid var(--accent-red)`
              }}
            >
              🗑️ {t('clearHistory') || 'Clear History'}
            </button>
          </div>
        </div>

        {/* Game List */}
        <div 
          className="rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          {sortedGames.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📊</div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--text-theme)' }}
              >
                {t('noGamesFound') || 'No games found'}
              </h3>
              <p style={{ color: 'var(--text2-theme)' }}>
                {filter === 'all' 
                  ? t('noGamesPlayed') || 'You haven\'t played any games yet'
                  : t('noGamesWithFilter') || 'No games match your current filter'
                }
              </p>
              <button
                onClick={() => navigate('/game?difficulty=easy')}
                className="mt-4 px-6 py-2 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: 'var(--line1-theme)',
                  color: 'var(--bg-theme)',
                  border: `1px solid var(--line-theme)`
                }}
              >
                {t('playFirstGame') || 'Play Your First Game'}
              </button>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'var(--line-theme)' }}>
              {sortedGames.map((game) => (
                <div 
                  key={game.id}
                  className="p-4 hover:bg-opacity-50 transition"
                  style={{
                    backgroundColor: 'var(--bg-theme)',
                    borderColor: 'var(--line-theme)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{getResultIcon(game.result)}</span>
                      <div>
                        <div 
                          className={`text-lg font-semibold ${getResultColor(game.result)}`}
                        >
                          {getResultText(game.result)}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                          {new Date(game.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: 'var(--text-theme)' }}>
                          {t('difficulty') || 'Difficulty'}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                          {game.difficulty}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: 'var(--text-theme)' }}>
                          {t('mode') || 'Mode'}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                          {game.gameMode}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {sortedGames.length > 0 && (
          <div 
            className="mt-6 p-4 rounded-xl text-center"
            style={{
              backgroundColor: 'var(--bg1-theme)',
              border: `2px solid var(--line-theme)`
            }}
          >
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('showingGames') || 'Showing'} {sortedGames.length} {t('of') || 'of'} {gameHistory.length} {t('totalGames') || 'total games'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

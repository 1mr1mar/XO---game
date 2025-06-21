import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import GameStats from '../components/UI/GameStats';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { stats, gameHistory, resetGame } = useGame();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const recentGames = gameHistory.slice(0, 5);

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

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--text-theme)' }}
            >
              🏠 {t('dashboard') || 'Dashboard'}
            </h1>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('welcomeBack') || 'Welcome back'}, {user?.username || 'Player'}!
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/settings')}
              className="px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--bg1-theme)',
                color: 'var(--text-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              ⚙️ {t('settings') || 'Settings'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--accent-red)',
                color: 'white',
                border: `1px solid var(--accent-red)`
              }}
            >
              🚪 {t('logout') || 'Logout'}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <button
            onClick={() => navigate('/game?difficulty=easy')}
            className="p-6 rounded-xl shadow-lg transition transform hover:scale-105"
            style={{
              backgroundColor: 'var(--bg1-theme)',
              border: `2px solid var(--line-theme)`
            }}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🎮</div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--text-theme)' }}
              >
                {t('playGame') || 'Play Game'}
              </h3>
              <p style={{ color: 'var(--text2-theme)' }}>
                {t('startNewGame') || 'Start a new game'}
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/game-history')}
            className="p-6 rounded-xl shadow-lg transition transform hover:scale-105"
            style={{
              backgroundColor: 'var(--bg1-theme)',
              border: `2px solid var(--line-theme)`
            }}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--text-theme)' }}
              >
                {t('gameHistory') || 'Game History'}
              </h3>
              <p style={{ color: 'var(--text2-theme)' }}>
                {t('viewPastGames') || 'View your past games'}
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/leaderboard')}
            className="p-6 rounded-xl shadow-lg transition transform hover:scale-105"
            style={{
              backgroundColor: 'var(--bg1-theme)',
              border: `2px solid var(--line-theme)`
            }}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--text-theme)' }}
              >
                {t('leaderboard') || 'Leaderboard'}
              </h3>
              <p style={{ color: 'var(--text2-theme)' }}>
                {t('seeRankings') || 'See player rankings'}
              </p>
            </div>
          </button>
        </div>

        {/* Stats and Recent Games */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Statistics */}
          <div>
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--text-theme)' }}
            >
              📈 {t('yourStats') || 'Your Statistics'}
            </h2>
            <GameStats />
          </div>

          {/* Recent Games */}
          <div>
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--text-theme)' }}
            >
              🕒 {t('recentGames') || 'Recent Games'}
            </h2>
            
            <div 
              className="rounded-xl shadow-lg p-6"
              style={{
                backgroundColor: 'var(--bg1-theme)',
                border: `2px solid var(--line-theme)`
              }}
            >
              {recentGames.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🎮</div>
                  <p style={{ color: 'var(--text2-theme)' }}>
                    {t('noGamesYet') || 'No games played yet'}
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
                <div className="space-y-3">
                  {recentGames.map((game) => (
                    <div 
                      key={game.id}
                      className="flex items-center justify-between p-3 rounded-lg transition hover:bg-opacity-50"
                      style={{
                        backgroundColor: 'var(--bg-theme)',
                        border: `1px solid var(--line-theme)`
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getResultIcon(game.result)}</span>
                        <div>
                          <div 
                            className={`font-semibold ${getResultColor(game.result)}`}
                          >
                            {game.result === 'X' ? t('win') || 'Win' : 
                             game.result === 'O' ? t('loss') || 'Loss' : 
                             t('draw') || 'Draw'}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                            {new Date(game.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                        {game.difficulty}
                      </div>
                    </div>
                  ))}
                  
                  {gameHistory.length > 5 && (
                    <button
                      onClick={() => navigate('/game-history')}
                      className="w-full mt-4 px-4 py-2 rounded-lg font-semibold transition"
                      style={{
                        backgroundColor: 'var(--line-theme)',
                        color: 'var(--bg-theme)',
                        border: `1px solid var(--line1-theme)`
                      }}
                    >
                      {t('viewAllGames') || 'View All Games'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

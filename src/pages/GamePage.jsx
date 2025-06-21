import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';
import Board from '../components/Board/Board';
import GameStats from '../components/UI/GameStats';

export default function GamePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { stats, difficulty, resetGame } = useGame();

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
              🎮 {t('gameTitle') || 'XO Game'}
            </h1>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('currentDifficulty') || 'Current Difficulty'}: {difficulty}
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={resetGame}
              className="px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--bg1-theme)',
                color: 'var(--text-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              🔁 {t('newGame') || 'New Game'}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <Board />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div>
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-theme)' }}
              >
                📊 {t('quickStats') || 'Quick Stats'}
              </h2>
              <GameStats />
            </div>

            {/* Quick Actions */}
            <div>
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-theme)' }}
              >
                ⚡ {t('quickActions') || 'Quick Actions'}
              </h2>
              
              <div 
                className="space-y-3"
                style={{ backgroundColor: 'var(--bg1-theme)' }}
              >
                <button
                  onClick={() => navigate('/game?difficulty=easy')}
                  className="w-full p-3 rounded-lg font-semibold transition text-left"
                  style={{
                    backgroundColor: 'var(--bg-theme)',
                    color: 'var(--text-theme)',
                    border: `1px solid var(--line-theme)`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">😊</span>
                    <div>
                      <div className="font-semibold">{t('easy') || 'Easy'}</div>
                      <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                        {t('easyDesc') || 'Perfect for beginners'}
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/game?difficulty=medium')}
                  className="w-full p-3 rounded-lg font-semibold transition text-left"
                  style={{
                    backgroundColor: 'var(--bg-theme)',
                    color: 'var(--text-theme)',
                    border: `1px solid var(--line-theme)`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤔</span>
                    <div>
                      <div className="font-semibold">{t('medium') || 'Medium'}</div>
                      <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                        {t('mediumDesc') || 'Balanced challenge'}
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/game?difficulty=hard')}
                  className="w-full p-3 rounded-lg font-semibold transition text-left"
                  style={{
                    backgroundColor: 'var(--bg-theme)',
                    color: 'var(--text-theme)',
                    border: `1px solid var(--line-theme)`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">😈</span>
                    <div>
                      <div className="font-semibold">{t('hard') || 'Hard'}</div>
                      <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                        {t('hardDesc') || 'For experts only'}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Game Tips */}
            <div>
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-theme)' }}
              >
                💡 {t('gameTips') || 'Game Tips'}
              </h2>
              
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--bg1-theme)' }}
              >
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text1-theme)' }}>
                  <li>• {t('tip1') || 'Start in the center for more options'}</li>
                  <li>• {t('tip2') || 'Look for winning opportunities'}</li>
                  <li>• {t('tip3') || 'Block opponent\'s winning moves'}</li>
                  <li>• {t('tip4') || 'Practice on easy mode first'}</li>
                </ul>
                
                <button
                  onClick={() => navigate('/help')}
                  className="w-full mt-4 px-4 py-2 rounded-lg font-semibold transition"
                  style={{
                    backgroundColor: 'var(--line-theme)',
                    color: 'var(--bg-theme)',
                    border: `1px solid var(--line1-theme)`
                  }}
                >
                  📖 {t('learnMore') || 'Learn More'}
                </button>
              </div>
            </div>

            {/* Recent Performance */}
            <div>
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-theme)' }}
              >
                📈 {t('recentPerformance') || 'Recent Performance'}
              </h2>
              
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--bg1-theme)' }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {stats.wins}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text2-theme)' }}>
                      {t('wins') || 'Wins'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {stats.losses}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text2-theme)' }}>
                      {t('losses') || 'Losses'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {stats.draws}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text2-theme)' }}>
                      {t('draws') || 'Draws'}
                    </div>
                  </div>
                </div>
                
                {stats.totalGames > 0 && (
                  <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: 'var(--line-theme)' }}>
                    <div className="text-lg font-semibold" style={{ color: 'var(--text-theme)' }}>
                      {stats.winRate.toFixed(1)}%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text2-theme)' }}>
                      {t('winRate') || 'Win Rate'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GameStats() {
  const { stats, difficulty, gameMode } = useGame();
  const { t } = useLanguage();

  return (
    <div 
      className="p-4 rounded-lg shadow-md"
      style={{
        backgroundColor: 'var(--bg1-theme)',
        border: `1px solid var(--line-theme)`
      }}
    >
      <h3 
        className="text-lg font-semibold mb-3"
        style={{ color: 'var(--text-theme)' }}
      >
        📊 {t('gameStats') || 'Game Statistics'}
      </h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div 
            className="text-2xl font-bold text-green-600"
            style={{ color: 'var(--accent-green)' }}
          >
            {stats.wins}
          </div>
          <div style={{ color: 'var(--text1-theme)' }}>
            {t('wins') || 'Wins'}
          </div>
        </div>
        
        <div className="text-center">
          <div 
            className="text-2xl font-bold text-red-600"
            style={{ color: 'var(--accent-red)' }}
          >
            {stats.losses}
          </div>
          <div style={{ color: 'var(--text1-theme)' }}>
            {t('losses') || 'Losses'}
          </div>
        </div>
        
        <div className="text-center">
          <div 
            className="text-2xl font-bold text-yellow-600"
            style={{ color: 'var(--accent-yellow)' }}
          >
            {stats.draws}
          </div>
          <div style={{ color: 'var(--text1-theme)' }}>
            {t('draws') || 'Draws'}
          </div>
        </div>
        
        <div className="text-center">
          <div 
            className="text-2xl font-bold"
            style={{ color: 'var(--text-theme)' }}
          >
            {stats.totalGames}
          </div>
          <div style={{ color: 'var(--text1-theme)' }}>
            {t('totalGames') || 'Total'}
          </div>
        </div>
      </div>
      
      {stats.totalGames > 0 && (
        <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--line-theme)' }}>
          <div className="text-center">
            <div 
              className="text-lg font-semibold"
              style={{ color: 'var(--text-theme)' }}
            >
              {stats.winRate.toFixed(1)}%
            </div>
            <div style={{ color: 'var(--text1-theme)' }}>
              {t('winRate') || 'Win Rate'}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-3 pt-3 border-t text-xs" style={{ borderColor: 'var(--line-theme)' }}>
        <div style={{ color: 'var(--text2-theme)' }}>
          {t('difficulty') || 'Difficulty'}: {difficulty}
        </div>
        <div style={{ color: 'var(--text2-theme)' }}>
          {t('gameMode') || 'Mode'}: {gameMode}
        </div>
      </div>
    </div>
  );
} 
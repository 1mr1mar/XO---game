import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'week', 'month'
  const [categoryFilter, setCategoryFilter] = useState('wins'); // 'wins', 'winRate', 'gamesPlayed'

  // Mock leaderboard data - in a real app, this would come from an API
  const mockLeaderboard = [
    {
      id: 1,
      username: 'Player1',
      wins: 45,
      losses: 12,
      draws: 8,
      totalGames: 65,
      winRate: 69.2,
      rank: 1
    },
    {
      id: 2,
      username: 'XO_Master',
      wins: 38,
      losses: 15,
      draws: 7,
      totalGames: 60,
      winRate: 63.3,
      rank: 2
    },
    {
      id: 3,
      username: 'GameChampion',
      wins: 32,
      losses: 18,
      draws: 10,
      totalGames: 60,
      winRate: 53.3,
      rank: 3
    },
    {
      id: 4,
      username: 'TicTacPro',
      wins: 28,
      losses: 22,
      draws: 5,
      totalGames: 55,
      winRate: 50.9,
      rank: 4
    },
    {
      id: 5,
      username: 'BoardMaster',
      wins: 25,
      losses: 25,
      draws: 5,
      totalGames: 55,
      winRate: 45.5,
      rank: 5
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  const getWinRateColor = (winRate) => {
    if (winRate >= 70) return 'text-green-600';
    if (winRate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Sort leaderboard based on category filter
  const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => {
    switch (categoryFilter) {
      case 'wins':
        return b.wins - a.wins;
      case 'winRate':
        return b.winRate - a.winRate;
      case 'gamesPlayed':
        return b.totalGames - a.totalGames;
      default:
        return a.rank - b.rank;
    }
  });

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
              🏆 {t('leaderboard') || 'Leaderboard'}
            </h1>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('topPlayers') || 'Top players and their achievements'}
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

        {/* Filters */}
        <div 
          className="mb-6 p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text1-theme)' }}>
                {t('timePeriod') || 'Time Period'}:
              </span>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-1 rounded-lg border text-sm transition"
                style={{
                  backgroundColor: 'var(--bg-theme)',
                  color: 'var(--text-theme)',
                  borderColor: 'var(--line-theme)'
                }}
              >
                <option value="all">{t('allTime') || 'All Time'}</option>
                <option value="week">{t('thisWeek') || 'This Week'}</option>
                <option value="month">{t('thisMonth') || 'This Month'}</option>
              </select>
            </div>

            <div className="flex gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text1-theme)' }}>
                {t('sortBy') || 'Sort By'}:
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1 rounded-lg border text-sm transition"
                style={{
                  backgroundColor: 'var(--bg-theme)',
                  color: 'var(--text-theme)',
                  borderColor: 'var(--line-theme)'
                }}
              >
                <option value="wins">{t('totalWins') || 'Total Wins'}</option>
                <option value="winRate">{t('winRate') || 'Win Rate'}</option>
                <option value="gamesPlayed">{t('gamesPlayed') || 'Games Played'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div 
          className="rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          {/* Table Header */}
          <div 
            className="grid grid-cols-12 gap-4 p-4 font-semibold text-sm"
            style={{
              backgroundColor: 'var(--bg-theme)',
              borderBottom: `2px solid var(--line-theme)`,
              color: 'var(--text-theme)'
            }}
          >
            <div className="col-span-1">{t('rank') || 'Rank'}</div>
            <div className="col-span-3">{t('player') || 'Player'}</div>
            <div className="col-span-2">{t('wins') || 'Wins'}</div>
            <div className="col-span-2">{t('losses') || 'Losses'}</div>
            <div className="col-span-2">{t('draws') || 'Draws'}</div>
            <div className="col-span-2">{t('winRate') || 'Win Rate'}</div>
          </div>

          {/* Table Body */}
          <div className="divide-y" style={{ borderColor: 'var(--line-theme)' }}>
            {sortedLeaderboard.map((player, index) => (
              <div 
                key={player.id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-opacity-50 transition"
                style={{
                  backgroundColor: 'var(--bg-theme)',
                  borderColor: 'var(--line-theme)'
                }}
              >
                <div className="col-span-1 flex items-center">
                  <span className={`text-lg font-bold ${getRankColor(player.rank)}`}>
                    {getRankIcon(player.rank)}
                  </span>
                </div>
                
                <div className="col-span-3 flex items-center">
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--text-theme)' }}>
                      {player.username}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text2-theme)' }}>
                      {t('totalGames') || 'Total'}: {player.totalGames}
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className="font-semibold text-green-600">{player.wins}</span>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className="font-semibold text-red-600">{player.losses}</span>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className="font-semibold text-yellow-600">{player.draws}</span>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className={`font-semibold ${getWinRateColor(player.winRate)}`}>
                    {player.winRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Position */}
        <div 
          className="mt-6 p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          <h3 
            className="text-lg font-bold mb-3"
            style={{ color: 'var(--text-theme)' }}
          >
            🎯 {t('yourPosition') || 'Your Position'}
          </h3>
          <div className="text-center py-4">
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-theme)' }}>
              {t('notRanked') || 'Not Ranked Yet'}
            </div>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('playMoreGames') || 'Play more games to appear on the leaderboard!'}
            </p>
            <button
              onClick={() => navigate('/game?difficulty=easy')}
              className="mt-3 px-6 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--line1-theme)',
                color: 'var(--bg-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              {t('startPlaying') || 'Start Playing'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div 
          className="mt-6 p-4 rounded-xl text-center"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          <p className="text-sm" style={{ color: 'var(--text2-theme)' }}>
            💡 {t('leaderboardInfo') || 'Leaderboard updates every hour. Minimum 10 games required to appear on the leaderboard.'}
          </p>
        </div>
      </div>
    </div>
  );
}    
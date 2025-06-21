import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function ChallengesPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('daily');

  const tabs = [
    { id: 'daily', label: t('dailyChallenges') || 'Daily Challenges', icon: '📅' },
    { id: 'achievements', label: t('achievements') || 'Achievements', icon: '🏆' },
    { id: 'streaks', label: t('streaks') || 'Streaks', icon: '🔥' }
  ];

  const dailyChallenges = [
    {
      id: 1,
      title: t('win3Games') || 'Win 3 Games',
      description: t('win3GamesDesc') || 'Win 3 games in any difficulty',
      progress: 2,
      target: 3,
      reward: '50 XP',
      icon: '🎯',
      difficulty: 'easy'
    },
    {
      id: 2,
      title: t('playHardMode') || 'Play Hard Mode',
      description: t('playHardModeDesc') || 'Complete 1 game on hard difficulty',
      progress: 0,
      target: 1,
      reward: '100 XP',
      icon: '😈',
      difficulty: 'hard'
    },
    {
      id: 3,
      title: t('noLosses') || 'No Losses Today',
      description: t('noLossesDesc') || 'Win all games without losing once',
      progress: 0,
      target: 1,
      reward: '200 XP',
      icon: '🛡️',
      difficulty: 'medium'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: t('firstWin') || 'First Victory',
      description: t('firstWinDesc') || 'Win your first game',
      icon: '🥇',
      unlocked: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: t('winStreak') || 'Win Streak',
      description: t('winStreakDesc') || 'Win 5 games in a row',
      icon: '🔥',
      unlocked: false,
      progress: 3,
      target: 5
    },
    {
      id: 3,
      title: t('hardModeMaster') || 'Hard Mode Master',
      description: t('hardModeMasterDesc') || 'Win 10 games on hard difficulty',
      icon: '👑',
      unlocked: false,
      progress: 2,
      target: 10
    },
    {
      id: 4,
      title: t('perfectGame') || 'Perfect Game',
      description: t('perfectGameDesc') || 'Win without the opponent scoring',
      icon: '⭐',
      unlocked: false,
      progress: 0,
      target: 1
    }
  ];

  const streaks = [
    {
      type: 'wins',
      title: t('winStreak') || 'Win Streak',
      current: 3,
      best: 7,
      icon: '🔥'
    },
    {
      type: 'games',
      title: t('gamesPlayed') || 'Games Played',
      current: 5,
      best: 12,
      icon: '📊'
    },
    {
      type: 'days',
      title: t('daysActive') || 'Days Active',
      current: 2,
      best: 14,
      icon: '📅'
    }
  ];

  const getProgressPercentage = (progress, target) => {
    return Math.min((progress / target) * 100, 100);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderDailyChallenges = () => (
    <div className="space-y-4">
      <p style={{ color: 'var(--text2-theme)' }}>
        {t('dailyChallengesDesc') || 'Complete daily challenges to earn XP and rewards!'}
      </p>
      
      {dailyChallenges.map((challenge) => (
        <div 
          key={challenge.id}
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg1-theme)' }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{challenge.icon}</span>
              <div>
                <h3 
                  className="font-semibold"
                  style={{ color: 'var(--text-theme)' }}
                >
                  {challenge.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                  {challenge.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div 
                className={`font-bold ${getDifficultyColor(challenge.difficulty)}`}
              >
                {challenge.reward}
              </div>
              <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                {challenge.progress}/{challenge.target}
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${getProgressPercentage(challenge.progress, challenge.target)}%`,
                backgroundColor: 'var(--line1-theme)'
              }}
            />
          </div>
          
          {challenge.progress >= challenge.target ? (
            <div className="text-center py-2">
              <span className="text-green-600 font-semibold">
                ✅ {t('completed') || 'Completed!'}
              </span>
            </div>
          ) : (
            <button
              onClick={() => navigate('/game?difficulty=' + challenge.difficulty)}
              className="w-full mt-2 px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--line1-theme)',
                color: 'var(--bg-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              {t('playNow') || 'Play Now'}
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-4">
      <p style={{ color: 'var(--text2-theme)' }}>
        {t('achievementsDesc') || 'Unlock achievements by completing various milestones!'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`p-4 rounded-lg transition ${
              achievement.unlocked ? 'opacity-100' : 'opacity-60'
            }`}
            style={{ backgroundColor: 'var(--bg1-theme)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{achievement.icon}</span>
              <div className="flex-1">
                <h3 
                  className="font-semibold"
                  style={{ color: 'var(--text-theme)' }}
                >
                  {achievement.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                  {achievement.description}
                </p>
              </div>
            </div>
            
            {achievement.unlocked ? (
              <div className="text-center">
                <span className="text-green-600 font-semibold">
                  ✅ {t('unlocked') || 'Unlocked'}
                </span>
                {achievement.date && (
                  <div className="text-xs mt-1" style={{ color: 'var(--text2-theme)' }}>
                    {new Date(achievement.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--text2-theme)' }}>
                    {t('progress') || 'Progress'}
                  </span>
                  <span style={{ color: 'var(--text2-theme)' }}>
                    {achievement.progress}/{achievement.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getProgressPercentage(achievement.progress, achievement.target)}%`,
                      backgroundColor: 'var(--line1-theme)'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStreaks = () => (
    <div className="space-y-4">
      <p style={{ color: 'var(--text2-theme)' }}>
        {t('streaksDesc') || 'Track your performance streaks and personal records!'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {streaks.map((streak) => (
          <div 
            key={streak.type}
            className="p-6 rounded-lg text-center"
            style={{ backgroundColor: 'var(--bg1-theme)' }}
          >
            <div className="text-4xl mb-3">{streak.icon}</div>
            <h3 
              className="font-semibold mb-2"
              style={{ color: 'var(--text-theme)' }}
            >
              {streak.title}
            </h3>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--line1-theme)' }}>
              {streak.current}
            </div>
            <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
              {t('best') || 'Best'}: {streak.best}
            </div>
          </div>
        ))}
      </div>
      
      <div 
        className="mt-6 p-4 rounded-lg text-center"
        style={{ backgroundColor: 'var(--bg1-theme)' }}
      >
        <h3 
          className="font-semibold mb-2"
          style={{ color: 'var(--text-theme)' }}
        >
          🎯 {t('keepPlaying') || 'Keep Playing!'}
        </h3>
        <p style={{ color: 'var(--text2-theme)' }}>
          {t('keepPlayingDesc') || 'Continue playing to maintain your streaks and unlock more achievements.'}
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
          🎮 {t('playGame') || 'Play Game'}
        </button>
      </div>
    </div>
  );

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
              🎯 {t('challenges') || 'Challenges'}
            </h1>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('challengesDescription') || 'Complete challenges and unlock achievements'}
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === tab.id ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--line1-theme)' : 'var(--bg1-theme)',
                color: activeTab === tab.id ? 'var(--bg-theme)' : 'var(--text-theme)',
                border: `1px solid var(--line-theme)`,
                '--tw-ring-color': 'var(--line1-theme)'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div 
          className="rounded-xl shadow-lg p-6"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          {activeTab === 'daily' && renderDailyChallenges()}
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'streaks' && renderStreaks()}
        </div>
      </div>
    </div>
  );
}

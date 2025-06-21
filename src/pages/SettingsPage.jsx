import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { difficulty, setDifficulty, soundEnabled, setSoundEnabled, clearHistory } = useGame();
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('game'); // 'game', 'appearance', 'account'
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearHistory = () => {
    clearHistory();
    setShowConfirmClear(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'game', label: t('gameSettings') || 'Game Settings', icon: '🎮' },
    { id: 'appearance', label: t('appearance') || 'Appearance', icon: '🎨' },
    { id: 'account', label: t('account') || 'Account', icon: '👤' }
  ];

  const renderGameSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--text-theme)' }}
        >
          🎯 {t('difficulty') || 'Difficulty'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`p-3 rounded-lg font-semibold transition ${
                difficulty === level ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: difficulty === level ? 'var(--line1-theme)' : 'var(--bg-theme)',
                color: difficulty === level ? 'var(--bg-theme)' : 'var(--text-theme)',
                border: `1px solid var(--line-theme)`,
                '--tw-ring-color': 'var(--line1-theme)'
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--text-theme)' }}
        >
          🔊 {t('sound') || 'Sound'}
        </h3>
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-theme)' }}>
          <span style={{ color: 'var(--text1-theme)' }}>
            {t('soundEffects') || 'Sound Effects'}
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              soundEnabled ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <h3 
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--text-theme)' }}
        >
          🗑️ {t('dataManagement') || 'Data Management'}
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => setShowConfirmClear(true)}
            className="w-full p-3 rounded-lg font-semibold transition text-left"
            style={{
              backgroundColor: 'var(--accent-red)',
              color: 'white',
              border: `1px solid var(--accent-red)`
            }}
          >
            {t('clearGameHistory') || 'Clear Game History'}
          </button>
          <p className="text-sm" style={{ color: 'var(--text2-theme)' }}>
            {t('clearHistoryWarning') || 'This will permanently delete all your game history and statistics.'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--text-theme)' }}
        >
          🌙 {t('theme') || 'Theme'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => toggleTheme()}
            className="p-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'var(--bg-theme)',
              color: 'var(--text-theme)',
              border: `2px solid var(--line-theme)`
            }}
          >
            <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
            {theme === 'dark' ? t('darkMode') || 'Dark Mode' : t('lightMode') || 'Light Mode'}
          </button>
        </div>
      </div>

      <div>
        <h3 
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--text-theme)' }}
        >
          🌍 {t('language') || 'Language'}
        </h3>
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-theme)' }}>
          <p style={{ color: 'var(--text2-theme)' }}>
            {t('languageInfo') || 'Language settings are managed through the language switcher in the header.'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--text-theme)' }}
        >
          👤 {t('profile') || 'Profile'}
        </h3>
        <div className="space-y-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-theme)' }}>
            <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
              {t('username') || 'Username'}
            </div>
            <div className="font-semibold" style={{ color: 'var(--text-theme)' }}>
              {user?.username || 'Guest'}
            </div>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-theme)' }}>
            <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
              {t('email') || 'Email'}
            </div>
            <div className="font-semibold" style={{ color: 'var(--text-theme)' }}>
              {user?.email || 'guest@example.com'}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--text-theme)' }}
        >
          🔐 {t('accountActions') || 'Account Actions'}
        </h3>
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-lg font-semibold transition"
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
              ⚙️ {t('settings') || 'Settings'}
            </h1>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('customizeYourExperience') || 'Customize your game experience'}
            </p>
          </div>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-lg font-semibold transition mt-4 md:mt-0"
            style={{
              backgroundColor: 'var(--bg1-theme)',
              color: 'var(--text-theme)',
              border: `1px solid var(--line-theme)`
            }}
          >
            🏠 {t('backToDashboard') || 'Back to Dashboard'}
          </button>
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
          {activeTab === 'game' && renderGameSettings()}
          {activeTab === 'appearance' && renderAppearanceSettings()}
          {activeTab === 'account' && renderAccountSettings()}
        </div>

        {/* Confirm Clear History Modal */}
        {showConfirmClear && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div 
              className="max-w-md w-full p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--bg1-theme)',
                border: `2px solid var(--line-theme)`
              }}
            >
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-theme)' }}
              >
                ⚠️ {t('confirmClearHistory') || 'Confirm Clear History'}
              </h3>
              <p className="mb-6" style={{ color: 'var(--text2-theme)' }}>
                {t('clearHistoryConfirmMessage') || 'Are you sure you want to clear all your game history? This action cannot be undone.'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClearHistory}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold transition"
                  style={{
                    backgroundColor: 'var(--accent-red)',
                    color: 'white',
                    border: `1px solid var(--accent-red)`
                  }}
                >
                  {t('clear') || 'Clear'}
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold transition"
                  style={{
                    backgroundColor: 'var(--bg-theme)',
                    color: 'var(--text-theme)',
                    border: `1px solid var(--line-theme)`
                  }}
                >
                  {t('cancel') || 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import LanguageSwitcher from '../UI/LanguageSwitcher';
import ThemeSwitcher from '../UI/ThemeSwitcher';

export default function Header() {
  const { t } = useLanguage();
  const { currentTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { path: '/', label: t('home'), icon: '🏠' },
    { path: '/game-history', label: t('gameHistory'), icon: '📊' },
    { path: '/leaderboard', label: t('leaderboard'), icon: '🏆' },
    { path: '/challenges', label: t('challenges'), icon: '🎯' },
    { path: '/settings', label: t('settings'), icon: '⚙️' },
    { path: '/help', label: t('help'), icon: '❓' },
    { path: '/support', label: t('support'), icon: '💬' },
  ];

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className="sticky top-0 z-40 shadow-lg"
      style={{
        backgroundColor: 'var(--bg1-theme)',
        borderBottom: `2px solid var(--line-theme)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold"
            style={{ color: 'var(--text-theme)' }}
          >
            <span>🎮</span>
            <span>XO Game</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveLink(link.path) 
                    ? 'opacity-100' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  color: 'var(--text-theme)',
                  backgroundColor: isActiveLink(link.path) ? 'var(--bg-theme)' : 'transparent'
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language and Theme Switchers */}
            <div className="hidden sm:flex space-x-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>

            {/* Auth buttons */}
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--line1-theme)',
                  color: 'var(--bg-theme)',
                  border: `1px solid var(--line-theme)`
                }}
              >
                {t('login')}
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--line-theme)',
                  color: 'var(--bg-theme)',
                  border: `1px solid var(--line1-theme)`
                }}
              >
                {t('register')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md"
              style={{ color: 'var(--text-theme)' }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-4 border-t"
            style={{ borderColor: 'var(--line-theme)' }}
          >
            <div className="flex flex-col space-y-2 mb-4">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActiveLink(link.path) 
                      ? 'opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    color: 'var(--text-theme)',
                    backgroundColor: isActiveLink(link.path) ? 'var(--bg-theme)' : 'transparent'
                  }}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

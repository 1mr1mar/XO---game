import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    { key: 'light', icon: '🌿', label: 'Green-gold' },
    { key: 'dark', icon: '🌙', label: 'Dark-gold' },
    { key: 'nature', icon: '⚪', label: 'Elegant' },
    { key: 'renova', icon: '🔷', label: 'Renova' }
  ];

  const currentThemeOption = themeOptions.find(option => option.key === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
        style={{
          backgroundColor: 'var(--bg1-theme)',
          color: 'var(--text-theme)',
          borderColor: 'var(--line-theme)'
        }}
      >
        <span className="text-lg">{currentThemeOption?.icon}</span>
        <span className="text-sm font-medium">{currentThemeOption?.label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            borderColor: 'var(--line-theme)'
          }}
        >
          {themeOptions.map((theme) => (
            <button
              key={theme.key}
              onClick={() => {
                changeTheme(theme.key);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:opacity-80 transition-all duration-150 ${
                currentTheme === theme.key ? 'opacity-100' : 'opacity-70'
              }`}
              style={{
                color: 'var(--text-theme)',
                backgroundColor: currentTheme === theme.key ? 'var(--bg-theme)' : 'transparent'
              }}
            >
              <span className="text-lg">{theme.icon}</span>
              <span className="text-sm font-medium">{theme.label}</span>
              
              {/* Theme preview */}
              <div className="ml-auto flex gap-1">
                <div 
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: themes[theme.key]?.background }}
                ></div>
                <div 
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: themes[theme.key]?.lines1 }}
                ></div>
                <div 
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: themes[theme.key]?.text }}
                ></div>
              </div>
              
              {currentTheme === theme.key && (
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 
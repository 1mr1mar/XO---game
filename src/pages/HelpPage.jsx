import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function HelpPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('how-to-play');

  const sections = [
    { id: 'how-to-play', label: t('howToPlay') || 'How to Play', icon: '🎮' },
    { id: 'faq', label: t('faq') || 'FAQ', icon: '❓' },
    { id: 'difficulties', label: t('difficulties') || 'Difficulties', icon: '🎯' },
    { id: 'tips', label: t('tips') || 'Tips & Tricks', icon: '💡' }
  ];

  const faqItems = [
    {
      question: t('faq1Question') || 'How do I win the game?',
      answer: t('faq1Answer') || 'Get three of your symbols (X or O) in a row, either horizontally, vertically, or diagonally.'
    },
    {
      question: t('faq2Question') || 'What are the different difficulty levels?',
      answer: t('faq2Answer') || 'Easy: Bot plays randomly. Medium: Bot plays optimally 50% of the time. Hard: Bot always plays optimally.'
    },
    {
      question: t('faq3Question') || 'Can I play against another player?',
      answer: t('faq3Answer') || 'Currently, you can only play against the AI. Multiplayer mode is coming soon!'
    },
    {
      question: t('faq4Question') || 'How do I change the theme?',
      answer: t('faq4Answer') || 'Go to Settings > Appearance and click the theme toggle button to switch between light and dark modes.'
    },
    {
      question: t('faq5Question') || 'Are my game statistics saved?',
      answer: t('faq5Answer') || 'Yes! Your game history and statistics are automatically saved to your browser\'s local storage.'
    }
  ];

  const difficultyLevels = [
    {
      level: 'easy',
      title: t('easy') || 'Easy',
      description: t('easyDescription') || 'Perfect for beginners. The AI makes random moves.',
      icon: '😊',
      color: 'text-green-600'
    },
    {
      level: 'medium',
      title: t('medium') || 'Medium',
      description: t('mediumDescription') || 'A balanced challenge. The AI plays optimally 50% of the time.',
      icon: '🤔',
      color: 'text-yellow-600'
    },
    {
      level: 'hard',
      title: t('hard') || 'Hard',
      description: t('hardDescription') || 'For experienced players. The AI always plays optimally.',
      icon: '😈',
      color: 'text-red-600'
    }
  ];

  const tips = [
    t('tip1') || 'Start in the center if possible - it gives you the most strategic options.',
    t('tip2') || 'Look for opportunities to create multiple winning paths at once.',
    t('tip3') || 'Block your opponent\'s winning moves before making your own.',
    t('tip4') || 'In hard mode, the game will often end in a draw if both players play optimally.',
    t('tip5') || 'Practice on easy mode to understand the game mechanics before moving to harder difficulties.'
  ];

  const renderHowToPlay = () => (
    <div className="space-y-6">
      <div>
        <h3 
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-theme)' }}
        >
          🎯 {t('objective') || 'Objective'}
        </h3>
        <p style={{ color: 'var(--text1-theme)' }}>
          {t('objectiveDescription') || 'Be the first player to get three of your symbols (X or O) in a row on the 3x3 grid. You can win horizontally, vertically, or diagonally.'}
        </p>
      </div>

      <div>
        <h3 
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-theme)' }}
        >
          🎮 {t('gameplay') || 'Gameplay'}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-lg">1.</span>
            <p style={{ color: 'var(--text1-theme)' }}>
              {t('step1') || 'You play as X and always go first.'}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">2.</span>
            <p style={{ color: 'var(--text1-theme)' }}>
              {t('step2') || 'Click on any empty cell to place your X.'}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">3.</span>
            <p style={{ color: 'var(--text1-theme)' }}>
              {t('step3') || 'The AI (O) will automatically make its move.'}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">4.</span>
            <p style={{ color: 'var(--text1-theme)' }}>
              {t('step4') || 'Continue alternating turns until someone wins or the game ends in a draw.'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-theme)' }}
        >
          🏆 {t('winningConditions') || 'Winning Conditions'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="p-4 rounded-lg text-center"
            style={{ backgroundColor: 'var(--bg-theme)' }}
          >
            <div className="text-2xl mb-2">➡️</div>
            <div className="font-semibold" style={{ color: 'var(--text-theme)' }}>
              {t('horizontal') || 'Horizontal'}
            </div>
            <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
              {t('horizontalDesc') || 'Three in a row horizontally'}
            </div>
          </div>
          <div 
            className="p-4 rounded-lg text-center"
            style={{ backgroundColor: 'var(--bg-theme)' }}
          >
            <div className="text-2xl mb-2">⬇️</div>
            <div className="font-semibold" style={{ color: 'var(--text-theme)' }}>
              {t('vertical') || 'Vertical'}
            </div>
            <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
              {t('verticalDesc') || 'Three in a row vertically'}
            </div>
          </div>
          <div 
            className="p-4 rounded-lg text-center"
            style={{ backgroundColor: 'var(--bg-theme)' }}
          >
            <div className="text-2xl mb-2">↘️</div>
            <div className="font-semibold" style={{ color: 'var(--text-theme)' }}>
              {t('diagonal') || 'Diagonal'}
            </div>
            <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
              {t('diagonalDesc') || 'Three in a row diagonally'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div 
          key={index}
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg-theme)' }}
        >
          <h4 
            className="font-semibold mb-2"
            style={{ color: 'var(--text-theme)' }}
          >
            {item.question}
          </h4>
          <p style={{ color: 'var(--text1-theme)' }}>
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );

  const renderDifficulties = () => (
    <div className="space-y-6">
      <p style={{ color: 'var(--text1-theme)' }}>
        {t('difficultyDescription') || 'Choose the difficulty level that matches your skill and experience.'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficultyLevels.map((difficulty) => (
          <div 
            key={difficulty.level}
            className="p-6 rounded-lg text-center"
            style={{ backgroundColor: 'var(--bg-theme)' }}
          >
            <div className={`text-4xl mb-3 ${difficulty.color}`}>
              {difficulty.icon}
            </div>
            <h3 
              className="text-xl font-bold mb-2"
              style={{ color: 'var(--text-theme)' }}
            >
              {difficulty.title}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text1-theme)' }}>
              {difficulty.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTips = () => (
    <div className="space-y-4">
      <p style={{ color: 'var(--text1-theme)' }}>
        {t('tipsDescription') || 'Here are some strategies to help you improve your game:'}
      </p>
      
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg"
            style={{ backgroundColor: 'var(--bg-theme)' }}
          >
            <span className="text-lg font-bold" style={{ color: 'var(--line1-theme)' }}>
              {index + 1}.
            </span>
            <p style={{ color: 'var(--text1-theme)' }}>
              {tip}
            </p>
          </div>
        ))}
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
              ❓ {t('help') || 'Help'}
            </h1>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('helpDescription') || 'Learn how to play and get answers to common questions'}
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
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--bg1-theme)',
                color: 'var(--text-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              🏠 {t('home') || 'Home'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeSection === section.id ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: activeSection === section.id ? 'var(--line1-theme)' : 'var(--bg1-theme)',
                color: activeSection === section.id ? 'var(--bg-theme)' : 'var(--text-theme)',
                border: `1px solid var(--line-theme)`,
                '--tw-ring-color': 'var(--line1-theme)'
              }}
            >
              {section.icon} {section.label}
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
          {activeSection === 'how-to-play' && renderHowToPlay()}
          {activeSection === 'faq' && renderFAQ()}
          {activeSection === 'difficulties' && renderDifficulties()}
          {activeSection === 'tips' && renderTips()}
        </div>

        {/* Contact Support */}
        <div 
          className="mt-6 p-4 rounded-xl text-center"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          <p style={{ color: 'var(--text2-theme)' }}>
            💬 {t('needMoreHelp') || 'Need more help?'}{' '}
            <button
              onClick={() => navigate('/support')}
              className="font-semibold hover:underline transition"
              style={{ color: 'var(--line1-theme)' }}
            >
              {t('contactSupport') || 'Contact Support'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function SupportPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: t('email') || 'Email',
      value: 'support@xogame.com',
      description: t('emailSupport') || 'Get help via email'
    },
    {
      icon: '💬',
      title: t('liveChat') || 'Live Chat',
      value: t('available24h') || 'Available 24/7',
      description: t('chatSupport') || 'Chat with our support team'
    },
    {
      icon: '📱',
      title: t('phone') || 'Phone',
      value: '+1 (555) 123-4567',
      description: t('phoneSupport') || 'Call us for immediate help'
    }
  ];

  const faqTopics = [
    {
      icon: '🎮',
      title: t('gameIssues') || 'Game Issues',
      description: t('gameIssuesDesc') || 'Problems with gameplay, bugs, or technical issues'
    },
    {
      icon: '📊',
      title: t('accountIssues') || 'Account Issues',
      description: t('accountIssuesDesc') || 'Login problems, data loss, or account settings'
    },
    {
      icon: '💳',
      title: t('billingIssues') || 'Billing Issues',
      description: t('billingIssuesDesc') || 'Payment problems or subscription issues'
    },
    {
      icon: '🌐',
      title: t('technicalIssues') || 'Technical Issues',
      description: t('technicalIssuesDesc') || 'Browser compatibility or performance problems'
    }
  ];

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
              🆘 {t('support') || 'Support'}
            </h1>
            <p style={{ color: 'var(--text2-theme)' }}>
              {t('supportDescription') || 'We\'re here to help! Get in touch with our support team.'}
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/help')}
              className="px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: 'var(--bg1-theme)',
                color: 'var(--text-theme)',
                border: `1px solid var(--line-theme)`
              }}
            >
              ❓ {t('help') || 'Help'}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-theme)' }}
            >
              📞 {t('contactUs') || 'Contact Us'}
            </h2>
            
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--bg1-theme)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{method.icon}</span>
                    <h3 
                      className="font-semibold"
                      style={{ color: 'var(--text-theme)' }}
                    >
                      {method.title}
                    </h3>
                  </div>
                  <div 
                    className="font-semibold mb-1"
                    style={{ color: 'var(--line1-theme)' }}
                  >
                    {method.value}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text2-theme)' }}>
                    {method.description}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Topics */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-theme)' }}
              >
                🔍 {t('commonIssues') || 'Common Issues'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {faqTopics.map((topic, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg cursor-pointer transition hover:bg-opacity-50"
                    style={{ backgroundColor: 'var(--bg-theme)' }}
                    onClick={() => navigate('/help')}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{topic.icon}</span>
                      <div 
                        className="font-semibold text-sm"
                        style={{ color: 'var(--text-theme)' }}
                      >
                        {topic.title}
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text2-theme)' }}>
                      {topic.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-theme)' }}
            >
              📝 {t('sendMessage') || 'Send Message'}
            </h2>
            
            {submitted ? (
              <div 
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: 'var(--bg1-theme)' }}
              >
                <div className="text-4xl mb-3">✅</div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--text-theme)' }}
                >
                  {t('messageSent') || 'Message Sent!'}
                </h3>
                <p style={{ color: 'var(--text2-theme)' }}>
                  {t('messageSentDesc') || 'Thank you for contacting us. We\'ll get back to you within 24 hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text1-theme)' }}
                  >
                    {t('name') || 'Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'var(--bg-theme)',
                      color: 'var(--text-theme)',
                      borderColor: 'var(--line-theme)',
                      '--tw-ring-color': 'var(--line1-theme)'
                    }}
                    placeholder={t('enterName') || 'Enter your name'}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text1-theme)' }}
                  >
                    {t('email') || 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'var(--bg-theme)',
                      color: 'var(--text-theme)',
                      borderColor: 'var(--line-theme)',
                      '--tw-ring-color': 'var(--line1-theme)'
                    }}
                    placeholder={t('enterEmail') || 'Enter your email'}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text1-theme)' }}
                  >
                    {t('subject') || 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'var(--bg-theme)',
                      color: 'var(--text-theme)',
                      borderColor: 'var(--line-theme)',
                      '--tw-ring-color': 'var(--line1-theme)'
                    }}
                    placeholder={t('enterSubject') || 'Enter subject'}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text1-theme)' }}
                  >
                    {t('message') || 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 resize-none"
                    style={{
                      backgroundColor: 'var(--bg-theme)',
                      color: 'var(--text-theme)',
                      borderColor: 'var(--line-theme)',
                      '--tw-ring-color': 'var(--line1-theme)'
                    }}
                    placeholder={t('enterMessage') || 'Describe your issue or question...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
                  style={{
                    backgroundColor: 'var(--line1-theme)',
                    color: 'var(--bg-theme)',
                    border: `2px solid var(--line-theme)`
                  }}
                >
                  📤 {t('sendMessage') || 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Response Time */}
        <div 
          className="mt-8 p-4 rounded-xl text-center"
          style={{
            backgroundColor: 'var(--bg1-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">⏱️</span>
            <h3 
              className="font-semibold"
              style={{ color: 'var(--text-theme)' }}
            >
              {t('responseTime') || 'Response Time'}
            </h3>
          </div>
          <p style={{ color: 'var(--text2-theme)' }}>
            {t('responseTimeDesc') || 'We typically respond within 24 hours during business days.'}
          </p>
        </div>
      </div>
    </div>
  );
}

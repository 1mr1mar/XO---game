import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: '/help', label: t('help'), icon: '❓' },
    { path: '/support', label: t('support'), icon: '💬' },
    { path: '/settings', label: t('settings'), icon: '⚙️' },
  ];

  const socialLinks = [
    { url: '#', icon: '📘', label: 'Facebook' },
    { url: '#', icon: '🐦', label: 'Twitter' },
    { url: '#', icon: '📷', label: 'Instagram' },
    { url: '#', icon: '💼', label: 'LinkedIn' },
  ];

  return (
    <footer 
      className="mt-auto"
      style={{
        backgroundColor: 'var(--bg1-theme)',
        borderTop: `2px solid var(--line-theme)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🎮</span>
              <span 
                className="text-xl font-bold"
                style={{ color: 'var(--text-theme)' }}
              >
                XO Game
              </span>
            </div>
            <p 
              className="text-sm mb-4 leading-relaxed"
              style={{ color: 'var(--text1-theme)' }}
            >
              Experience the classic XO game with modern features, multiple themes, 
              and language support. Challenge yourself against our intelligent AI 
              or compete with friends online.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: 'var(--bg-theme)',
                    color: 'var(--text-theme)',
                    border: `1px solid var(--line-theme)`
                  }}
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-theme)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center space-x-2 text-sm transition-colors duration-200 hover:opacity-80"
                    style={{ color: 'var(--text1-theme)' }}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-theme)' }}
            >
              Contact
            </h3>
            <div className="space-y-2">
              <p 
                className="text-sm flex items-center space-x-2"
                style={{ color: 'var(--text1-theme)' }}
              >
                <span>📧</span>
                <span>support@xogame.com</span>
              </p>
              <p 
                className="text-sm flex items-center space-x-2"
                style={{ color: 'var(--text1-theme)' }}
              >
                <span>🌐</span>
                <span>www.xogame.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="mt-8 pt-6 border-t"
          style={{ borderColor: 'var(--line-theme)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p 
              className="text-sm"
              style={{ color: 'var(--text1-theme)' }}
            >
              © {currentYear} XO Game. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--text1-theme)' }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--text1-theme)' }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

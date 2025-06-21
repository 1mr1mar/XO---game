import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(t('loginError') || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div 
        className="w-full max-w-md p-8 rounded-2xl shadow-lg"
        style={{
          backgroundColor: 'var(--bg1-theme)',
          border: `2px solid var(--line-theme)`
        }}
      >
        <h1 
          className="text-3xl font-bold text-center mb-8"
          style={{ color: 'var(--text-theme)' }}
        >
          🔐 {t('login') || 'Login'}
        </h1>

        {error && (
          <div 
            className="mb-4 p-3 rounded-lg text-center"
            style={{
              backgroundColor: 'var(--accent-red)',
              color: 'white'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text1-theme)' }}
            >
              {t('password') || 'Password'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-theme)',
                color: 'var(--text-theme)',
                borderColor: 'var(--line-theme)',
                '--tw-ring-color': 'var(--line1-theme)'
              }}
              placeholder={t('enterPassword') || 'Enter your password'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--line1-theme)',
              color: 'var(--bg-theme)',
              border: `2px solid var(--line-theme)`
            }}
          >
            {loading ? t('loggingIn') || 'Logging in...' : t('login') || 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p style={{ color: 'var(--text2-theme)' }}>
            {t('dontHaveAccount') || "Don't have an account?"}{' '}
            <Link 
              to="/register"
              className="font-semibold hover:underline transition"
              style={{ color: 'var(--line1-theme)' }}
            >
              {t('signUp') || 'Sign up'}
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link 
            to="/"
            className="text-sm hover:underline transition"
            style={{ color: 'var(--text2-theme)' }}
          >
            ← {t('backToHome') || 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}

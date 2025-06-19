import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LoginForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle successful login here
      console.log('Login successful:', formData);
      
      // Redirect or update state
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div 
        className="w-full max-w-md p-8 rounded-2xl shadow-lg"
        style={{
          backgroundColor: 'var(--bg1-theme)',
          border: `2px solid var(--line-theme)`
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <span className="text-4xl">🎮</span>
          </div>
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--text-theme)' }}
          >
            {t('login')}
          </h1>
          <p 
            className="text-sm"
            style={{ color: 'var(--text1-theme)' }}
          >
            Welcome back! Please sign in to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div 
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid #ef4444'
              }}
            >
              {errors.general}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label 
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text-theme)' }}
            >
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500' : ''
              }`}
              style={{
                backgroundColor: 'var(--bg-theme)',
                color: 'var(--text-theme)',
                borderColor: errors.email ? '#ef4444' : 'var(--line-theme)',
                focusRingColor: 'var(--line1-theme)'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text-theme)' }}
            >
              {t('password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: 'var(--bg-theme)',
                  color: 'var(--text-theme)',
                  borderColor: errors.password ? '#ef4444' : 'var(--line-theme)',
                  focusRingColor: 'var(--line1-theme)'
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: 'var(--text1-theme)' }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                style={{ accentColor: 'var(--line1-theme)' }}
              />
              <span 
                className="text-sm"
                style={{ color: 'var(--text1-theme)' }}
              >
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm transition-colors duration-200 hover:opacity-80"
              style={{ color: 'var(--line1-theme)' }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--line1-theme)',
              color: 'var(--bg-theme)',
              border: `2px solid var(--line-theme)`
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span>
                {t('loading')}...
              </span>
            ) : (
              t('login')
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p 
            className="text-sm"
            style={{ color: 'var(--text1-theme)' }}
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold transition-colors duration-200 hover:opacity-80"
              style={{ color: 'var(--line1-theme)' }}
            >
              {t('register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

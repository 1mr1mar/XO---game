import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function RegisterForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      
      // Handle successful registration here
      console.log('Registration successful:', formData);
      
      // Redirect or update state
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
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
            {t('register')}
          </h1>
          <p 
            className="text-sm"
            style={{ color: 'var(--text1-theme)' }}
          >
            Create your account to start playing XO Game!
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

          {/* Username Field */}
          <div>
            <label 
              htmlFor="username"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text-theme)' }}
            >
              {t('username')}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-500' : ''
              }`}
              style={{
                backgroundColor: 'var(--bg-theme)',
                color: 'var(--text-theme)',
                borderColor: errors.username ? '#ef4444' : 'var(--line-theme)',
                focusRingColor: 'var(--line1-theme)'
              }}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

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

          {/* Confirm Password Field */}
          <div>
            <label 
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text-theme)' }}
            >
              {t('confirmPassword')}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: 'var(--bg-theme)',
                  color: 'var(--text-theme)',
                  borderColor: errors.confirmPassword ? '#ef4444' : 'var(--line-theme)',
                  focusRingColor: 'var(--line1-theme)'
                }}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: 'var(--text1-theme)' }}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 mr-2"
              style={{ accentColor: 'var(--line1-theme)' }}
            />
            <label 
              htmlFor="terms"
              className="text-sm"
              style={{ color: 'var(--text1-theme)' }}
            >
              I agree to the{' '}
              <Link
                to="/terms"
                className="font-semibold transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--line1-theme)' }}
              >
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link
                to="/privacy"
                className="font-semibold transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--line1-theme)' }}
              >
                Privacy Policy
              </Link>
            </label>
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
              t('register')
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p 
            className="text-sm"
            style={{ color: 'var(--text1-theme)' }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold transition-colors duration-200 hover:opacity-80"
              style={{ color: 'var(--line1-theme)' }}
            >
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

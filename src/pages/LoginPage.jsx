import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await login(email, password);
    if (result.success) navigate('/students');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          background-color: #0d1117;
          display: flex;
          font-family: 'Barlow', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Architectural grid lines */
        .login-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,163,80,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,163,80,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .left-panel {
          display: none;
          width: 45%;
          background: #0a0e14;
          border-right: 1px solid rgba(212,163,80,0.15);
          flex-direction: column;
          justify-content: space-between;
          padding: 64px 56px;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 900px) {
          .left-panel { display: flex; }
        }

        .left-panel::after {
          content: '';
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,163,80,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .panel-year {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: rgba(212,163,80,0.5);
          text-transform: uppercase;
        }

        .panel-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 4vw, 64px);
          font-weight: 900;
          line-height: 1.05;
          color: #f0e6d0;
          letter-spacing: -0.02em;
        }

        .panel-title em {
          font-style: italic;
          color: #d4a350;
        }

        .panel-rule {
          width: 48px;
          height: 2px;
          background: #d4a350;
          margin: 28px 0;
        }

        .panel-desc {
          font-size: 15px;
          font-weight: 300;
          color: rgba(240,230,208,0.5);
          line-height: 1.7;
          max-width: 300px;
        }

        .panel-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(212,163,80,0.2);
          padding: 10px 16px;
          border-radius: 4px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(212,163,80,0.7);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4a350;
          box-shadow: 0 0 8px #d4a35080;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .stat-row {
          display: flex;
          gap: 32px;
          margin-top: 40px;
        }

        .stat-item {
          flex: 1;
          padding-top: 16px;
          border-top: 1px solid rgba(212,163,80,0.15);
        }

        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #f0e6d0;
        }

        .stat-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.35);
          margin-top: 2px;
        }

        .right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .form-box {
          width: 100%;
          max-width: 420px;
        }

        .form-header {
          margin-bottom: 40px;
        }

        .form-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #d4a350;
          margin-bottom: 10px;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #f0e6d0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .form-subtitle {
          font-size: 14px;
          font-weight: 300;
          color: rgba(240,230,208,0.4);
          margin-top: 6px;
        }

        .field-group {
          margin-bottom: 20px;
        }

        .field-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.45);
          display: block;
          margin-bottom: 8px;
        }

        .field-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(240,230,208,0.12);
          border-radius: 4px;
          padding: 13px 16px;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #f0e6d0;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .field-input::placeholder {
          color: rgba(240,230,208,0.2);
        }

        .field-input:focus {
          border-color: #d4a350;
          background: rgba(212,163,80,0.05);
          box-shadow: 0 0 0 3px rgba(212,163,80,0.1);
        }

        .field-input.error {
          border-color: rgba(239,68,68,0.6);
        }

        .field-error {
          font-size: 12px;
          color: #f87171;
          margin-top: 6px;
          font-weight: 400;
        }

        .api-error {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 4px;
          padding: 12px 16px;
          font-size: 13px;
          color: #fca5a5;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #d4a350;
          border: none;
          border-radius: 4px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0a0e14;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          margin-top: 8px;
          box-shadow: 0 4px 20px rgba(212,163,80,0.25);
        }

        .submit-btn:hover:not(:disabled) {
          background: #e8b860;
          box-shadow: 0 6px 28px rgba(212,163,80,0.4);
        }

        .submit-btn:active:not(:disabled) {
          transform: scale(0.99);
        }

        .submit-btn:disabled {
          background: rgba(212,163,80,0.3);
          color: rgba(10,14,20,0.5);
          cursor: not-allowed;
        }

        .form-footer {
          font-size: 12px;
          color: rgba(240,230,208,0.25);
          text-align: center;
          margin-top: 28px;
          font-weight: 300;
          letter-spacing: 0.03em;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 28px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(240,230,208,0.08);
        }

        .divider-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.2);
        }
      `}</style>

      <div className="login-root">
        {/* Left editorial panel */}
        <div className="left-panel">
          <div>
            <div className="panel-year">Est. 2025 · Academic Year 2025-26</div>
          </div>

          <div>
            <h1 className="panel-title">
              Laksh<br /><em>Library</em><br />System
            </h1>
            <div className="panel-rule" />
            <p className="panel-desc">
              A unified management portal for student enrolment, seat allocation, and subscription tracking.
            </p>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-value">4,200+</div>
                <div className="stat-label">Volumes</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">340</div>
                <div className="stat-label">Active seats</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">98%</div>
                <div className="stat-label">Retention</div>
              </div>
            </div>
          </div>

          <div className="panel-badge">
            <div className="badge-dot" />
            System Online · All Services Operational
          </div>
        </div>

        {/* Right login panel */}
        <div className="right-panel">
          <div className="form-box">
            <div className="form-header">
              <div className="form-eyebrow">Student Portal Access</div>
              <h2 className="form-title">Sign in to<br />your account</h2>
              <p className="form-subtitle">Authorised personnel only</p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && <div className="api-error">{error}</div>}

              <div className="field-group">
                <label className="field-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`field-input${errors.email ? ' error' : ''}`}
                  placeholder="name@university.edu"
                  disabled={isLoading}
                />
                {errors.email && <div className="field-error">· {errors.email}</div>}
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`field-input${errors.password ? ' error' : ''}`}
                  placeholder="••••••••••"
                  disabled={isLoading}
                />
                {errors.password && <div className="field-error">· {errors.password}</div>}
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Authenticating...' : 'Access Portal →'}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line" />
              <div className="divider-text">Laksh Library</div>
              <div className="divider-line" />
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
};
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createStudent, updateStudent } from '../services/api';
import { StudentForm } from '../components/StudentForm';

export const StudentFormPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const student = location.state?.student || null;
  const isEdit = !!id;

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = isEdit ? await updateStudent(id, formData) : await createStudent(formData);
      if (result.success) {
        navigate('/students');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

        .sfp-root {
          min-height: 100vh;
          background: #0d1117;
          font-family: 'Barlow', sans-serif;
          position: relative;
        }

        .sfp-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,163,80,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,163,80,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .sfp-header {
          background: rgba(10,14,20,0.85);
          border-bottom: 1px solid rgba(240,230,208,0.08);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .sfp-header-inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 28px;
          height: 72px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-btn {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(240,230,208,0.12);
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(240,230,208,0.4);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          flex-shrink: 0;
        }

        .back-btn:hover {
          border-color: rgba(212,163,80,0.4);
          color: #d4a350;
          background: rgba(212,163,80,0.05);
        }

        .sfp-breadcrumb {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.3);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }

        .sfp-breadcrumb-sep {
          color: rgba(240,230,208,0.15);
        }

        .sfp-breadcrumb-current {
          color: #d4a350;
        }

        .sfp-page-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #f0e6d0;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .sfp-main {
          max-width: 760px;
          margin: 0 auto;
          padding: 40px 28px 80px;
          position: relative;
          z-index: 1;
        }

        .sfp-error {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 4px;
          padding: 14px 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 28px;
          font-size: 13px;
          color: #fca5a5;
        }

        .sfp-error-close {
          margin-left: auto;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(248,113,113,0.5);
          font-size: 16px;
          padding: 0;
          line-height: 1;
          flex-shrink: 0;
          transition: color 0.15s;
        }

        .sfp-error-close:hover { color: #f87171; }

        .sfp-card {
          background: #0f141c;
          border: 1px solid rgba(240,230,208,0.08);
          border-radius: 6px;
          padding: 32px;
        }

        .sfp-card-heading {
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(240,230,208,0.07);
        }

        .sfp-card-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #d4a350;
          margin-bottom: 6px;
        }

        .sfp-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #f0e6d0;
          letter-spacing: -0.02em;
        }

        .sfp-card-desc {
          font-size: 13px;
          color: rgba(240,230,208,0.35);
          margin-top: 4px;
          font-weight: 300;
        }
      `}</style>

      <div className="sfp-root">
        <header className="sfp-header">
          <div className="sfp-header-inner">
            <button className="back-btn" onClick={() => navigate('/students')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div>
              <div className="sfp-breadcrumb">
                Students <span className="sfp-breadcrumb-sep">/</span>
                <span className="sfp-breadcrumb-current">{isEdit ? 'Edit Record' : 'New Record'}</span>
              </div>
              <div className="sfp-page-title">
                {isEdit ? 'Modify Student Profile' : 'Onboard New Student'}
              </div>
            </div>
          </div>
        </header>

        <main className="sfp-main">
          {error && (
            <div className="sfp-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
              <button className="sfp-error-close" onClick={() => setError(null)}>×</button>
            </div>
          )}

          <div className="sfp-card">
            <div className="sfp-card-heading">
              <div className="sfp-card-eyebrow">
                {isEdit ? `Editing · ID ${id}` : 'New Enrolment'}
              </div>
              <div className="sfp-card-title">
                {isEdit ? 'Update library account' : 'Create library account'}
              </div>
              <div className="sfp-card-desc">
                All fields marked with an asterisk are required.
              </div>
            </div>

            <StudentForm
              student={student}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/students')}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </>
  );
};
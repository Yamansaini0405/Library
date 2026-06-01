import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/api';
import { StudentCard } from '../components/StudentCard';
import { useAuth } from '../context/AuthContext';

export const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    const result = await getStudents();
    if (result.success) setStudents(result.data);
    else setError(result.message);
    setIsLoading(false);
  };

  const handleEdit = (student) => {
    navigate(`/students/edit/${student.id}`, { state: { student } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Permanently delete this student record?')) {
      setIsDeleting(id);
      const result = await deleteStudent(id);
      setIsDeleting(null);
      if (result.success) setStudents(students.filter(s => s.id !== id));
      else setError(result.message);
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const filtered = students
    .filter(s => filter === 'ALL' || s.status === filter)
    .filter(s =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    );

  const paidCount = students.filter(s => s.status === 'PAID').length;
  const unpaidCount = students.filter(s => s.status === 'UNPAID').length;
  const totalRevenue = students.filter(s => s.status === 'PAID').reduce((a, s) => a + s.totalFee, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .sp-root {
          min-height: 100vh;
          background: #0d1117;
          font-family: 'Barlow', sans-serif;
          color: #f0e6d0;
          position: relative;
        }

        .sp-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,163,80,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,163,80,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* ── Header ── */
        .sp-header {
          background: rgba(10,14,20,0.9);
          border-bottom: 1px solid rgba(240,230,208,0.08);
          backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 30;
        }

        .sp-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 72px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sp-logo {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .sp-logo-icon {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(212,163,80,0.3);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4a350;
          background: rgba(212,163,80,0.06);
        }

        .sp-logo-text {}

        .sp-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #f0e6d0;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .sp-logo-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.3);
          margin-top: 2px;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: transparent;
          border: 1px solid rgba(240,230,208,0.1);
          border-radius: 4px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.35);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .logout-btn:hover {
          border-color: rgba(239,68,68,0.35);
          color: #f87171;
          background: rgba(239,68,68,0.05);
        }

        /* ── Stats Banner ── */
        .sp-stats {
          background: #0a0e14;
          border-bottom: 1px solid rgba(240,230,208,0.07);
        }

        .sp-stats-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          gap: 0;
        }

        .stat-cell {
          padding: 20px 32px 20px 0;
          margin-right: 32px;
          border-right: 1px solid rgba(240,230,208,0.07);
          flex-shrink: 0;
        }

        .stat-cell:last-child {
          border-right: none;
        }

        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #f0e6d0;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .stat-num.amber { color: #d4a350; }
        .stat-num.green { color: #4ade80; }
        .stat-num.red { color: #f87171; }

        .stat-lbl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.28);
          margin-top: 3px;
        }

        /* ── Main ── */
        .sp-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 36px 32px 80px;
          position: relative;
          z-index: 1;
        }

        .sp-toolbar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 32px;
        }

        .sp-search {
          flex: 1;
          min-width: 200px;
          position: relative;
        }

        .sp-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(240,230,208,0.25);
          pointer-events: none;
        }

        .sp-search input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(240,230,208,0.1);
          border-radius: 4px;
          padding: 11px 14px 11px 40px;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: #f0e6d0;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .sp-search input::placeholder { color: rgba(240,230,208,0.2); }
        .sp-search input:focus {
          border-color: rgba(212,163,80,0.4);
          background: rgba(212,163,80,0.03);
        }

        .filter-group {
          display: flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(240,230,208,0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .filter-btn {
          padding: 10px 16px;
          background: transparent;
          border: none;
          border-right: 1px solid rgba(240,230,208,0.08);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.35);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .filter-btn:last-child { border-right: none; }

        .filter-btn.active {
          background: rgba(212,163,80,0.12);
          color: #d4a350;
        }

        .filter-btn:hover:not(.active) {
          color: rgba(240,230,208,0.6);
          background: rgba(255,255,255,0.04);
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          background: #d4a350;
          border: none;
          border-radius: 4px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a0e14;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(212,163,80,0.2);
        }

        .add-btn:hover {
          background: #e8b860;
          box-shadow: 0 6px 24px rgba(212,163,80,0.35);
        }

        /* ── Error ── */
        .sp-error {
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 4px;
          padding: 13px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          font-size: 13px;
          color: #fca5a5;
        }

        .sp-error-close {
          margin-left: auto;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(248,113,113,0.5);
          font-size: 18px;
          line-height: 1;
          transition: color 0.15s;
          padding: 0;
        }

        .sp-error-close:hover { color: #f87171; }

        /* ── Loading ── */
        .sp-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 360px;
          gap: 16px;
        }

        .spinner {
          width: 36px;
          height: 36px;
          border: 2px solid rgba(212,163,80,0.15);
          border-top-color: #d4a350;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .sp-loading p {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.3);
        }

        /* ── Empty ── */
        .sp-empty {
          border: 1px dashed rgba(240,230,208,0.1);
          border-radius: 6px;
          padding: 80px 40px;
          text-align: center;
          max-width: 480px;
          margin: 0 auto;
        }

        .sp-empty-icon {
          width: 52px;
          height: 52px;
          border: 1px solid rgba(212,163,80,0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4a350;
          margin: 0 auto 20px;
          background: rgba(212,163,80,0.05);
        }

        .sp-empty h3 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #f0e6d0;
          margin: 0 0 8px;
        }

        .sp-empty p {
          font-size: 14px;
          font-weight: 300;
          color: rgba(240,230,208,0.35);
          margin: 0 0 24px;
        }

        .sp-empty-cta {
          background: none;
          border: 1px solid rgba(212,163,80,0.3);
          border-radius: 4px;
          padding: 10px 20px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #d4a350;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }

        .sp-empty-cta:hover {
          background: rgba(212,163,80,0.08);
          border-color: rgba(212,163,80,0.5);
        }

        /* ── Grid ── */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .sp-card-wrap {
          position: relative;
        }

        .sp-delete-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,14,20,0.7);
          backdrop-filter: blur(2px);
          z-index: 10;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sp-delete-inner {
          background: #0f141c;
          border: 1px solid rgba(240,230,208,0.1);
          border-radius: 4px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sp-delete-inner span {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #f87171;
        }

        .result-count {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.25);
          margin-bottom: 20px;
        }

        .result-count em {
          color: #d4a350;
          font-style: normal;
        }
      `}</style>

      <div className="sp-root">
        {/* Header */}
        <header className="sp-header">
          <div className="sp-header-inner">
            <div className="sp-logo">
              <div className="sp-logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div className="sp-logo-text">
                <div className="sp-logo-name">Laksh Library</div>
                <div className="sp-logo-sub">Student Directory</div>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>
        </header>

        {/* Stats banner */}
        <div className="sp-stats">
          <div className="sp-stats-inner">
            <div className="stat-cell">
              <div className="stat-num amber">{students.length}</div>
              <div className="stat-lbl">Enrolled</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num green">{paidCount}</div>
              <div className="stat-lbl">Paid</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num red">{unpaidCount}</div>
              <div className="stat-lbl">Unpaid</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num amber">₨ {totalRevenue.toFixed(0)}</div>
              <div className="stat-lbl">Revenue</div>
            </div>
          </div>
        </div>

        {/* Main */}
        <main className="sp-main">
          {error && (
            <div className="sp-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
              <button className="sp-error-close" onClick={() => setError(null)}>×</button>
            </div>
          )}

          {/* Toolbar */}
          <div className="sp-toolbar">
            <div className="sp-search">
              <svg className="sp-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              {['ALL', 'PAID', 'UNPAID'].map(f => (
                <button
                  key={f}
                  className={`filter-btn${filter === f ? ' active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <button className="add-btn" onClick={() => navigate('/students/add')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Student
            </button>
          </div>

          {isLoading ? (
            <div className="sp-loading">
              <div className="spinner" />
              <p>Fetching records...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="sp-empty">
              <div className="sp-empty-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>No students enrolled</h3>
              <p>Get started by adding your first student to the directory.</p>
              <button className="sp-empty-cta" onClick={() => navigate('/students/add')}>
                Add first student →
              </button>
            </div>
          ) : (
            <>
              {(search || filter !== 'ALL') && (
                <div className="result-count">
                  Showing <em>{filtered.length}</em> of {students.length} records
                </div>
              )}
              <div className="sp-grid">
                {filtered.map(student => (
                  <div key={student.id} className="sp-card-wrap">
                    {isDeleting === student.id && (
                      <div className="sp-delete-overlay">
                        <div className="sp-delete-inner">
                          <div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                          <span>Deleting...</span>
                        </div>
                      </div>
                    )}
                    <StudentCard
                      student={student}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};
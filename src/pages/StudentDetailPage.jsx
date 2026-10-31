import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById } from '../services/api';

const formatMonthLabel = (payment) => {
  if (!payment) return 'N/A';
  return `${payment.month || 'Month'} ${payment.year || ''}`.trim();
};

export const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      setIsLoading(true);
      setError(null);

      const result = await getStudentById(id);
      if (result.success) setStudent(result.data);
      else setError(result.message || 'Student not found');

      setIsLoading(false);
    };

    loadStudent();
  }, [id]);

  const paymentHistory = useMemo(() => {
    if (!student?.paymentHistory?.length) return [];

    return [...student.paymentHistory].sort((a, b) => {
      const aKey = Number(a.year || 0) * 12 + Number(a.monthNumber || 0);
      const bKey = Number(b.year || 0) * 12 + Number(b.monthNumber || 0);
      return aKey - bKey;
    });
  }, [student]);

  const latestPayment = paymentHistory[paymentHistory.length - 1] || null;

  if (isLoading) {
    return (
      <div className="sd-root">
        <div className="sd-card loading-card">
          <div className="spinner" />
          <p>Loading student details...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="sd-root">
        <div className="sd-card error-card">
          <h3>Student not found</h3>
          <p>{error || 'This student record could not be loaded.'}</p>
          <button className="sd-back-btn" onClick={() => navigate('/students')}>Back to students</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .sd-root {
          min-height: 100vh;
          background: #0d1117;
          color: #f0e6d0;
          font-family: 'Barlow', sans-serif;
          padding: 32px 20px 60px;
        }

        .sd-shell {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sd-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
        }

        .sd-back-btn {
          background: transparent;
          border: 1px solid rgba(240,230,208,0.12);
          color: rgba(240,230,208,0.7);
          border-radius: 6px;
          padding: 10px 14px;
          cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .sd-back-btn:hover {
          border-color: rgba(212,163,80,0.36);
          color: #d4a350;
        }

        .sd-card {
          background: rgba(15,20,28,0.9);
          border: 1px solid rgba(240,230,208,0.08);
          border-radius: 10px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .loading-card,
        .error-card {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          min-height: 300px;
          text-align: center;
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

        .sd-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(240,230,208,0.08);
          margin-bottom: 24px;
        }

        .sd-name {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          margin: 0;
          color: #f0e6d0;
        }

        .sd-meta {
          margin-top: 8px;
          color: rgba(240,230,208,0.65);
          font-size: 14px;
        }

        .sd-status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 110px;
          padding: 8px 12px;
          border-radius: 999px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid;
        }

        .sd-status.paid {
          color: #4ade80;
          background: rgba(74,222,128,0.08);
          border-color: rgba(74,222,128,0.25);
        }

        .sd-status.unpaid {
          color: #fca5a5;
          background: rgba(248,113,113,0.08);
          border-color: rgba(248,113,113,0.25);
        }

        .sd-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .sd-stat {
          border: 1px solid rgba(240,230,208,0.08);
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          padding: 18px 16px;
        }

        .sd-stat-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(240,230,208,0.35);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .sd-stat-value {
          font-size: 22px;
          font-weight: 600;
          color: #f0e6d0;
        }

        .sd-section-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4a350;
          margin: 18px 0 12px;
        }

        .sd-detail-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .sd-detail-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(240,230,208,0.08);
          border-radius: 8px;
          padding: 16px;
        }

        .sd-detail-key {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.35);
          margin-bottom: 8px;
        }

        .sd-detail-value {
          font-size: 15px;
          color: #f0e6d0;
        }

        .sd-history {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        .sd-history th,
        .sd-history td {
          padding: 14px 12px;
          border-bottom: 1px solid rgba(240,230,208,0.08);
          text-align: left;
        }

        .sd-history th {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.35);
        }

        .sd-history td {
          color: #f0e6d0;
        }

        .sd-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 84px;
          padding: 6px 10px;
          border-radius: 999px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid;
        }

        .sd-badge.paid {
          color: #4ade80;
          background: rgba(74,222,128,0.08);
          border-color: rgba(74,222,128,0.25);
        }

        .sd-badge.unpaid {
          color: #fca5a5;
          background: rgba(248,113,113,0.08);
          border-color: rgba(248,113,113,0.25);
        }

        @media (max-width: 768px) {
          .sd-grid,
          .sd-detail-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sd-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 560px) {
          .sd-root {
            padding-left: 12px;
            padding-right: 12px;
          }

          .sd-grid,
          .sd-detail-list {
            grid-template-columns: 1fr;
          }

          .sd-card {
            padding: 18px 14px;
          }

          .sd-topbar {
            flex-direction: column;
            align-items: stretch;
          }

          .sd-back-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="sd-root">
        <div className="sd-shell">
          <div className="sd-topbar">
            <button className="sd-back-btn" onClick={() => navigate('/students')}>Back to students</button>
          </div>

          <div className="sd-card">
            <div className="sd-header">
              <div>
                <h1 className="sd-name">{student.name}</h1>
                <div className="sd-meta">
                  {student.email} • Seat #{student.seatNo}
                </div>
              </div>

              <div className={`sd-status ${student.status === 'PAID' ? 'paid' : 'unpaid'}`}>
                {student.status}
              </div>
            </div>

            <div className="sd-grid">
              <div className="sd-stat">
                <div className="sd-stat-label">Phone</div>
                <div className="sd-stat-value">{student.phone}</div>
              </div>
              <div className="sd-stat">
                <div className="sd-stat-label">Recent Month</div>
                <div className="sd-stat-value">{latestPayment ? formatMonthLabel(latestPayment) : 'N/A'}</div>
              </div>
              <div className="sd-stat">
                <div className="sd-stat-label">Monthly Fee</div>
                <div className="sd-stat-value">₨ {Number(student.totalFee || 0).toFixed(0)}</div>
              </div>
              <div className="sd-stat">
                <div className="sd-stat-label">Recent Status</div>
                <div className="sd-stat-value">{latestPayment ? latestPayment.status : student.status}</div>
              </div>
            </div>

            <div className="sd-section-label">Student details</div>
            <div className="sd-detail-list">
              <div className="sd-detail-item">
                <div className="sd-detail-key">Name</div>
                <div className="sd-detail-value">{student.name}</div>
              </div>
              <div className="sd-detail-item">
                <div className="sd-detail-key">Email</div>
                <div className="sd-detail-value">{student.email}</div>
              </div>
              <div className="sd-detail-item">
                <div className="sd-detail-key">Phone</div>
                <div className="sd-detail-value">{student.phone}</div>
              </div>
              <div className="sd-detail-item">
                <div className="sd-detail-key">Seat Number</div>
                <div className="sd-detail-value">{student.seatNo}</div>
              </div>
            </div>

            <div className="sd-section-label">Fee payment history</div>
            {paymentHistory.length ? (
              <table className="sd-history">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((entry, index) => (
                    <tr key={`${entry.month}-${entry.year}-${index}`}>
                      <td>{entry.month || 'Month'}</td>
                      <td>{entry.year || 'N/A'}</td>
                      <td>₨ {Number(entry.amount || 0).toFixed(0)}</td>
                      <td>
                        <span className={`sd-badge ${entry.status === 'PAID' ? 'paid' : 'unpaid'}`}>
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No fee payment history available yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

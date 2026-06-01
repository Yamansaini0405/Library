import React from 'react';

export const StudentCard = ({ student, onEdit, onDelete }) => {
  const isPaid = student.status === 'PAID';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

        .s-card {
          background: #0f141c;
          border: 1px solid rgba(240,230,208,0.1);
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: 'Barlow', sans-serif;
          position: relative;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }

        .s-card:hover {
          border-color: rgba(212,163,80,0.35);
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,163,80,0.1);
          transform: translateY(-2px);
        }

        .s-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: ${isPaid ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #ef4444, #dc2626)'};
          opacity: 0.8;
        }

        .card-top {
          padding: 20px 20px 0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(240,230,208,0.07);
        }

        .card-index {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.25);
          margin-bottom: 4px;
        }

        .card-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #f0e6d0;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .card-email {
          font-size: 12px;
          font-weight: 400;
          color: rgba(240,230,208,0.35);
          margin-top: 3px;
          font-family: 'Barlow', sans-serif;
        }

        .status-badge {
          flex-shrink: 0;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          border: 1px solid;
        }

        .status-paid {
          color: #4ade80;
          border-color: rgba(74,222,128,0.3);
          background: rgba(74,222,128,0.06);
        }

        .status-unpaid {
          color: #f87171;
          border-color: rgba(248,113,113,0.3);
          background: rgba(248,113,113,0.06);
        }

        .card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          padding: 16px 20px;
          flex: 1;
        }

        .grid-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(240,230,208,0.06);
        }

        .grid-item:nth-child(odd) {
          padding-right: 16px;
          border-right: 1px solid rgba(240,230,208,0.06);
        }

        .grid-item:nth-child(even) {
          padding-left: 16px;
        }

        .grid-item:nth-last-child(-n+2) {
          border-bottom: none;
        }

        .grid-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.28);
          margin-bottom: 4px;
        }

        .grid-value {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #f0e6d0;
        }

        .fee-value {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #d4a350;
          letter-spacing: -0.02em;
        }

        .card-actions {
          display: flex;
          border-top: 1px solid rgba(240,230,208,0.07);
        }

        .action-btn {
          flex: 1;
          padding: 12px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: background 0.2s, color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .edit-btn {
          color: rgba(240,230,208,0.45);
          border-right: 1px solid rgba(240,230,208,0.07);
        }

        .edit-btn:hover {
          background: rgba(212,163,80,0.08);
          color: #d4a350;
        }

        .delete-btn {
          color: rgba(240,230,208,0.25);
          max-width: 52px;
        }

        .delete-btn:hover {
          background: rgba(239,68,68,0.08);
          color: #f87171;
        }
      `}</style>

      <div className="s-card">
        <div className="card-top">
          <div className="card-header">
            <div>
              <div className="card-index">Seat #{student.seatNo}</div>
              <div className="card-name">{student.name}</div>
              <div className="card-email">{student.email}</div>
            </div>
            <div className={`status-badge ${isPaid ? 'status-paid' : 'status-unpaid'}`}>
              {student.status}
            </div>
          </div>
        </div>

        <div className="card-grid">
          <div className="grid-item">
            <div className="grid-label">Phone</div>
            <div className="grid-value">{student.phone}</div>
          </div>
          <div className="grid-item">
            <div className="grid-label">Room</div>
            <div className="grid-value">#{student.seatNo}</div>
          </div>
          <div className="grid-item" style={{ gridColumn: '1 / -1', paddingRight: 0, borderRight: 'none', paddingLeft: 0 }}>
            <div className="grid-label">Subscription Dues</div>
            <div className="fee-value">₨ {student.totalFee.toFixed(2)}</div>
          </div>
        </div>

        <div className="card-actions">
          <button className="action-btn edit-btn" onClick={() => onEdit(student)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit Record
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(student.id)} title="Delete">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
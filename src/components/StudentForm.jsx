import React, { useState, useEffect } from 'react';

const FEE_STATUS = ['PAID', 'UNPAID'];

export const StudentForm = ({ student, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', seatNo: '', totalFee: '', status: 'PAID',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.seatNo) {
      newErrors.seatNo = 'Seat number required';
    } else if (isNaN(formData.seatNo)) {
      newErrors.seatNo = 'Must be numeric';
    }
    if (!formData.totalFee) {
      newErrors.totalFee = 'Fee amount required';
    } else if (isNaN(formData.totalFee)) {
      newErrors.totalFee = 'Must be a valid number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({ ...formData, seatNo: parseInt(formData.seatNo), totalFee: parseFloat(formData.totalFee) });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

        .sf-form {
          font-family: 'Barlow', sans-serif;
        }

        .sf-section {
          margin-bottom: 32px;
        }

        .sf-section-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #d4a350;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sf-section-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(212,163,80,0.2);
        }

        .sf-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .sf-grid-2 { grid-template-columns: 1fr; }
        }

        .sf-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sf-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.4);
        }

        .sf-label span {
          color: #f87171;
          margin-left: 3px;
        }

        .sf-input, .sf-select {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(240,230,208,0.1);
          border-radius: 4px;
          padding: 12px 14px;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #f0e6d0;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .sf-input::placeholder {
          color: rgba(240,230,208,0.18);
        }

        .sf-input:focus, .sf-select:focus {
          border-color: #d4a350;
          background: rgba(212,163,80,0.04);
          box-shadow: 0 0 0 3px rgba(212,163,80,0.08);
        }

        .sf-input.has-error {
          border-color: rgba(248,113,113,0.5);
        }

        .sf-error {
          font-size: 11px;
          color: #f87171;
          font-weight: 400;
        }

        .sf-select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(240,230,208,0.3)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }

        .sf-select option {
          background: #0f141c;
          color: #f0e6d0;
        }

        .sf-select:disabled, .sf-input:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .sf-footer {
          display: flex;
          flex-direction: row;
          gap: 12px;
          padding-top: 24px;
          border-top: 1px solid rgba(240,230,208,0.07);
          margin-top: 8px;
        }

        @media (max-width: 480px) {
          .sf-footer { flex-direction: column-reverse; }
        }

        .btn-cancel {
          flex: 1;
          padding: 13px 20px;
          background: transparent;
          border: 1px solid rgba(240,230,208,0.12);
          border-radius: 4px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,230,208,0.4);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .btn-cancel:hover:not(:disabled) {
          border-color: rgba(240,230,208,0.25);
          color: rgba(240,230,208,0.7);
          background: rgba(255,255,255,0.03);
        }

        .btn-cancel:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .btn-submit {
          flex: 2;
          padding: 13px 20px;
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
          transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
          box-shadow: 0 4px 16px rgba(212,163,80,0.2);
        }

        .btn-submit:hover:not(:disabled) {
          background: #e8b860;
          box-shadow: 0 6px 24px rgba(212,163,80,0.35);
        }

        .btn-submit:active:not(:disabled) {
          transform: scale(0.99);
        }

        .btn-submit:disabled {
          background: rgba(212,163,80,0.25);
          color: rgba(10,14,20,0.4);
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>

      <form className="sf-form" onSubmit={handleSubmit}>
        {/* Identity */}
        <div className="sf-section">
          <div className="sf-section-heading">Student Identity</div>
          <div className="sf-field">
            <label className="sf-label">Full Name <span>*</span></label>
            <input
              type="text" name="name" value={formData.name} onChange={handleChange}
              className={`sf-input${errors.name ? ' has-error' : ''}`}
              placeholder="e.g. Eleanor Vance" disabled={isLoading}
            />
            {errors.name && <div className="sf-error">· {errors.name}</div>}
          </div>
        </div>

        {/* Contact */}
        <div className="sf-section">
          <div className="sf-section-heading">Contact Details</div>
          <div className="sf-grid-2">
            <div className="sf-field">
              <label className="sf-label">Email Address <span>*</span></label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                className={`sf-input${errors.email ? ' has-error' : ''}`}
                placeholder="eleanor@university.edu" disabled={isLoading}
              />
              {errors.email && <div className="sf-error">· {errors.email}</div>}
            </div>
            <div className="sf-field">
              <label className="sf-label">Phone Number <span>*</span></label>
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className={`sf-input${errors.phone ? ' has-error' : ''}`}
                placeholder="0134368276" disabled={isLoading}
              />
              {errors.phone && <div className="sf-error">· {errors.phone}</div>}
            </div>
          </div>
        </div>

        {/* Allocation */}
        <div className="sf-section">
          <div className="sf-section-heading">Allocation & Billing</div>
          <div className="sf-grid-2">
            <div className="sf-field">
              <label className="sf-label">Seat Number <span>*</span></label>
              <input
                type="number" name="seatNo" value={formData.seatNo} onChange={handleChange}
                className={`sf-input${errors.seatNo ? ' has-error' : ''}`}
                placeholder="14" disabled={isLoading}
              />
              {errors.seatNo && <div className="sf-error">· {errors.seatNo}</div>}
            </div>
            <div className="sf-field">
              <label className="sf-label">Subscription Fee ($) <span>*</span></label>
              <input
                type="number" name="totalFee" value={formData.totalFee} onChange={handleChange}
                step="0.01"
                className={`sf-input${errors.totalFee ? ' has-error' : ''}`}
                placeholder="75.00" disabled={isLoading}
              />
              {errors.totalFee && <div className="sf-error">· {errors.totalFee}</div>}
            </div>
          </div>

          <div className="sf-field" style={{ marginTop: '16px' }}>
            <label className="sf-label">Payment Status <span>*</span></label>
            <select
              name="status" value={formData.status} onChange={handleChange}
              className="sf-select" disabled={isLoading}
            >
              {FEE_STATUS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="sf-footer">
          <button type="button" className="btn-cancel" onClick={onCancel} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Record →'}
          </button>
        </div>
      </form>
    </>
  );
};
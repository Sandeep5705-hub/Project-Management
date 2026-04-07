import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '32px', position: 'relative', background: '#1e293b', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#64748b', fontSize: '24px', cursor: 'pointer' }}
        >
          &times;
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>{title}</h2>
        <div style={{ marginTop: '24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

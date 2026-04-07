import React from 'react';

export default function SchedulePortal() {
  const dates = [
    { day: 1, type: 'ref' }, { day: 2, type: 'ref' }, { day: 3, type: 'ref' }, { day: 4, type: 'ref' },
    { day: 7, type: 'panel' }, { day: 10, type: 'panel' }, { day: 20, type: 'panel' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a' }}>Project Schedule</h1>
        <p style={{ color: '#64748b' }}>Manage your review panels and deadlines</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* CALENDAR */}
        <div className="glass-panel" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '32px', color: '#1e3a8a' }}>📅 Select Date</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '16px', textAlign: 'center' }}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}>{d}</div>
                ))}
                {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const event = dates.find(d => d.day === day);
                    return (
                        <div key={i} style={{ 
                            padding: '12px', 
                            borderRadius: '8px', 
                            fontSize: '14px', 
                            background: event ? (event.type === 'panel' ? '#2563eb' : '#eff6ff') : 'transparent',
                            color: event ? (event.type === 'panel' ? 'white' : '#1e3a8a') : '#64748b'
                        }}>
                            {day}
                        </div>
                    );
                })}
            </div>
            <div style={{ marginTop: '40px', display: 'flex', gap: '24px', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#eff6ff' }}></div>
                    <span style={{ color: '#64748b' }}>Reference Dates</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#2563eb' }}></div>
                    <span style={{ color: '#64748b' }}>Scheduled Panels</span>
                </div>
            </div>
        </div>

        {/* UPCOMING */}
        <div className="glass-panel" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '32px', color: '#1e3a8a' }}>Upcoming Panels</h3>
            <div style={{ background: '#ecfdf5', border: '1px solid #10b981', padding: '24px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#065f46' }}>April 10, 2026</div>
                    <div style={{ padding: '4px 12px', background: '#10b981', color: 'white', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' }}>✓ Confirmed</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '8px' }}>10:00 AM</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>⏳ 2 hours</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>📍 In-Person</div>
            </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', color: '#1e3a8a' }}>Reference Dates</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {['Review 1', 'Review 2', 'Review 3'].map((r, i) => (
                <div key={r} className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{r}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>April {10 + i*10}, 2026</div>
                    <div style={{ padding: '4px 12px', display: 'inline-block', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: i === 0 ? '#ecfdf5' : '#f1f5f9', color: i === 0 ? '#059669' : '#64748b' }}>
                        {i === 0 ? 'Scheduled' : 'Not Scheduled'}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

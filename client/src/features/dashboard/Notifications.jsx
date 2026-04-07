import React from 'react';

const NOTIFICATIONS_DATA = [
  {
    id: 1,
    title: 'Task Completed',
    desc: "Ajay has completed 'Login Page Design' task",
    time: '1 min ago',
    icon: '✅',
    color: '#8b5cf6',
    dot: '#8b5cf6'
  },
  {
    id: 2,
    title: 'Server Issue',
    desc: "Backend can't connect to MongoDB",
    time: '10 min ago',
    icon: '🍃',
    color: '#10b981',
    dot: '#10b981'
  },
  {
    id: 3,
    title: 'Code Uploaded',
    desc: "Sandeep uploaded a new frontend template",
    time: '45 min ago',
    icon: '📁',
    color: '#f59e0b',
    dot: '#f59e0b'
  },
  {
    id: 4,
    title: 'AI Assistant',
    desc: "Beginner Guide cards have been added to UI",
    time: '1 hr ago',
    icon: '🤖',
    color: '#3b82f6',
    dot: '#3b82f6'
  },
  {
    id: 5,
    title: 'Security Alert',
    desc: "Unatinfo...obe login attempt detected",
    time: '2 hrs ago',
    icon: '🛡️',
    color: '#ef4444',
    dot: '#ef4444'
  }
];

export default function Notifications() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
      <div style={{ 
          width: '100%', 
          maxWidth: '500px', 
          background: '#1a1d2d', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
      }}>
        
        {/* HEADER */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', margin: 0 }}>Notifications</h2>
           <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ fontSize: '20px', color: '#94a3b8' }}>🔔</span>
              <div style={{ position: 'relative' }}>
                 <span style={{ fontSize: '20px', color: '#94a3b8' }}>💼</span>
                 <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '18px', height: '18px', background: '#ef4444', borderRadius: '50%', color: 'white', fontSize: '10px', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</div>
              </div>
           </div>
        </div>

        {/* LIST */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
           {NOTIFICATIONS_DATA.map((n, idx) => (
              <div key={n.id} style={{ 
                  padding: '24px 32px', 
                  borderBottom: idx === NOTIFICATIONS_DATA.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.03)',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  transition: 'background 0.2s',
                  cursor: 'pointer'
              }}>
                 {/* ICON BOX */}
                 <div style={{ 
                     width: '48px', height: '48px', borderRadius: '14px', 
                     background: 'rgba(255,255,255,0.02)', 
                     border: `1px solid rgba(255,255,255,0.05)`,
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     fontSize: '20px', position: 'relative',
                     boxShadow: `0 0 15px ${n.color}11`
                 }}>
                    {n.icon}
                    <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '12px', height: '12px', background: n.dot, borderRadius: '50%', border: '2px solid #1a1d2d' }}></div>
                 </div>

                 {/* CONTENT */}
                 <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                       <div style={{ fontWeight: '900', color: 'white', fontSize: '16px' }}>{n.title}</div>
                       <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700' }}>{n.time}</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.4', fontWeight: '600' }}>{n.desc}</div>
                 </div>
              </div>
           ))}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
           <a href="#" style={{ color: '#60a5fa', fontSize: '15px', fontWeight: '900', textDecoration: 'none' }}>View All</a>
        </div>

      </div>
    </div>
  );
}

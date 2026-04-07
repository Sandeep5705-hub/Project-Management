import React from 'react';

// V2 - MASTER ANALYTICS DASHBOARD
const STATS = [
  { label: 'Total Tasks', value: '60' },
  { label: 'Total Score', value: '515' },
  { label: 'Team Activity', value: '92%' },
  { label: 'Total Submissions', value: '120' }
];

const LEADERBOARD_ROWS = [
  { rank: 1, name: 'Sandeep', score: 140, tasks: 14, activity: 'High', color: '#10b981', icon: '🥇', avatar: 'user_avatar_sandeep_1775589890029.png' },
  { rank: 2, name: 'Ajay', score: 120, tasks: 12, activity: 'Good', color: '#10b981', icon: '🥈', avatar: 'user_avatar_john_1775589913745.png' },
  { rank: 3, name: 'Deepak', score: 100, tasks: 10, activity: 'Medium', color: '#f59e0b', icon: '🥉', avatar: 'user_avatar_ananya_1775589936699.png' },
  { rank: 4, name: 'Surya', score: 85, tasks: 8, activity: 'Low', color: '#f59e0b', icon: '4', avatar: 'user_avatar_john_1775589913745.png' },
  { rank: 5, name: 'Jaswanth', score: 70, tasks: 7, activity: 'Beginner', color: '#64748b', icon: '5', avatar: 'user_avatar_ananya_1775589936699.png' }
];

export default function Leaderboard({ projectId }) {
  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        color: 'white', 
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto'
    }}>
      
      {/* 🚀 1. STATS OVERVIEW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
         {STATS.map(s => (
            <div key={s.label} style={{ 
                background: '#1a1d2d', 
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px', 
                padding: '24px', 
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
               <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>{s.label}</div>
               <div style={{ fontSize: '36px', fontWeight: '900' }}>{s.value}</div>
            </div>
         ))}
      </div>

      {/* 📊 2. MIDDLE SECTION: HEATMAP & DONUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px' }}>
         
         {/* ACTIVITY HEATMAP */}
         <div style={{ 
             background: '#1a1d2d', border: '1px solid rgba(255,255,255,0.05)',
             borderRadius: '16px', padding: '32px'
         }}>
             <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Activity Heatmap</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['April-2025', 'May-2025', 'June-2025', 'July-2025'].map((m) => (
                   <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', width: '90px' }}>{m}</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(31, 1fr)', gap: '4px', flex: 1 }}>
                         {Array.from({ length: 31 }).map((_, i) => (
                            <div key={i} style={{ 
                               aspectRatio: '1', borderRadius: '3px',
                               background: i % 2 === 0 ? (i % 4 === 0 ? '#fbbf24' : '#78350f') : '#1e293b'
                            }}></div>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
             <div style={{ marginTop: '24px', display: 'flex', gap: '8px', fontSize: '12px', color: '#64748b', alignItems: 'center' }}>
                Less <div style={{width:12, height:12, background:'#1e293b', borderRadius:2}}></div> <div style={{width:12, height:12, background:'#78350f', borderRadius:2}}></div> <div style={{width:12, height:12, background:'#fbbf24', borderRadius:2}}></div> More
             </div>
         </div>

         {/* TASK COMPLETION DONUT */}
         <div style={{ 
             background: '#1a1d2d', border: '1px solid rgba(255,255,255,0.05)',
             borderRadius: '16px', padding: '32px', textAlign: 'center'
         }}>
             <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '32px' }}>Task Completion</h3>
             <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
                <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                   <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#1e293b" strokeWidth="4" />
                   <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6366f1" strokeWidth="4" strokeDasharray="65 100" />
                   <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#fbbf24" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-65" />
                   <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-80" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                   <div style={{ fontSize: '36px', fontWeight: '900' }}>65%</div>
                </div>
             </div>
             <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '13px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width:10, height:10, borderRadius: '50%', background:'#6366f1'}}></div> Completed</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width:10, height:10, borderRadius: '50%', background:'#0ea5e9'}}></div> In Progress</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width:10, height:10, borderRadius: '50%', background:'#fbbf24'}}></div> Pending</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width:10, height:10, borderRadius: '50%', background:'#ef4444'}}></div> Blocked</div>
             </div>
         </div>
      </div>

      {/* 📈 3. BOTTOM SECTION: LINE GRAPH & RANKINGS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
         
         {/* PERFORMANCE OVER TIME */}
         <div style={{ 
             background: '#1a1d2d', border: '1px solid rgba(255,255,255,0.05)',
             borderRadius: '16px', padding: '32px'
         }}>
             <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '40px' }}>Performance Over Time</h3>
             <div style={{ height: '250px', width: '100%', position: 'relative', paddingRight: '40px' }}>
                <svg width="100%" height="100%" viewBox="0 0 400 200" style={{ overflow: 'visible' }}>
                   {/* GRID LINES */}
                   {[0, 50, 100, 150, 200].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}
                   
                   {/* DATA LINE */}
                   <path d="M0,180 L100,140 L200,90 L300,50 L400,20" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                   
                   {/* POINTS */}
                   <circle cx="100" cy="140" r="6" fill="#0ea5e9" stroke="#1a1d2d" strokeWidth="2" />
                   <text x="100" y="125" fill="white" fontSize="14" fontWeight="900" textAnchor="middle">10</text>
                   
                   <circle cx="200" cy="90" r="6" fill="#0ea5e9" stroke="#1a1d2d" strokeWidth="2" />
                   <text x="200" y="75" fill="white" fontSize="14" fontWeight="900" textAnchor="middle">18</text>
                   
                   <circle cx="300" cy="50" r="6" fill="#0ea5e9" stroke="#1a1d2d" strokeWidth="2" />
                   <text x="300" y="35" fill="white" fontSize="14" fontWeight="900" textAnchor="middle">25</text>
                   
                   <circle cx="400" cy="20" r="6" fill="#0ea5e9" stroke="#1a1d2d" strokeWidth="2" />
                   <text x="400" y="10" fill="white" fontSize="14" fontWeight="900" textAnchor="middle">32</text>
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
                   <span>Week 1</span>
                   <span>Week 2</span>
                   <span>Week 3</span>
                   <span>Week 4</span>
                </div>
             </div>
         </div>

         {/* TEAM LEADERBOARD */}
         <div style={{ 
             background: '#1a1d2d', border: '1px solid rgba(255,255,255,0.05)',
             borderRadius: '16px', padding: '32px'
         }}>
             <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Team Leaderboard</h3>
             <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                       <tr style={{ color: '#64748b', fontSize: '13px' }}>
                          <th style={{ padding: '12px' }}>Rank</th>
                          <th style={{ padding: '12px' }}>Name</th>
                          <th style={{ padding: '12px' }}>Score</th>
                          <th style={{ padding: '12px', textAlign: 'right' }}>Activity</th>
                       </tr>
                    </thead>
                    <tbody>
                       {LEADERBOARD_ROWS.map(p => (
                          <tr key={p.name} style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                             <td style={{ padding: '16px 12px', fontSize: '20px' }}>{p.icon}</td>
                             <td style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                   <img src={`./${p.avatar}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <span style={{ fontWeight: '700' }}>{p.name}</span>
                             </td>
                             <td style={{ padding: '16px 12px', fontWeight: '900', color: '#ececf1' }}>{p.score}</td>
                             <td style={{ padding: '16px 12px', textAlign: 'right', color: p.color, fontWeight: '800', fontSize: '12px' }}>{p.activity}</td>
                          </tr>
                       ))}
                    </tbody>
                </table>
             </div>
         </div>
      </div>

    </div>
  );
}

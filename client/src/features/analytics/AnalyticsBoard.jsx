import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function AnalyticsBoard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get('/auth/leaderboard'); // Needs backend implementation
      setUsers(res.data);
    } catch (err) {
      // Mock data if API not ready
      setUsers([
        { name: 'Sarah Chen' , score: 950, role: 'Leader' },
        { name: 'Michael Kim', score: 920, role: 'Member' },
        { name: 'Emily Rodriguez', score: 895, role: 'Member' },
        { name: 'David Park', score: 870, role: 'Member' },
        { name: 'Jessica Lee', score: 845, role: 'Member' }
      ]);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a' }}>Performance Dashboard</h1>
        <p style={{ color: '#64748b' }}>Track individual and team metrics</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
        {/* LINE CHART MOCK */}
        <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '32px', color: '#1e3a8a' }}>📈 Quiz Score Trend</h3>
            <div style={{ height: '300px', borderBottom: '1px solid #e2e8f0', borderLeft: '1px solid #e2e8f0', position: 'relative', padding: '0 20px' }}>
                <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', fill: 'none' }}>
                    <path d="M0,150 L100,120 L200,100 L300,80 L400,70 L500,50" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                    {/* Data dots */}
                    <circle cx="0" cy="150" r="6" fill="#2563eb" />
                    <circle cx="100" cy="120" r="6" fill="#2563eb" />
                    <circle cx="200" cy="100" r="6" fill="#2563eb" />
                    <circle cx="300" cy="80" r="6" fill="#2563eb" />
                    <circle cx="400" cy="70" r="6" fill="#2563eb" />
                    <circle cx="500" cy="50" r="6" fill="#2563eb" />
                </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', color: '#64748b', fontSize: '12px' }}>
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span>Week 5</span>
                <span>Week 6</span>
            </div>
            <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ background: '#eff6ff', padding: '24px', borderRadius: '16px' }}>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>Average Score</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a' }}>80%</div>
                </div>
                <div style={{ background: '#ecfdf5', padding: '24px', borderRadius: '16px' }}>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>Improvement</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#059669' }}>+27%</div>
                </div>
            </div>
        </div>

        {/* LEADERBOARD */}
        <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', color: '#1e3a8a' }}>🏆 Team Leaderboard</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <tr style={{ color: '#64748b', fontSize: '12px', textAlign: 'left' }}>
                        <th style={{ padding: '12px 0' }}>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => (
                        <tr key={u.name} style={{ borderBottom: '1px solid #f8fafc' }}>
                            <td style={{ padding: '16px 0' }}>
                                <div style={{ 
                                    width: '28px', 
                                    height: '28px', 
                                    borderRadius: '50%', 
                                    background: i === 0 ? '#fbbf24' : '#e2e8f0', 
                                    color: i === 0 ? 'white' : '#64748b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '13px',
                                    fontWeight: 'bold'
                                }}>{i + 1}</div>
                            </td>
                            <td style={{ fontWeight: '500' }}>{u.name}</td>
                            <td style={{ fontWeight: 'bold', color: '#1e3a8a' }}>{u.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

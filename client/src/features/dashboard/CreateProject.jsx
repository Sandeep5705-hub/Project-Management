import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateProject() {
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    problemStatement: '',
    technologies: '',
    startDate: '', 
    endDate: '',
    teamMemberNames: '',
    guideName: ''
  });
  const [resultIds, setResultIds] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/projects', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResultIds({ 
          memberId: res.data.teamInviteId, 
          guideId: res.data.guideInviteId 
      });
      setLoading(false);
    } catch (err) {
      alert('Failed to initialize project console');
      setLoading(false);
    }
  };

  if (resultIds) {
    return (
      <div style={{ maxWidth: '800px', padding: '60px' }}>
         <div className="glass-panel" style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '60px', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏆</div>
            <h2 style={{ fontSize: '32px', fontWeight: '950', marginBottom: '16px' }}>Project Console Initialized</h2>
            <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '48px' }}>Your academic workspace is ready. Secure these IDs:</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
               <div style={{ padding: '32px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '24px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '900', color: '#60a5fa', letterSpacing: '2px', marginBottom: '16px' }}>TEAM MEMBER ID</div>
                  <div style={{ fontSize: '24px', fontWeight: '950', color: 'white' }}>{resultIds.memberId}</div>
               </div>
               <div style={{ padding: '32px', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '24px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '900', color: '#a78bfa', letterSpacing: '2px', marginBottom: '16px' }}>GUIDE ID (SECURE)</div>
                  <div style={{ fontSize: '24px', fontWeight: '950', color: 'white' }}>{resultIds.guideId}</div>
               </div>
            </div>

            <button onClick={() => navigate('/dashboard')} className="btn-azure" style={{ padding: '16px 48px', borderRadius: '16px', fontWeight: '900' }}>Enter Dashboard</button>
         </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', padding: '10px 40px' }}>
      <div style={{ marginBottom: '48px' }}>
         <h1 style={{ fontSize: '40px', fontWeight: '950', margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>🧭 PROJECT INITIALIZER</h1>
         <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px', fontWeight: '700' }}>Setup your 7-point academic groundwork below.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* 1. TITLE */}
        <div className="form-section">
           <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>🧭</span> 1. PROJECT TITLE
           </label>
           <input type="text" required placeholder="Ex: Project Management System" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white', fontWeight: '700' }} />
        </div>

        {/* 2. DESCRIPTION */}
        <div className="form-section">
           <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>📝</span> 2. PROJECT DESCRIPTION
           </label>
           <textarea rows="3" required placeholder="Ex: This project helps teams manage tasks, track progress..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white', fontWeight: '700' }} />
        </div>

        {/* 3. PROBLEM STATEMENT */}
        <div className="form-section">
           <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>❓</span> 3. PROBLEM STATEMENT
           </label>
           <textarea rows="3" required placeholder="Ex: Students find it difficult to manage projects..." value={formData.problemStatement} onChange={e => setFormData({...formData, problemStatement: e.target.value})} style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white', fontWeight: '700' }} />
        </div>

        {/* 4. TECHNOLOGIES */}
        <div className="form-section">
           <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>🛠️</span> 4. TECHNOLOGIES USED
           </label>
           <input type="text" required placeholder="Ex: React, Node.js, MongoDB, Express" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white', fontWeight: '700' }} />
        </div>

        {/* 5. TIMELINE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
           <div className="form-section">
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
                 <span style={{ fontSize: '20px' }}>📅</span> START DATE
              </label>
              <input type="date" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white' }} />
           </div>
           <div className="form-section">
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
                 <span style={{ fontSize: '20px' }}>📅</span> END DATE (DEADLINE)
              </label>
              <input type="date" required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white' }} />
           </div>
        </div>

        {/* 6. TEAM MEMBERS */}
        <div className="form-section">
           <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>👥</span> 6. TEAM MEMBERS (NAMES)
           </label>
           <input type="text" required placeholder="Ex: Sandeep, Ajay, Deepak, Surya, Jaswanth" value={formData.teamMemberNames} onChange={e => setFormData({...formData, teamMemberNames: e.target.value})} style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white', fontWeight: '700' }} />
        </div>

        {/* 7. GUIDE */}
        <div className="form-section">
           <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>👨‍🏫</span> 7. GUIDE NAME
           </label>
           <input type="text" required placeholder="Ex: Dr. Ramesh Kumar" value={formData.guideName} onChange={e => setFormData({...formData, guideName: e.target.value})} style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white', fontWeight: '700' }} />
        </div>

        <button type="submit" disabled={loading} className="btn-azure" style={{ width: '100%', height: '72px', borderRadius: '24px', fontSize: '20px', fontWeight: '950', marginTop: '48px' }}>
           {loading ? 'INITIALIZING MASTER CONSOLE...' : 'CREATE ACADEMIC PROJECT'}
        </button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JoinProject() {
  const [joinId, setJoinId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Auto-detect role based on ID prefix
    const role = joinId.startsWith('GUIDE') ? 'guide' : 'member';

    try {
      const res = await axios.post('http://localhost:5000/api/projects/join', { 
          inviteId: joinId,
          role: role 
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Navigate to the newly joined project dashboard
      navigate(`/project/${res.data.project._id}?tab=workspace`);
    } catch (err) {
      alert(err.response?.data?.error || 'Invalid Identity ID. Please check and try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', padding: '40px' }}>
      <div style={{ marginBottom: '48px' }}>
         <h1 style={{ fontSize: '40px', fontWeight: '950', margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>🛡️ IDENTITY PORTAL</h1>
         <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px', fontWeight: '700' }}>Enter your credential to synchronize with the technical console.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '48px', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <p style={{ color: '#94a3b8', marginBottom: '32px', lineHeight: '1.6' }}>Enter either the <b>Team Member ID</b> or the <b>Guide ID</b> provided by the project owner to gain access.</p>
        
        <div style={{ marginBottom: '40px' }}>
          <label style={{ display: 'block', marginBottom: '16px', fontSize: '12px', fontWeight: '900', color: '#60a5fa', letterSpacing: '2px' }}>CONSOLIDATED IDENTITY ID</label>
          <input 
            type="text" 
            required 
            placeholder="Ex: TEAM_XXXX or GUIDE_XXXX"
            value={joinId} 
            onChange={e => setJoinId(e.target.value.toUpperCase())} 
            style={{ width: '100%', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: '#1e293b', color: 'white', fontSize: '24px', fontWeight: '900', letterSpacing: '4px', textAlign: 'center' }} 
          />
        </div>

        <button type="submit" disabled={loading} className="btn-azure" style={{ width: '100%', height: '72px', borderRadius: '24px', fontSize: '20px', fontWeight: '950' }}>
          {loading ? 'SYNCHRONIZING...' : 'REQUEST CONSOLE ACCESS'}
        </button>
      </form>
    </div>
  );
}

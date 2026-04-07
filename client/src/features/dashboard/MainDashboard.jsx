import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/Modal';

export default function MainDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinStep, setJoinStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('member');
  
  const [createData, setCreateData] = useState({ 
    title: '', 
    description: '', 
    problemStatement: '',
    technologies: '',
    startDate: '', 
    endDate: '',
    teamMemberNames: '',
    guideName: ''
  });
  const [inviteIdInput, setInviteIdInput] = useState('');
  const [createdProject, setCreatedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    try {
      const res = await api.get('/projects/my-projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Fetch error');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/projects', createData);
      setCreatedProject(res.data);
      setCreateData({ title: '', description: '', problemStatement: '', technologies: '', startDate: '', endDate: '', teamMemberNames: '', guideName: '' });
      fetchMyProjects(); 
      setLoading(false);
    } catch (err) {
      alert('Creation failed: ' + (err.response?.data?.error || err.message));
      setLoading(false);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/projects/join', { inviteId: inviteIdInput, role: selectedRole });
      const { project } = res.data;
      fetchMyProjects();
      navigate(`/project/${project._id}`);
    } catch (err) {
      alert('Join failed: ' + (err.response?.data?.error || 'Invalid ID'));
    }
  };

  return (
    <div style={{ padding: '60px 0', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '950', color: '#ececf1', marginBottom: '16px', letterSpacing: '-2px' }}>Project Hub</h1>
        <p style={{ color: '#94a3b8', fontSize: '20px', marginBottom: '48px', fontWeight: '600' }}>Manage your academic workspace and collaborations</p>
        
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="btn-azure"
            style={{ padding: '24px 60px', borderRadius: '24px', fontSize: '22px', fontWeight: '950', border: 'none' }}
          >
            Create Project
          </button>
          <button 
            onClick={() => { setIsJoinOpen(true); setJoinStep(1); }}
            style={{ padding: '24px 60px', background: 'rgba(255,255,255,0.02)', color: 'white', borderRadius: '24px', fontSize: '22px', fontWeight: '950', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Join Project
          </button>
        </div>
      </div>

      {projects.length > 0 && (
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '900', color: '#60a5fa', marginBottom: '40px', letterSpacing: '4px', textTransform: 'uppercase' }}>Active Strategic Consoles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '32px' }}>
            {projects.map(p => (
              <div 
                key={p._id} 
                className="glass-panel" 
                onClick={() => navigate(`/project/${p._id}`)}
                style={{ 
                    padding: '40px', 
                    cursor: 'pointer', 
                    background: 'rgba(15, 23, 42, 0.4)', 
                    borderRadius: '32px', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: '0.3s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                   <div style={{ 
                      padding: '6px 16px', 
                      borderRadius: '10px', 
                      fontSize: '11px', 
                      fontWeight: '900',
                      color: 'white',
                      letterSpacing: '1px',
                      background: p.role === 'guide' ? '#dc2626' : p.role === 'owner' ? '#1e3a8a' : '#3b82f6'
                   }}>
                     {p.role.toUpperCase()}
                   </div>
                   <div style={{ fontSize: '11px', color: '#475569', fontWeight: '900' }}>#{p._id.slice(-6)}</div>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>{p.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6', height: '48px', overflow: 'hidden' }}>{p.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                   <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>TEAM GUIDE: {p.guideName || 'Sandeep'}</span>
                   <span style={{ color: '#60a5fa', fontSize: '12px', fontWeight: '900' }}>Enter Console →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🧭 CREATE PROJECT MASTER MODAL */}
      <Modal isOpen={isCreateOpen} onClose={() => { setIsCreateOpen(false); setCreatedProject(null); }} title="Strategic Project Initialization">
        {!createdProject ? (
          <form onSubmit={handleCreate} style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>🧭</div>
                    <h2 style={{ fontSize: '24px', fontWeight: '950', margin: 0 }}>NEW ACADEMIC PROJECT</h2>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>Build your 7-point technical foundation.</p>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>🧭 1. PROJECT TITLE (Ex: Project Management System)</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} value={createData.title} onChange={e => setCreateData({...createData, title: e.target.value})} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>📝 2. DESCRIPTION (Ex: Briefly explain what it does)</label>
                    <textarea rows="3" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} value={createData.description} onChange={e => setCreateData({...createData, description: e.target.value})} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>❓ 3. PROBLEM STATEMENT (Ex: What are you solving?)</label>
                    <textarea rows="3" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} value={createData.problemStatement} onChange={e => setCreateData({...createData, problemStatement: e.target.value})} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>🛠️ 4. TECHNOLOGIES (Ex: React, Node.js, MongoDB)</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} value={createData.technologies} onChange={e => setCreateData({...createData, technologies: e.target.value})} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>📅 START DATE</label>
                        <input type="date" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} value={createData.startDate} onChange={e => setCreateData({...createData, startDate: e.target.value})} />
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>📅 END DATE</label>
                        <input type="date" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} value={createData.endDate} onChange={e => setCreateData({...createData, endDate: e.target.value})} />
                    </div>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>👥 6. TEAM MEMBERS (Ex: Sandeep, Ajay, Deepak...)</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} value={createData.teamMemberNames} onChange={e => setCreateData({...createData, teamMemberNames: e.target.value})} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>👨‍🏫 7. GUIDE NAME (Ex: Dr. Ramesh Kumar)</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} value={createData.guideName} onChange={e => setCreateData({...createData, guideName: e.target.value})} />
                </div>
            </div>

            <button type="submit" disabled={loading} className="btn-azure" style={{ width: '100%', marginTop: '40px', padding: '24px', borderRadius: '16px', fontWeight: '950', fontSize: '18px' }}>
              {loading ? 'INITIALIZING CONSOLE...' : 'GENERATE PROJECT IDS'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
             <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏆</div>
             <h2 style={{ fontSize: '28px', fontWeight: '950', marginBottom: '40px' }}>Academic ID Vault</h2>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                    <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: '900', letterSpacing: '2px', marginBottom: '12px' }}>TEAM MEMBER ID</div>
                    <div style={{ fontSize: '32px', fontWeight: '950' }}>{createdProject.teamInviteId}</div>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: '900', letterSpacing: '2px', marginBottom: '12px' }}>GUIDE ID (FOR FACULTY)</div>
                    <div style={{ fontSize: '32px', fontWeight: '950' }}>{createdProject.guideInviteId}</div>
                </div>
             </div>

             <button onClick={() => navigate(`/project/${createdProject._id}`)} className="btn-azure" style={{ width: '100%', padding: '20px', borderRadius: '16px', fontWeight: '950' }}>Enter Workspace Console</button>
          </div>
        )}
      </Modal>

      {/* 🛡️ JOIN WORKSPACE MODAL */}
      <Modal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} title="Join Strategy Console">
        {joinStep === 1 ? (
          <div style={{ padding: '20px' }}>
            <p style={{ marginBottom: '32px', color: '#94a3b8', textAlign: 'center', fontWeight: '600' }}>Please select your verified role for synchronization:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={() => { setSelectedRole('member'); setJoinStep(2); }}
                style={{ padding: '24px', background: 'rgba(59, 130, 246, 0.05)', color: 'white', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', fontWeight: '900', fontSize: '18px' }}
              >
                Join as Team Member
              </button>
              <button 
                onClick={() => { setSelectedRole('guide'); setJoinStep(2); }}
                style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.05)', color: 'white', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '20px', fontWeight: '900', fontSize: '18px' }}
              >
                Join as Faculty / Guide
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleJoin} style={{ padding: '20px' }}>
            <p style={{ marginBottom: '32px', color: '#94a3b8', textAlign: 'center', fontWeight: '600' }}>Enter the {selectedRole === 'guide' ? 'Guide' : 'Team'} ID below:</p>
            <input 
              required
              placeholder={selectedRole === 'guide' ? 'Ex: GUIDE-XXXX' : 'Ex: TEAM-XXXX'}
              style={{ width: '100%', padding: '24px', borderRadius: '16px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '28px', fontWeight: '950', letterSpacing: '4px', textAlign: 'center', marginBottom: '32px' }}
              value={inviteIdInput}
              onChange={e => setInviteIdInput(e.target.value.toUpperCase())}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setJoinStep(1)} style={{ flex: 1, padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: 'none', color: 'white', fontWeight: '900' }}>Back</button>
                <button type="submit" className="btn-azure" style={{ flex: 2, padding: '20px', borderRadius: '16px', fontWeight: '950' }}>Verify & Synchronize</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

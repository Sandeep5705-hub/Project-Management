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
    <div style={{ padding: '60px 0', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '950', color: '#1e293b', marginBottom: '16px', letterSpacing: '-2px' }}>Project Hub</h1>
        <p style={{ color: '#475569', fontSize: '20px', marginBottom: '48px', fontWeight: '600' }}>Manage your academic workspace and collaborations</p>
        
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
            style={{ padding: '24px 60px', background: 'rgba(0,0,0,0.02)', color: '#1e293b', borderRadius: '24px', fontSize: '22px', fontWeight: '950', border: '1px solid rgba(0,0,0,0.1)' }}
          >
            Join Project
          </button>
        </div>
      </div>

      {projects.length > 0 && (
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '900', color: '#60a5fa', marginBottom: '40px', letterSpacing: '4px', textTransform: 'uppercase' }}>
            Active Strategic Consoles — {projects.length} Project{projects.length > 1 ? 's' : ''}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '28px' }}>
            {projects.map(p => {
              // Read quiz progress for this project
              const quizPartial = JSON.parse(localStorage.getItem(`quiz_partial_${p._id}`) || '{"q1":0,"q2":0,"q3":0}');
              const q1Done = quizPartial.q1 >= 20;
              const q2Done = quizPartial.q2 >= 20;
              const q3Done = quizPartial.q3 >= 20;
              const phasesComplete = [q1Done, q2Done, q3Done].filter(Boolean).length;
              const perfStats = JSON.parse(localStorage.getItem(`performance_stats_${p._id}`) || '{}');
              const totalPoints = perfStats.totalScore || 0;

              return (
                <div
                  key={p._id}
                  onClick={() => navigate(`/project/${p._id}`)}
                  style={{
                    padding: '36px',
                    cursor: 'pointer',
                    background: '#ffffff',
                    borderRadius: '24px',
                    border: phasesComplete === 3
                      ? '1px solid #10b981'
                      : phasesComplete > 0
                        ? '1px solid #2563eb'
                        : '1px solid #e2e8f0',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.borderColor = phasesComplete === 3 ? '#10b981' : phasesComplete > 0 ? '#2563eb' : '#e2e8f0';
                  }}
                >
                  {/* TOP ROW — Role badge + ID */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                      padding: '5px 14px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '900',
                      color: 'white',
                      letterSpacing: '1px',
                      background: p.role === 'guide' ? '#dc2626' : p.role === 'owner' ? '#1d4ed8' : '#3b82f6'
                    }}>
                      {(p.role || 'MEMBER').toUpperCase()}
                    </div>
                    <div style={{ fontSize: '11px', color: '#334155', fontWeight: '900' }}>#{p._id?.slice(-6)}</div>
                  </div>

                  {/* PROJECT TITLE */}
                  <h3 style={{ fontSize: '22px', fontWeight: '950', color: '#1e293b', marginBottom: '10px', lineHeight: '1.3' }}>{p.title}</h3>

                  {/* DESCRIPTION */}
                  <p style={{ color: '#475569', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.description || 'No description provided.'}
                  </p>

                  {/* QUIZ PHASE BADGES */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Phase 1', done: q1Done, icon: '📘' },
                      { label: 'Phase 2', done: q2Done, icon: '⚙️' },
                      { label: 'Phase 3', done: q3Done, icon: '🛡️' },
                    ].map(ph => (
                      <div key={ph.label} style={{
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '900',
                        background: ph.done ? 'rgba(16,185,129,0.1)' : 'rgba(0,0,0,0.03)',
                        color: ph.done ? '#10b981' : '#475569',
                        border: ph.done ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(0,0,0,0.05)',
                        display: 'flex', alignItems: 'center', gap: '5px'
                      }}>
                        {ph.icon} {ph.label} {ph.done ? '✅' : '⏳'}
                      </div>
                    ))}
                    {totalPoints > 0 && (
                      <div style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)', marginLeft: 'auto' }}>
                        🏆 {totalPoints} pts
                      </div>
                    )}
                  </div>

                  {/* FOOTER — Guide + CTA */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#475569', fontWeight: '900', letterSpacing: '1px', marginBottom: '2px' }}>GUIDE</div>
                      <span style={{ fontSize: '13px', color: '#0f172a', fontWeight: '800' }}>{p.guideName || '—'}</span>
                    </div>
                    <span style={{ color: '#2563eb', fontSize: '13px', fontWeight: '900', padding: '8px 20px', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                      Enter Console →
                    </span>
                  </div>
                </div>
              );
            })}
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
                    <h2 style={{ fontSize: '24px', fontWeight: '950', margin: 0, color: '#1e293b' }}>NEW ACADEMIC PROJECT</h2>
                    <p style={{ fontSize: '14px', color: '#475569', marginTop: '8px' }}>Build your 7-point technical foundation.</p>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '12px', letterSpacing: '1px' }}>🧭 1. PROJECT TITLE (Ex: Project Management System)</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b' }} value={createData.title} onChange={e => setCreateData({...createData, title: e.target.value})} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '12px', letterSpacing: '1px' }}>📝 2. DESCRIPTION (Ex: Briefly explain what it does)</label>
                    <textarea rows="3" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b' }} value={createData.description} onChange={e => setCreateData({...createData, description: e.target.value})} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '12px', letterSpacing: '1px' }}>❓ 3. PROBLEM STATEMENT (Ex: What are you solving?)</label>
                    <textarea rows="3" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b' }} value={createData.problemStatement} onChange={e => setCreateData({...createData, problemStatement: e.target.value})} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '12px', letterSpacing: '1px' }}>🛠️ 4. TECHNOLOGIES (Ex: React, Node.js, MongoDB)</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b' }} value={createData.technologies} onChange={e => setCreateData({...createData, technologies: e.target.value})} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '12px', letterSpacing: '1px' }}>📅 START DATE</label>
                        <input type="date" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b' }} value={createData.startDate} onChange={e => setCreateData({...createData, startDate: e.target.value})} />
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '12px', letterSpacing: '1px' }}>📅 END DATE</label>
                        <input type="date" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b' }} value={createData.endDate} onChange={e => setCreateData({...createData, endDate: e.target.value})} />
                    </div>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '12px', letterSpacing: '1px' }}>👥 6. TEAM MEMBERS (Ex: Sandeep, Ajay, Deepak...)</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b' }} value={createData.teamMemberNames} onChange={e => setCreateData({...createData, teamMemberNames: e.target.value})} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '12px', letterSpacing: '1px' }}>👨‍🏫 7. GUIDE NAME (Ex: Dr. Ramesh Kumar)</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b' }} value={createData.guideName} onChange={e => setCreateData({...createData, guideName: e.target.value})} />
                </div>
            </div>

            <button type="submit" disabled={loading} className="btn-azure" style={{ width: '100%', marginTop: '40px', padding: '24px', borderRadius: '16px', fontWeight: '950', fontSize: '18px' }}>
              {loading ? 'INITIALIZING CONSOLE...' : 'GENERATE PROJECT IDS'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
             <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏆</div>
             <h2 style={{ fontSize: '28px', fontWeight: '950', marginBottom: '40px', color: '#0f172a' }}>Academic ID Vault</h2>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
                <div style={{ background: '#eff6ff', padding: '32px', borderRadius: '24px', border: '1px solid #bfdbfe' }}>
                    <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: '900', letterSpacing: '2px', marginBottom: '12px' }}>TEAM MEMBER ID</div>
                    <div style={{ fontSize: '32px', fontWeight: '950', color: '#0f172a' }}>{createdProject.teamInviteId}</div>
                </div>
                <div style={{ background: '#fef2f2', padding: '32px', borderRadius: '24px', border: '1px solid #fecaca' }}>
                    <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: '900', letterSpacing: '2px', marginBottom: '12px' }}>GUIDE ID (FOR FACULTY)</div>
                    <div style={{ fontSize: '32px', fontWeight: '950', color: '#0f172a' }}>{createdProject.guideInviteId}</div>
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
            <p style={{ marginBottom: '32px', color: '#475569', textAlign: 'center', fontWeight: '600' }}>Please select your verified role for synchronization:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={() => { setSelectedRole('member'); setJoinStep(2); }}
                style={{ padding: '24px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '20px', fontWeight: '900', fontSize: '18px' }}
              >
                Join as Team Member
              </button>
              <button 
                onClick={() => { setSelectedRole('guide'); setJoinStep(2); }}
                style={{ padding: '24px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '20px', fontWeight: '900', fontSize: '18px' }}
              >
                Join as Faculty / Guide
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleJoin} style={{ padding: '20px' }}>
            <p style={{ marginBottom: '32px', color: '#475569', textAlign: 'center', fontWeight: '600' }}>Enter the {selectedRole === 'guide' ? 'Guide' : 'Team'} ID below:</p>
            <input 
              required
              placeholder={selectedRole === 'guide' ? 'Ex: GUIDE-XXXX' : 'Ex: TEAM-XXXX'}
              style={{ width: '100%', padding: '24px', borderRadius: '16px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', color: '#1e293b', fontSize: '28px', fontWeight: '950', letterSpacing: '4px', textAlign: 'center', marginBottom: '32px' }}
              value={inviteIdInput}
              onChange={e => setInviteIdInput(e.target.value.toUpperCase())}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setJoinStep(1)} style={{ flex: 1, padding: '20px', background: 'rgba(0,0,0,0.05)', borderRadius: '16px', border: 'none', color: '#475569', fontWeight: '900' }}>Back</button>
                <button type="submit" className="btn-azure" style={{ flex: 2, padding: '20px', borderRadius: '16px', fontWeight: '950' }}>Verify & Synchronize</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

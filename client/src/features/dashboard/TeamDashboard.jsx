import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import TaskCard from './TaskCard';
import Leaderboard from './Leaderboard';
import TeamChat from './TeamChat';
import AIChatbot from './AIChatbot';
import BeginnerGuide from './BeginnerGuide';
import Notifications from './Notifications';

export default function TeamDashboard() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'workspace';
  
  const [project, setProject] = useState(null);
  const [customTasks, setCustomTasks] = useState([]);

  // High-Fidelity Team Data (Matched to Screenshot)
  const TEAM_MEMBERS = [
    { name: 'Sandeep', role: 'Owner', title: 'System Admin', points: 120, color: '#ef4444', img: 'user_avatar_sandeep_1775589890029.png' },
    { name: 'John', role: 'Guide', title: 'Lead Developer', points: 95, color: '#8b5cf6', img: 'user_avatar_john_1775589913745.png' },
    { name: 'Ananya', role: 'Member', title: 'Academic Guide', points: 75, color: '#3b82f6', img: 'user_avatar_ananya_1775589936699.png' }
  ];

  const getDeadline = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const FIXED_PIPELINE = [
    { title: 'Uploading Files', category: 'Research', deadline: getDeadline(30), description: 'Upload research papers, links, and reference materials.' },
    { title: 'User Interviews', category: 'Research', deadline: getDeadline(35), description: 'Upload interviews, transcripts or other research notes.' },
    { title: 'PPT Submission', category: 'Design', deadline: getDeadline(45), description: 'Conceptual presentation of the system (PPT/GitHub).' },
    { title: 'Code Submission', category: 'Development', deadline: getDeadline(60), description: 'Initial implementation and module uploads.' },
    { title: 'Testing & Results', category: 'Testing', deadline: getDeadline(75), description: 'Upload unit test results and documentation.' },
    { title: 'Final Documentation', category: 'Documentation', deadline: getDeadline(90), description: 'Complete project report and final summary.' }
  ];

  useEffect(() => {
    fetchProjectData();
    const saved = localStorage.getItem(`custom_tasks_${id}`);
    if (saved) setCustomTasks(JSON.parse(saved));
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data.project);
    } catch (err) {
      console.error('Error fetching project');
    }
  };

  if (!project) return <div style={{ padding: '100px', textAlign: 'center', color: 'white', fontWeight: '900' }}>LOADING MASTER CONSOLE...</div>;

  const renderView = () => {
    switch (activeTab) {
      case 'workspace':
        return (
          <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 🏰 MASTER PROJECT TITLE PAGE HEADER */}
            <div style={{ marginBottom: '16px' }}>
                <h1 style={{ fontSize: '52px', fontWeight: '950', color: 'white', margin: 0, letterSpacing: '-2px' }}>{project.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                   <div style={{ width: '40px', height: '2px', background: '#3b82f6' }}></div>
                   <div style={{ fontSize: '12px', fontWeight: '900', color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase' }}>Academic Strategy Console</div>
                </div>
            </div>

            {/* 🎯 STRATEGIC OVERVIEW CARD */}
            <div style={{ 
                background: 'rgba(59, 130, 246, 0.05)', 
                border: '1px solid rgba(59, 130, 246, 0.1)',
                borderRadius: '32px', 
                padding: '48px',
                marginBottom: '32px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* AMBIENT GLOW */}
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: '#3b82f6', filter: 'blur(150px)', opacity: 0.1 }}></div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '64px', position: 'relative' }}>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '900', color: '#60a5fa', letterSpacing: '4px', marginBottom: '24px' }}>PROBLEM STATEMENT</div>
                        <p style={{ fontSize: '22px', color: '#ececf1', lineHeight: '1.6', margin: 0, fontWeight: '800', fontStyle: 'italic' }}>
                           "{project.problemStatement || 'Synchronize project problem statement in initializer.'}"
                        </p>
                        
                        <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '900', marginBottom: '12px', letterSpacing: '2px' }}>CORE TECHNOLOGIES</div>
                                <div style={{ color: '#fbbf24', fontSize: '16px', fontWeight: '950' }}>{project.technologies || 'N/A (Update in Create)'}</div>
                            </div>
                            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '900', marginBottom: '12px', letterSpacing: '2px' }}>VERIFIED TEAM GUIDE</div>
                                <div style={{ color: '#60a5fa', fontSize: '16px', fontWeight: '950' }}>{project.guideName || 'Faculty / Mentor Required'}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ padding: '32px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                       <div style={{ fontSize: '11px', fontWeight: '900', color: '#475569', marginBottom: '20px', letterSpacing: '3px' }}>WORKSPACE LIFECYCLE</div>
                       <div style={{ fontSize: '24px', fontWeight: '950', color: 'white' }}>
                          {new Date(project.startDate).toLocaleDateString('en-US', {month:'short', day:'numeric'})} — {new Date(project.endDate).toLocaleDateString('en-US', {month:'short', day:'numeric'})}
                       </div>
                       <div style={{ marginTop: '24px', padding: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '12px', fontSize: '11px', fontWeight: '950' }}>✅ PROGRESS AUTHENTICATION: ACTIVE</div>
                    </div>
                </div>
            </div>

            {/* 🏗️ PIPELINE MODULES */}
            {[...FIXED_PIPELINE, ...customTasks].map((module, idx) => (
              <div key={`${module.title}-${idx}`} style={{ width: '100%', maxWidth: '1200px' }}>
                <div style={{ fontSize: '10px', color: '#475569', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '6px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                   <span style={{ color: '#3b82f6', fontSize: '14px' }}>{idx + 1}</span> 
                   <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
                   {module.category} PHASE
                </div>
                <TaskCard placeholder={module} projectId={id} />
              </div>
            ))}
          </div>
        );
      case 'members':
        return (
          <div style={{ padding: '60px' }}>
            <div className="full-width-card" style={{ padding: '60px 48px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '48px' }}>
                    <div style={{ fontSize: '24px' }}>👥</div>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', margin: 0 }}>Project Team</h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    {TEAM_MEMBERS.map((m) => (
                        <div key={m.name} style={{ 
                            padding: '40px 32px', background: 'rgba(255,255,255,0.02)', 
                            borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)',
                            textAlign: 'center', position: 'relative', transition: 'transform 0.3s'
                        }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 24px auto', overflow: 'hidden', border: `4px solid ${m.color}`, boxShadow: `0 0 20px ${m.color}44` }}>
                                <img src={`./${m.img}`} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ background: m.color, color: 'white', padding: '6px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '900', display: 'inline-block', marginBottom: '16px' }}>{m.role}</div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>{m.name}</div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px', fontWeight: '700' }}>{m.title}</div>
                            <div style={{ marginTop: '32px', fontSize: '20px', fontWeight: '900' }}>
                                <span style={{ color: 'white' }}>{m.points}</span> 
                                <span style={{ color: '#64748b', marginLeft: '8px', fontSize: '15px' }}>Points</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        );
      case 'chat': return <TeamChat projectId={id} />;
      case 'ai': return <AIChatbot />;
      case 'guide':
        return (
          <div style={{ padding: '60px' }}>
             <BeginnerGuide />
          </div>
        );
      case 'leaderboard':
        return <div style={{ padding: '60px' }}><Leaderboard projectId={id} /></div>;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return (
          <div style={{ padding: '60px' }}>
            <div className="full-width-card" style={{ padding: '60px' }}>
                <h2 style={{ marginBottom: '32px' }}>⚙️ Project Settings</h2>
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p>Advanced Workspace Persistence: <span style={{ color: '#10b981', fontWeight: '800' }}>ENABLED</span></p>
                </div>
            </div>
          </div>
        );
      default:
        return <div>View Ready</div>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'white' }}>
      
      {/* HEADER */}
      {activeTab !== 'chat' && activeTab !== 'ai' && (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 60px 20px 60px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
           <h1 style={{ fontSize: '40px', fontWeight: '950', margin: 0, textTransform: 'capitalize', letterSpacing: '-1.5px' }}>
              {activeTab} <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: '900', letterSpacing: '4px', verticalAlign: 'middle', marginLeft: '16px' }}>CONSOLE</span>
           </h1>
        </div>

        {activeTab === 'workspace' && (
           <button onClick={() => {
               // 🔐 GUIDE VALIDATION VAULT
               const title = prompt("Enter Task Title:");
               if(!title) return;
               
               const deadline = prompt("Enter Deadline (YYYY-MM-DD):", "2023-12-31");
               if(!deadline) return;

               const guideId = prompt("🛡️ SECURITY CHECK: Enter Guide ID to authorize addition:");
               
               // Verification Logic
               if(guideId === project.guideInviteId) {
                const updated = [...customTasks, { title, category: 'Guide Assigned', deadline, description: 'Added by authorized Guide.' }];
                setCustomTasks(updated);
                localStorage.setItem(`custom_tasks_${id}`, JSON.stringify(updated));
                alert("✅ ACCESS GRANTED: Task has been added to the master console.");
               } else {
                alert("❌ ACCESS DENIED: Incorrect Guide ID. Unauthorized task addition rejected.");
               }
           }} className="btn-azure" style={{ borderRadius: '16px', height: '54px', padding: '0 36px', fontWeight: '950' }}>+ Add Academic Task</button>
        )}
      </div>
      )}

      {/* DYNAMIC VIEW CONTENT */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
         {renderView()}
      </div>

    </div>
  );
}

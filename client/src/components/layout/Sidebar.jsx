import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Leaderboard from '../../features/dashboard/Leaderboard';
import TeamChat from '../../features/dashboard/TeamChat';
import BeginnerGuide from '../../features/dashboard/BeginnerGuide';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: routeId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // FIXED: Check for singular '/project/' as defined in App.jsx routes
  const isProjectPage = location.pathname.includes('/project/');
  
  // Extract ID correctly from /project/:id or /guide/project/:id
  const getProjectId = () => {
    const parts = location.pathname.split('/');
    const index = parts.indexOf('project');
    return index !== -1 ? parts[index + 1] : null;
  };

  const projectId = getProjectId();
  const activeTab = searchParams.get('tab') || 'workspace';

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (projectId) {
      calculateProgress();
      const interval = setInterval(calculateProgress, 5000);
      return () => clearInterval(interval);
    }
  }, [projectId]);

  const calculateProgress = () => {
    const FIXED_COUNT = 6;
    let completed = 0;
    const phases = ['Uploading Files', 'User Interviews', 'PPT Submission', 'Code Submission', 'Testing & Results', 'Final Documentation'];
    phases.forEach(p => {
        if (localStorage.getItem(`submissions_${projectId}_${p}`)) completed++;
    });
    setProgress(Math.round((completed / FIXED_COUNT) * 100));
  };

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { id: 'workspace', icon: '📁', label: 'Project Workspace', isTab: true },
    { id: 'members', icon: '👥', label: 'Team Members', isTab: true },
    { id: 'chat', icon: '💬', label: 'Team Chat', isTab: true },
    { id: 'ai', icon: '🤖', label: 'AI Assistant', isTab: true },
    { id: 'guide', icon: '📘', label: 'Beginner Guide', isTab: true },
    { id: 'assessments', icon: '🧠', label: 'Assessments', isTab: true },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard', isTab: true },
    { id: 'notifications', icon: '🔔', label: 'Notifications', isTab: true },
    { id: 'settings', icon: '⚙️', label: 'Settings', isTab: true },
  ];

  const handleItemClick = (item) => {
    // 🛡️ AUTO-SUBMISSION MODE
    // The AssessmentSystem unmount logic handles saving progress automatically.
    
    if (item.id === 'dashboard') {
        navigate('/dashboard');
    } else if (item.isTab && projectId) {
        setSearchParams({ tab: item.id });
    }
  };

  const sidebarWidth = isProjectPage ? '320px' : '90px';

  return (
    <div style={{
      width: sidebarWidth,
      minWidth: sidebarWidth,
      height: '100vh',
      background: '#ffffff',
      backdropFilter: 'none',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      padding: isProjectPage ? '30px 20px' : '40px 0',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowY: 'auto',
      overflowX: 'hidden',
      zIndex: 100
    }}>
      {/* 🚀 LOGO */}
      <div style={{ padding: '0 20px 40px 20px', display: 'flex', alignItems: 'center', gap: '15px', alignSelf: isProjectPage ? 'flex-start' : 'center' }}>
         <div style={{ width: '40px', height: '40px', background: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)' }}>🚀</div>
         {isProjectPage && <span style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>WORKSPACE AI</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
         {menuItems.map((item) => {
           const isActive = (item.id === 'dashboard' && location.pathname === '/dashboard') || (item.isTab && activeTab.includes(item.id));
           
           // 🔐 PROGRESS LOCK LOGIC
           const isQuizTab = item.id === 'assessments';
           const quizProgress = JSON.parse(localStorage.getItem(`quiz_progress_${projectId}`) || '{"q1":true,"q2":false,"q3":false}');
           
           return (
             <div key={item.id}>
               <div
                 onClick={() => handleItemClick(item)}
                 style={{
                   padding: '16px 20px',
                   borderRadius: '16px',
                   cursor: 'pointer',
                   background: isActive ? '#eff6ff' : 'transparent',
                   color: isActive ? '#2563eb' : '#475569',
                   borderLeft: isActive ? '4px solid #2563eb' : '4px solid transparent',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: isProjectPage ? 'flex-start' : 'center',
                   gap: '15px',
                   fontSize: '14px',
                   fontWeight: '800',
                   transition: 'all 0.3s',
                   whiteSpace: 'nowrap',
                   opacity: 1
                 }}
               >
                 <span style={{ fontSize: '20px' }}>{item.icon}</span>
                 {isProjectPage && <span>{item.label}</span>}
               </div>

                {/* 🧠 SUB-MENU FOR ASSESSMENTS */}
                {isQuizTab && isProjectPage && (() => {
                  const partial = JSON.parse(localStorage.getItem(`quiz_partial_${projectId}`) || '{"q1":0,"q2":0,"q3":0}');
                  const quizLabels = [
                    'Research & IEEE',
                    'Full-Stack Dev',
                    'Testing & Viva'
                  ];
                  return (
                    <div style={{ marginLeft: '45px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '8px' }}>
                      {[1, 2, 3].map(qNum => {
                        const isUnlocked = quizProgress[`q${qNum}`];
                        const isDone = (partial[`q${qNum}`] || 0) >= 20;

                        return (
                          <div
                            key={qNum}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchParams({ tab: 'assessments' });
                            }}
                            style={{
                              fontSize: '12px',
                              color: isDone ? '#10b981' : isUnlocked ? '#475569' : 'rgba(0,0,0,0.15)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '8px',
                              fontWeight: '800',
                              transition: 'all 0.3s',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              background: isDone ? 'rgba(16,185,129,0.06)' : 'transparent'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: '7px', height: '7px', borderRadius: '50%',
                                background: isDone ? '#10b981' : isUnlocked ? '#2563eb' : 'rgba(0,0,0,0.08)',
                                flexShrink: 0
                              }} />
                              <span>Q{qNum}: {quizLabels[qNum - 1]}</span>
                            </div>
                            <span style={{ fontSize: '10px', opacity: 0.8 }}>
                              {isDone ? '✅' : isUnlocked ? '⏳' : '🔒'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
             </div>
           );
         })}
      </div>

      <div style={{ marginTop: 'auto', padding: isProjectPage ? '20px' : '0', textAlign: 'center', borderTop: isProjectPage ? '1px solid #e2e8f0' : 'none' }}>
        <div 
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          style={{ cursor: 'pointer', opacity: 0.6, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', fontWeight: '800', justifyContent: isProjectPage ? 'flex-start' : 'center' }}
        >
          <span>🚪</span> {isProjectPage && 'Logout'}
        </div>
      </div>
    </div>
  );
}

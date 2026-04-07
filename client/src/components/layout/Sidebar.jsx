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
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard', isTab: true },
    { id: 'notifications', icon: '🔔', label: 'Notifications', isTab: true },
    { id: 'settings', icon: '⚙️', label: 'Settings', isTab: true },
  ];

  const handleItemClick = (item) => {
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
      background: 'rgba(15, 23, 42, 0.98)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255,255,255,0.05)',
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
         <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>🚀</div>
         {isProjectPage && <span style={{ fontSize: '18px', fontWeight: '900', color: 'white' }}>WORKSPACE AI</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
         {menuItems.map((item) => {
           const isActive = (item.id === 'dashboard' && location.pathname === '/dashboard') || (item.isTab && activeTab === item.id);
           
           return (
             <div
               key={item.id}
               onClick={() => handleItemClick(item)}
               style={{
                 padding: '16px 20px',
                 borderRadius: '16px',
                 cursor: 'pointer',
                 background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                 color: isActive ? '#3b82f6' : '#94a3b8',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: isProjectPage ? 'flex-start' : 'center',
                 gap: '15px',
                 fontSize: '14px',
                 fontWeight: '800',
                 transition: 'all 0.3s',
                 whiteSpace: 'nowrap'
               }}
             >
               <span style={{ fontSize: '20px' }}>{item.icon}</span>
               {isProjectPage && <span>{item.label}</span>}
             </div>
           );
         })}
      </div>

      <div style={{ marginTop: 'auto', padding: isProjectPage ? '20px' : '0', textAlign: 'center', borderTop: isProjectPage ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
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

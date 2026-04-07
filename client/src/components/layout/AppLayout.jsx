import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  const location = useLocation();
  
  // FIXED: Check for singular '/project/' as defined in App.jsx routes
  const isProjectPage = location.pathname.includes('/project/');
  
  return (
    <div style={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100vw', 
        background: '#020617', 
        overflow: 'hidden' 
    }}>
      {/* Sidebar is a direct flex child, pushing content correctly */}
      <Sidebar />
      
      {/* Content area fills the remaining space perfectly */}
      <div style={{ 
          flex: 1, 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: '#020617'
      }}>
        {children}
      </div>
    </div>
  );
}

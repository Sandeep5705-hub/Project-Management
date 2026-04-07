import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AppLayout from './components/layout/AppLayout';
import MainDashboard from './features/dashboard/MainDashboard';
import TeamDashboard from './features/dashboard/TeamDashboard';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              <MainDashboard />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/project/:id" element={
          <ProtectedRoute>
            <AppLayout>
              <TeamDashboard />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/guide/project/:id" element={
          <ProtectedRoute>
            <AppLayout>
              <TeamDashboard />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/projects" element={<Navigate to="/dashboard" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;

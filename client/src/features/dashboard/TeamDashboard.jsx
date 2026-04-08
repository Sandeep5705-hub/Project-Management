import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import TaskCard from './TaskCard';
import Leaderboard from './Leaderboard';
import TeamChat from './TeamChat';
import AIChatbot from './AIChatbot';
import BeginnerGuide from './BeginnerGuide';
import Notifications from './Notifications';
import AssessmentSystem from './AssessmentSystem';
import AssessmentsDashboard from './AssessmentsDashboard';

const TAB_LABELS = {
  workspace: 'Workspace',
  members: 'Team Members',
  chat: 'Team Chat',
  ai: 'AI Assistant',
  guide: 'Beginner Guide',
  assessments: 'Assessments',
  assessments_q1: 'Quiz 1 — Research & IEEE',
  assessments_q2: 'Quiz 2 — Full-Stack Dev',
  assessments_q3: 'Quiz 3 — Testing & Viva',
  leaderboard: 'Performance',
  notifications: 'Notifications',
  settings: 'Settings',
};

const MEMBER_AVATARS = [
  { color: '#ef4444', img: 'user_avatar_sandeep_1775589890029.png' },
  { color: '#3b82f6', img: 'user_avatar_john_1775589913745.png' },
  { color: '#8b5cf6', img: 'user_avatar_ananya_1775589936699.png' },
  { color: '#10b981', img: 'user_avatar_john_1775589913745.png' },
  { color: '#f59e0b', img: 'user_avatar_ananya_1775589936699.png' },
];

export default function TeamDashboard() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'workspace';

  const [project, setProject] = useState(null);
  const [customTasks, setCustomTasks] = useState([]);

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
      // Fallback to localStorage if API fails
      try {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const proj = projects.find(p => p._id === id || p.id === id);
        if (proj) setProject(proj);
      } catch (_) {}
      console.error('Error fetching project');
    }
  };

  if (!project) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '16px', color: '#1e293b' }}>
      <div style={{ fontSize: '48px', animation: 'pulse 1.5s infinite' }}>🚀</div>
      <div style={{ fontWeight: '950', fontSize: '20px', letterSpacing: '3px', color: '#475569' }}>LOADING WORKSPACE...</div>
    </div>
  );

  // Get team member names from project data
  const memberNames = project.teamMemberNames || project.teamMembers || [];

  const renderView = () => {
    switch (activeTab) {
      // ─────────────────────────────────────────────────────────────────────
      case 'workspace':
        return (
          <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* PROJECT TITLE */}
            <div style={{ marginBottom: '8px' }}>
              <h1 style={{ fontSize: '52px', fontWeight: '950', color: '#0f172a', margin: 0, letterSpacing: '-2px' }}>{project.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                <div style={{ width: '40px', height: '2px', background: '#2563eb' }} />
                <div style={{ fontSize: '12px', fontWeight: '900', color: '#475569', letterSpacing: '2px', textTransform: 'uppercase' }}>Academic Strategy Console</div>
              </div>
            </div>

            {/* OVERVIEW CARD */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '32px', padding: '48px',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '64px', position: 'relative' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '900', color: '#2563eb', letterSpacing: '4px', marginBottom: '20px' }}>PROBLEM STATEMENT</div>
                  <p style={{ fontSize: '20px', color: '#0f172a', lineHeight: '1.7', margin: 0, fontWeight: '800', fontStyle: 'italic' }}>
                    "{project.problemStatement || 'No problem statement defined.'}"
                  </p>
                  <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '10px', color: '#475569', fontWeight: '900', marginBottom: '10px', letterSpacing: '2px' }}>CORE TECHNOLOGIES</div>
                      <div style={{ color: '#0f172a', fontSize: '15px', fontWeight: '950' }}>{project.technologies || 'N/A'}</div>
                    </div>
                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '10px', color: '#475569', fontWeight: '900', marginBottom: '10px', letterSpacing: '2px' }}>PROJECT GUIDE</div>
                      <div style={{ color: '#2563eb', fontSize: '15px', fontWeight: '950' }}>{project.guideName || 'Not Assigned'}</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '28px', border: '1px solid #e2e8f0', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '900', color: '#475569', letterSpacing: '3px' }}>WORKSPACE LIFECYCLE</div>
                  <div style={{ fontSize: '22px', fontWeight: '950', color: '#0f172a' }}>
                    {project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
                    {' — '}
                    {project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
                  </div>
                  <div style={{ padding: '10px', background: '#eff6ff', color: '#2563eb', borderRadius: '12px', fontSize: '11px', fontWeight: '950', border: '1px solid #bfdbfe' }}>✅ PROGRESS AUTHENTICATION: ACTIVE</div>
                </div>
              </div>
            </div>

            {/* PIPELINE MODULES */}
            {[...FIXED_PIPELINE, ...customTasks].map((module, idx) => (
              <div key={`${module.title}-${idx}`} style={{ width: '100%', maxWidth: '1200px' }}>
                <div style={{ fontSize: '10px', color: '#475569', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '6px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ color: '#2563eb', fontSize: '14px' }}>{idx + 1}</span>
                  <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                  {module.category} PHASE
                </div>
                <TaskCard placeholder={module} projectId={id} />
              </div>
            ))}
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      case 'members':
        return (
          <div style={{ padding: '48px 60px' }}>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '40px', fontWeight: '950', color: '#0f172a', margin: 0, letterSpacing: '-1.5px' }}>Team Members</h1>
              <p style={{ color: '#475569', marginTop: '10px', fontSize: '16px', fontWeight: '600' }}>
                {memberNames.length > 0 ? `${memberNames.length} members contributing to this project.` : 'Team members will appear here.'}
              </p>
            </div>

            {/* Team Member Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
              {memberNames.length > 0 ? memberNames.map((name, i) => {
                const avatar = MEMBER_AVATARS[i % MEMBER_AVATARS.length];
                const perfStats = JSON.parse(localStorage.getItem(`performance_stats_${id}`) || '{}');
                const pts = perfStats.totalScore || 0;
                const quizzesDone = perfStats.quizzesDone || 0;
                return (
                  <div key={name} style={{
                    padding: '40px 32px', background: '#ffffff',
                    borderRadius: '24px', border: `1px solid #e2e8f0`,
                    textAlign: 'center', transition: 'transform 0.3s',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{ width: '96px', height: '96px', borderRadius: '50%', margin: '0 auto 20px auto', overflow: 'hidden', border: `3px solid #f8fafc`, boxShadow: `0 0 20px rgba(0,0,0,0.05)`, background: `#f8fafc`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ background: i === 0 ? '#eff6ff' : '#f8fafc', color: i === 0 ? '#2563eb' : '#475569', padding: '5px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: '900', display: 'inline-block', marginBottom: '14px', border: `1px solid ${i === 0 ? '#bfdbfe' : '#e2e8f0'}` }}>
                      {i === 0 ? 'Team Leader' : 'Member'}
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: '950', color: '#0f172a', marginBottom: '4px' }}>{name}</div>
                    <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700', marginBottom: '24px' }}>Academic Collaborator</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                      <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '10px', color: '#475569', fontWeight: '800', letterSpacing: '1px', marginBottom: '4px' }}>QUIZ PTS</div>
                        <div style={{ fontSize: '20px', fontWeight: '950', color: i === 0 ? '#10b981' : '#0f172a' }}>{i === 0 ? pts : '—'}</div>
                      </div>
                      <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '10px', color: '#475569', fontWeight: '800', letterSpacing: '1px', marginBottom: '4px' }}>QUIZZES</div>
                        <div style={{ fontSize: '20px', fontWeight: '950', color: '#1e293b' }}>{i === 0 ? quizzesDone : '—'}</div>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                // Fallback when no names available
                <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', color: '#475569' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
                  <div style={{ fontWeight: '700', fontSize: '18px' }}>No team members found.</div>
                  <div style={{ fontSize: '14px', marginTop: '8px' }}>Members are added during project creation.</div>
                </div>
              )}
            </div>

            {/* Guide Card */}
            {project.guideName && (
              <div style={{ marginTop: '32px', padding: '32px 40px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0, border: '2px solid #bfdbfe' }}>📘</div>
                <div>
                  <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: '900', letterSpacing: '2px', marginBottom: '4px' }}>PROJECT GUIDE / MENTOR</div>
                  <div style={{ fontSize: '22px', fontWeight: '950', color: '#0f172a' }}>{project.guideName}</div>
                  <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700', marginTop: '2px' }}>Faculty Advisor • Academic Supervisor</div>
                </div>
                <div style={{ marginLeft: 'auto', padding: '8px 20px', background: 'rgba(16,185,129,0.1)', color: '#10b981', borderRadius: '10px', fontWeight: '900', fontSize: '12px', border: '1px solid rgba(16,185,129,0.2)' }}>
                  ✅ Authorized
                </div>
              </div>
            )}
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      case 'chat': return <TeamChat projectId={id} />;
      case 'ai': return <AIChatbot />;
      case 'guide': return <div style={{ padding: '40px' }}><BeginnerGuide /></div>;
      case 'leaderboard': return <Leaderboard projectId={id} />;
      case 'notifications': return <Notifications />;

      case 'assessments':
        return <AssessmentsDashboard projectId={id} onStartQuiz={(qNum) => setSearchParams({ tab: `assessments_q${qNum}` })} />;
      case 'assessments_q1':
        return <AssessmentSystem quizNum={1} projectId={id} onFinish={() => setSearchParams({ tab: 'assessments' })} />;
      case 'assessments_q2':
        return <AssessmentSystem quizNum={2} projectId={id} onFinish={() => setSearchParams({ tab: 'assessments' })} />;
      case 'assessments_q3':
        return <AssessmentSystem quizNum={3} projectId={id} onFinish={() => setSearchParams({ tab: 'assessments' })} />;

      // ─────────────────────────────────────────────────────────────────────
      case 'settings':
        return (
          <div style={{ padding: '48px 60px', maxWidth: '800px' }}>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '40px', fontWeight: '950', color: '#1e293b', margin: 0, letterSpacing: '-1.5px' }}>Settings</h1>
              <p style={{ color: '#475569', marginTop: '10px', fontSize: '16px', fontWeight: '600' }}>Project configuration and data management.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Project Info */}
              <div style={{ padding: '32px', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>PROJECT INFORMATION</div>
                {[
                  { label: 'Project Title', value: project.title },
                  { label: 'Guide Name', value: project.guideName || 'Not set' },
                  { label: 'Technologies', value: project.technologies || 'Not set' },
                  { label: 'Team Members', value: memberNames.join(', ') || 'Not set' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#475569', fontWeight: '800', fontSize: '14px' }}>{row.label}</span>
                    <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '14px', maxWidth: '60%', textAlign: 'right' }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Data Management */}
              <div style={{ padding: '32px', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>ASSESSMENT DATA</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ color: '#0f172a', fontWeight: '800', fontSize: '15px' }}>Quiz Progress</div>
                    <div style={{ color: '#475569', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>Resets quiz completion and scores</div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all quiz data? This cannot be undone.')) {
                        localStorage.removeItem(`quiz_progress_${id}`);
                        localStorage.removeItem(`quiz_partial_${id}`);
                        localStorage.removeItem(`performance_stats_${id}`);
                        alert('✅ Quiz data reset successfully. Refresh to see changes.');
                      }
                    }}
                    style={{ padding: '10px 24px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', fontWeight: '900', cursor: 'pointer', fontSize: '13px' }}
                  >
                    Reset Quiz Data
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
                  <div>
                    <div style={{ color: '#1e293b', fontWeight: '800', fontSize: '15px' }}>Workspace Data</div>
                    <div style={{ color: '#475569', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>Advanced workspace persistence</div>
                  </div>
                  <span style={{ color: '#10b981', fontWeight: '900', fontSize: '13px', padding: '6px 16px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div style={{ padding: '60px', color: '#64748b', fontWeight: '700' }}>View loading...</div>;
    }
  };

  const tabLabel = TAB_LABELS[activeTab] || activeTab;
  const isQuizActive = activeTab.startsWith('assessments_q');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#1e293b' }}>

      {/* HEADER — hidden for chat & ai */}
      {activeTab !== 'chat' && activeTab !== 'ai' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 60px 20px 60px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '950', margin: 0, letterSpacing: '-1px', color: '#0f172a' }}>
              {tabLabel}
            </h1>
            <span style={{ fontSize: '10px', color: '#2563eb', fontWeight: '900', letterSpacing: '4px', verticalAlign: 'middle', padding: '4px 12px', background: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
              CONSOLE
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Add Task — only in workspace */}
            {activeTab === 'workspace' && (
              <button
                onClick={() => {
                  const title = prompt("Enter Task Title:");
                  if (!title) return;
                  const deadline = prompt("Enter Deadline (YYYY-MM-DD):", "2025-12-31");
                  if (!deadline) return;
                  const guideId = prompt("🛡️ SECURITY CHECK: Enter Guide ID to authorize:");
                  if (guideId === project.guideInviteId) {
                    const updated = [...customTasks, { title, category: 'Guide Assigned', deadline, description: 'Added by authorized Guide.' }];
                    setCustomTasks(updated);
                    localStorage.setItem(`custom_tasks_${id}`, JSON.stringify(updated));
                    alert("✅ ACCESS GRANTED: Task has been added to the master console.");
                  } else {
                    alert("❌ ACCESS DENIED: Incorrect Guide ID.");
                  }
                }}
                className="btn-azure"
                style={{ borderRadius: '14px', height: '48px', padding: '0 28px', fontWeight: '950', fontSize: '14px' }}
              >
                + Add Academic Task
              </button>
            )}

            {/* Back to Assessments — shown when inside a quiz */}
            {isQuizActive && (
              <button
                onClick={() => setSearchParams({ tab: 'assessments' })}
                style={{ padding: '10px 24px', background: '#eff6ff', color: '#1e3a8a', border: '1px solid #bfdbfe', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '13px' }}
              >
                ← Back to Assessments
              </button>
            )}
          </div>
        </div>
      )}

      {/* VIEW CONTENT */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderView()}
      </div>

    </div>
  );
}

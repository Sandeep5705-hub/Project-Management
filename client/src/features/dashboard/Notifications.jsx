import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const STATIC_NOTIFICATIONS = [
  { id: 'n1', title: 'Project Created', desc: 'Your academic project workspace has been initialized.', time: 'Earlier', icon: '🚀', color: '#3b82f6', dot: '#3b82f6', read: true },
  { id: 'n2', title: 'Beginner Guide Available', desc: 'Access the step-by-step guide from the sidebar.', time: 'Earlier', icon: '📘', color: '#8b5cf6', dot: '#8b5cf6', read: true },
];

const QUIZ_META = {
  1: { name: 'Research & IEEE', icon: '📘', color: '#f59e0b' },
  2: { name: 'Full-Stack Development', icon: '⚙️', color: '#3b82f6' },
  3: { name: 'Testing & Viva', icon: '🛡️', color: '#10b981' }
};

export default function Notifications() {
  const { id: projectId } = useParams();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const buildNotifications = () => {
      const dynamic = [];

      // Check each quiz for submission
      [1, 2, 3].map(qNum => {
        const perfStats = JSON.parse(localStorage.getItem(`performance_stats_${projectId}`) || '{}');
        const quizData = perfStats[`quiz${qNum}`];
        if (quizData) {
          dynamic.push({
            id: `quiz_${qNum}`,
            title: `Quiz ${qNum} Submitted ✅`,
            desc: `${QUIZ_META[qNum].name} — Score: ${quizData.score} pts | Accuracy: ${quizData.accuracy}% | Submitted on ${quizData.date}`,
            time: quizData.date || 'Today',
            icon: QUIZ_META[qNum].icon,
            color: QUIZ_META[qNum].color,
            dot: QUIZ_META[qNum].color,
            read: false,
            isQuiz: true
          });
        }
      });

      // Check quiz unlocks
      const quizProgress = JSON.parse(localStorage.getItem(`quiz_progress_${projectId}`) || '{"q1":true,"q2":false,"q3":false}');
      if (quizProgress.q2) {
        dynamic.push({
          id: 'unlock_q2',
          title: 'Phase 2 Unlocked 🔓',
          desc: 'Full-Stack Development quiz is now available. Complete Quiz 1 was required.',
          time: 'Recently',
          icon: '🔓', color: '#3b82f6', dot: '#3b82f6', read: true
        });
      }
      if (quizProgress.q3) {
        dynamic.push({
          id: 'unlock_q3',
          title: 'Phase 3 Unlocked 🔓',
          desc: 'Testing & Viva quiz is now available. Excellent progress!',
          time: 'Recently',
          icon: '🔓', color: '#10b981', dot: '#10b981', read: true
        });
      }

      setNotifications([...dynamic, ...STATIC_NOTIFICATIONS]);
    };

    buildNotifications();
    const interval = setInterval(buildNotifications, 3000);
    return () => clearInterval(interval);
  }, [projectId]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 60px' }}>
      <div style={{ width: '100%', maxWidth: '580px' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '950', color: 'white', margin: 0 }}>Notifications</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px', fontWeight: '600' }}>
              Real-time updates from your project activity.
            </p>
          </div>
          {unreadCount > 0 && (
            <div style={{ padding: '8px 20px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', borderRadius: '12px', fontWeight: '950', fontSize: '14px', border: '1px solid rgba(59,130,246,0.2)' }}>
              {unreadCount} New
            </div>
          )}
        </div>

        {/* NOTIFICATION LIST */}
        <div style={{ background: 'rgba(15,23,42,0.6)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#475569' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
              <div style={{ fontWeight: '700' }}>No notifications yet</div>
            </div>
          ) : (
            notifications.map((n, idx) => (
              <div key={n.id} style={{
                padding: '24px 28px',
                borderBottom: idx === notifications.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                display: 'flex', gap: '18px', alignItems: 'flex-start',
                background: n.read ? 'transparent' : `${n.color}08`,
                transition: 'background 0.2s', cursor: 'pointer'
              }}>
                {/* ICON */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                  background: `${n.color}12`,
                  border: `1px solid ${n.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', position: 'relative'
                }}>
                  {n.icon}
                  {!n.read && (
                    <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', background: n.dot, borderRadius: '50%', border: '2px solid #0f172a' }} />
                  )}
                </div>

                {/* CONTENT */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '12px' }}>
                    <div style={{ fontWeight: '900', color: 'white', fontSize: '15px' }}>{n.title}</div>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700', flexShrink: 0 }}>{n.time}</div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', fontWeight: '600' }}>{n.desc}</div>
                  {n.isQuiz && (
                    <div style={{ marginTop: '8px' }}>
                      <span style={{ padding: '3px 10px', background: `${n.color}15`, color: n.color, borderRadius: '6px', fontSize: '11px', fontWeight: '900', border: `1px solid ${n.color}25` }}>
                        Quiz Submitted
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* TIP */}
        <div style={{ marginTop: '20px', padding: '16px 20px', background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.08)', borderRadius: '14px', fontSize: '12px', color: '#475569', fontWeight: '700' }}>
          💡 Quiz submission notifications appear here automatically after each assessment is completed.
        </div>
      </div>
    </div>
  );
}

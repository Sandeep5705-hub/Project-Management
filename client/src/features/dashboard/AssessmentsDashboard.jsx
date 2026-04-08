import React, { useState, useEffect } from 'react';

const QUIZ_CARDS = [
  {
    id: 1,
    title: "Quiz 1: Research Papers + IEEE + Problem Statement",
    desc: "20 Questions",
    icon: "📘",
    phase: "Phase 1",
    total: 20
  },
  {
    id: 2,
    title: "Quiz 2: Full-Stack Development",
    desc: "React + Node.js + MongoDB • 20 Questions",
    icon: "⚙️",
    phase: "Phase 2",
    total: 20,
    lockText: "🔒 Unlock after completing Quiz 1"
  },
  {
    id: 3,
    title: "Quiz 3: Testing, Security & Final Viva",
    desc: "Professional Deployment • 20 Questions",
    icon: "🛡️",
    phase: "Phase 3",
    total: 20,
    lockText: "🔒 Unlock after completing Quiz 2"
  }
];

export default function AssessmentsDashboard({ projectId, onStartQuiz }) {
  // ── use state so the page reacts to localStorage changes ──
  const [quizProgress, setQuizProgress] = useState(() =>
    JSON.parse(localStorage.getItem(`quiz_progress_${projectId}`) || '{"q1":true,"q2":false,"q3":false}')
  );
  const [partialProgress, setPartialProgress] = useState(() =>
    JSON.parse(localStorage.getItem(`quiz_partial_${projectId}`) || '{"q1":0,"q2":0,"q3":0}')
  );

  // Refresh from localStorage every 2 seconds so lock/unlock syncs
  useEffect(() => {
    const interval = setInterval(() => {
      setQuizProgress(JSON.parse(localStorage.getItem(`quiz_progress_${projectId}`) || '{"q1":true,"q2":false,"q3":false}'));
      setPartialProgress(JSON.parse(localStorage.getItem(`quiz_partial_${projectId}`) || '{"q1":0,"q2":0,"q3":0}'));
    }, 2000);
    return () => clearInterval(interval);
  }, [projectId]);

  const renderCard = (quiz, isLarge = false) => {
    const isUnlocked = quizProgress[`q${quiz.id}`];
    const completedCount = partialProgress[`q${quiz.id}`] || 0;
    const isCompleted = completedCount >= quiz.total;
    const progressPercent = Math.min((completedCount / quiz.total) * 100, 100);

    return (
      <div key={quiz.id} style={{
        background: isCompleted
          ? '#f0fdf4'
          : isUnlocked
            ? '#ffffff'
            : '#f8fafc',
        border: isCompleted
          ? '1px solid #6ee7b7'
          : isUnlocked
            ? '1px solid #bfdbfe'
            : '1px solid #e2e8f0',
        borderRadius: '24px',
        padding: isLarge ? '40px 48px' : '32px',
        position: 'relative',
        display: 'flex',
        flexDirection: isLarge ? 'row' : 'column',
        alignItems: isLarge ? 'center' : 'flex-start',
        gap: isLarge ? '40px' : '24px',
        gridColumn: isLarge ? 'span 2' : 'span 1',
        boxShadow: isCompleted
          ? '0 4px 6px -1px rgba(16, 185, 129, 0.1)'
          : isUnlocked
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            : 'none',
        opacity: isUnlocked ? 1 : 0.55,
        transition: 'all 0.3s'
      }}>

        {/* ICON + PHASE BADGE */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: isLarge ? '96px' : '76px',
            height: isLarge ? '96px' : '76px',
            background: isCompleted
              ? '#d1fae5'
              : '#eff6ff',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: isLarge ? '44px' : '34px'
          }}>
            {isCompleted ? '✅' : quiz.icon}
          </div>
          <div style={{
            background: isCompleted ? '#10b981' : isUnlocked ? '#2563eb' : '#94a3b8',
            padding: '4px 12px', borderRadius: '8px',
            fontSize: '10px', fontWeight: '900', color: 'white', letterSpacing: '0.5px'
          }}>
            {isCompleted ? '✓ Done' : isUnlocked ? quiz.phase : '🔒 Locked'}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{
              fontSize: isLarge ? '26px' : '20px',
              fontWeight: '900', color: '#1e3a8a', margin: 0, lineHeight: '1.3'
            }}>
              {quiz.title}
            </h3>
            {isUnlocked && (
              <span style={{
                fontSize: '12px', fontWeight: '800',
                color: isCompleted ? '#10b981' : '#2563eb',
                background: isCompleted ? '#d1fae5' : '#eff6ff',
                padding: '4px 12px', borderRadius: '8px', flexShrink: 0
              }}>
                {completedCount}/{quiz.total} Completed
              </span>
            )}
          </div>

          <p style={{
            color: isUnlocked ? '#475569' : '#94a3b8',
            fontSize: '14px', marginBottom: isUnlocked ? '20px' : '8px',
            fontWeight: '600'
          }}>
            {isUnlocked ? quiz.desc : quiz.lockText}
          </p>

          {isUnlocked && (
            <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                width: `${progressPercent}%`, height: '100%',
                background: isCompleted
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                transition: '1s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '3px'
              }} />
            </div>
          )}
        </div>

        {/* ACTION BUTTON */}
        <div style={{ flexShrink: 0, width: isLarge ? 'auto' : '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {isCompleted ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: isLarge ? 'auto' : '100%' }}>
              {/* Completed badge */}
              <div style={{
                padding: '14px 32px',
                background: '#d1fae5',
                color: '#10b981', borderRadius: '12px',
                fontWeight: '950', fontSize: '14px',
                border: '1px solid #6ee7b7',
                textAlign: 'center', whiteSpace: 'nowrap'
              }}>
                Completed ✅
              </div>
              {/* Retake Quiz button */}
              <button
                onClick={() => {
                  if (window.confirm(`Reset Quiz ${quiz.id} and retake? Your previous score will be cleared.`)) {
                    const partial = JSON.parse(localStorage.getItem(`quiz_partial_${projectId}`) || '{"q1":0,"q2":0,"q3":0}');
                    partial[`q${quiz.id}`] = 0;
                    localStorage.setItem(`quiz_partial_${projectId}`, JSON.stringify(partial));
                    const perf = JSON.parse(localStorage.getItem(`performance_stats_${projectId}`) || '{}');
                    delete perf[`quiz${quiz.id}`];
                    if (perf.quizzesDone > 0) perf.quizzesDone -= 1;
                    if (perf.totalScore >= quiz.total * 10) perf.totalScore -= quiz.total * 10;
                    localStorage.setItem(`performance_stats_${projectId}`, JSON.stringify(perf));
                    onStartQuiz(quiz.id);
                  }
                }}
                style={{
                  padding: '10px 24px', borderRadius: '12px',
                  fontWeight: '900', fontSize: '13px',
                  cursor: 'pointer',
                  width: isLarge ? 'auto' : '100%',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#64748b'
                }}
              >
                🔄 Retake Quiz
              </button>
            </div>
          ) : (
            <button
              onClick={() => isUnlocked && onStartQuiz(quiz.id)}
              disabled={!isUnlocked}
              className="btn-azure"
              style={{
                padding: '16px 40px', borderRadius: '14px',
                fontWeight: '950', fontSize: '15px',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                width: isLarge ? 'auto' : '100%',
                minWidth: isLarge ? '180px' : 'unset',
                opacity: isUnlocked ? 1 : 0.4,
                background: isUnlocked
                  ? '#2563eb'
                  : '#e2e8f0',
                border: isUnlocked ? 'none' : '1px solid #cbd5e1',
                color: isUnlocked ? 'white' : '#64748b'
              }}
            >
              {isUnlocked ? '▶  Take Quiz' : 'Locked 🔒'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const totalPoints = QUIZ_CARDS.reduce((acc, q) => {
    const done = (partialProgress[`q${q.id}`] || 0) >= q.total;
    return acc + (done ? 200 : 0);
  }, 0);
  const quizzesDone = QUIZ_CARDS.filter(q => (partialProgress[`q${q.id}`] || 0) >= q.total).length;

  return (
    <div style={{ padding: '48px 60px', maxWidth: '1200px' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '44px', fontWeight: '950', color: '#1e3a8a', margin: 0, letterSpacing: '-2px' }}>
          Assessments
        </h1>
        <p style={{ color: '#475569', fontSize: '18px', marginTop: '10px', fontWeight: '600' }}>
          Complete all 3 phases to unlock full project validation.
        </p>
      </div>

      {/* STATS BAR */}
      <div style={{
        display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap'
      }}>
        {[
          { label: 'Phases Completed', value: `${quizzesDone} / 3`, color: '#3b82f6' },
          { label: 'Total Points Earned', value: `${totalPoints} pts`, color: '#10b981' },
          { label: 'Questions Per Phase', value: '20 MCQs', color: '#f59e0b' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '14px 24px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: stat.color }} />
            <span style={{ color: '#475569', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>
              {stat.label}
            </span>
            <span style={{ color: '#0f172a', fontSize: '14px', fontWeight: '950' }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* QUIZ CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        {renderCard(QUIZ_CARDS[0], true)}
        {renderCard(QUIZ_CARDS[1])}
        {renderCard(QUIZ_CARDS[2])}
      </div>

      {/* FOOTER NOTE */}
      <div style={{
        marginTop: '32px', padding: '20px 28px',
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '16px', color: '#1e3a8a', fontSize: '13px', fontWeight: '700'
      }}>
        💡 <strong style={{ color: '#60a5fa' }}>Tip:</strong> Complete each quiz in order. Switching tabs mid-quiz will auto-submit your current progress. Points are added to your team leaderboard after each submission.
      </div>
    </div>
  );
}

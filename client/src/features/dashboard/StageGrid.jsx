import React from 'react';

export default function StageGrid({ tasks }) {
  const stages = ['Research', 'Design', 'Development', 'Testing'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', overflowX: 'auto', paddingBottom: '20px' }}>
      {stages.map(stage => {
        const stageTasks = tasks.filter(t => t.stage === stage);
        return (
          <div key={stage} style={{ minWidth: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a' }}>{stage}</h3>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#eff6ff', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                {stageTasks.length}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stageTasks.map(task => (
                <div key={task._id} className="glass-panel" style={{ padding: '20px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px', color: '#1e3a8a' }}>{task.title}</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '8px', 
                      fontSize: '11px', 
                      fontWeight: 'bold',
                      background: task.difficulty === 'High' ? '#fee2e2' : task.difficulty === 'Medium' ? '#fef3c7' : '#ecfdf5',
                      color: task.difficulty === 'High' ? '#dc2626' : task.difficulty === 'Medium' ? '#d97706' : '#059669'
                    }}>
                      {task.difficulty}
                    </span>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '8px', 
                      fontSize: '11px', 
                      fontWeight: 'bold',
                      background: task.quizStatus === 'Quiz Passed' ? '#10b981' : '#cbd5e1',
                      color: 'white'
                    }}>
                      {task.quizStatus}
                    </span>
                  </div>
                </div>
              ))}
              {stageTasks.length === 0 && (
                <div style={{ padding: '32px', textAlign: 'center', border: '2px dashed #e2e8f0', borderRadius: '16px', color: '#94a3b8', fontSize: '13px' }}>
                  No tasks assigned
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

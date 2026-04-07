import React from 'react';
import TaskCard from './TaskCard';

export default function KanbanColumn({ title, tasks, onTaskClick }) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <h3 className="column-title">{title}</h3>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{tasks.length}</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} onClick={onTaskClick} />
          ))
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '20px', color: '#475569', fontSize: '14px' }}>
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
}

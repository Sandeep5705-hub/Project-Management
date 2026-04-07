import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import api from '../../services/api';

export default function TaskModal({ isOpen, onClose, task, projectId, userRole, onRefresh, categories }) {
  const [submission, setSubmission] = useState({ githubLink: '', fileName: '' });
  const [newTask, setNewTask] = useState({ title: '', category: 'Research', description: '', deadline: '' });

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { ...newTask, projectId });
      setNewTask({ title: '', category: 'Research', description: '', deadline: '' });
      onRefresh();
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add task');
    }
  };

  const handleSubmitWork = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/tasks/${task._id}/submit`, submission);
      setSubmission({ githubLink: '', fileName: '' });
      onRefresh();
      onClose();
    } catch (err) {
      alert('Submission failed');
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      await api.patch(`/tasks/${task._id}`, { status: newStatus });
      onRefresh();
      onClose();
    } catch (err) {
      alert('Status update failed');
    }
  };

  if (!isOpen) return null;

  // VIEW: GUIDE ADDING A TASK
  if (!task) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Configure New Project Task">
        <form onSubmit={handleAddTask}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Task Title</label>
            <input required style={{ width: '100%' }} value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="e.g. Initial Backend Setup" />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Kanban Column</label>
            <select style={{ width: '100%' }} value={newTask.category} onChange={e => setNewTask({...newTask, category: e.target.value})}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Instructions</label>
            <textarea style={{ width: '100%' }} rows="3" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Deploy Task to Board</button>
        </form>
      </Modal>
    );
  }

  // VIEW: INTERACTING WITH EXISTING TASK
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task.title}>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>{task.description}</p>
      </div>

      <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '16px' }}>Status & Control</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
            <div className={`status-badge ${task.status === 'Completed' ? 'status-completed' : 'status-pending'}`}>
                {task.status}
            </div>
            { (userRole === 'owner' || userRole === 'guide') && (
                <button 
                  onClick={toggleStatus}
                  style={{ background: 'transparent', color: '#60a5fa', border: '1px solid #60a5fa', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', cursor: 'pointer' }}
                >
                  Mark as {task.status === 'Completed' ? 'Pending' : 'Completed'}
                </button>
            )}
        </div>
      </div>

      {/* SUBMISSIONS LIST */}
      {task.submissions?.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Past Submissions ({task.submissions.length})</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {task.submissions.map((sub, i) => (
                    <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ color: '#60a5fa' }}>{sub.userId?.name}</span>
                            <span style={{ color: '#64748b' }}>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                        </div>
                        {sub.githubLink && <a href={sub.githubLink} target="_blank" style={{ color: '#10b981', textDecoration: 'none' }}>📦 {sub.githubLink}</a>}
                        {sub.fileName && <div style={{ color: '#94a3b8' }}>📄 {sub.fileName}</div>}
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* NEW SUBMISSION FORM */}
      <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Submit New Work</h4>
      <form onSubmit={handleSubmitWork}>
        <input 
            placeholder="GitHub Repository URL" 
            style={{ width: '100%', marginBottom: '12px' }} 
            value={submission.githubLink}
            onChange={e => setSubmission({...submission, githubLink: e.target.value})}
        />
        <input 
            placeholder="File Name / Description" 
            style={{ width: '100%', marginBottom: '16px' }} 
            value={submission.fileName}
            onChange={e => setSubmission({...submission, fileName: e.target.value})}
        />
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Submit Work</button>
      </form>
    </Modal>
  )
}

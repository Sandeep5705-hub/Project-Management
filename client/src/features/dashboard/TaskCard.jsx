import React, { useState, useEffect } from 'react';

export default function TaskCard({ task, placeholder, projectId }) {
  // PURE LOCAL STATE + LOCAL STORAGE SYNC
  const [file, setFile] = useState(null);
  const [githubURL, setGithubURL] = useState('');
  const [isAddingRepo, setIsAddingRepo] = useState(false);
  const [submittedItems, setSubmittedItems] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const title = task?.title || placeholder?.title;
  const category = task?.category || placeholder?.category;
  const description = task?.description || placeholder?.description;
  const priority = task?.priority || 'Medium';

  // LOAD FROM LOCAL STORAGE ON MOUNT
  useEffect(() => {
    const saved = localStorage.getItem(`submissions_${projectId}_${title}`);
    if (saved) {
      setSubmittedItems(JSON.parse(saved).items || []);
    }
  }, [projectId, title]);

  const updatePoints = (type) => {
    const currentScores = JSON.parse(localStorage.getItem(`leaderboard_${projectId}`) || '{}');
    let pointsToAdd = type === 'repo' ? 15 : 10;
    
    // Check for first-time submission bonus (+5)
    const submittedKey = `submitted_${projectId}_${title}`;
    if (!localStorage.getItem(submittedKey)) {
        pointsToAdd += 5;
        localStorage.setItem(submittedKey, 'true');
    }

    const currentPoints = currentScores['Sandeep'] || 0;
    currentScores['Sandeep'] = currentPoints + pointsToAdd;
    
    localStorage.setItem(`leaderboard_${projectId}`, JSON.stringify(currentScores));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsAddingRepo(false);
      setSubmissionStatus(null); 
    }
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (!file && !githubURL) return;

    const type = file ? 'file' : 'repo';
    const newItem = {
      name: file ? file.name : githubURL,
      type,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      id: Date.now()
    };

    const updatedItems = [newItem, ...submittedItems];
    setSubmittedItems(updatedItems);
    
    // Save to LocalStorage
    localStorage.setItem(`submissions_${projectId}_${title}`, JSON.stringify({ items: updatedItems }));
    
    updatePoints(type);

    setFile(null); 
    setGithubURL('');
    setIsAddingRepo(false);
    setSubmissionStatus('success');
    setTimeout(() => setSubmissionStatus(null), 5000);
  };

  const showGitHubAction = (category === 'Design' || category === 'Development' || category === 'Testing');

  return (
    <div className="full-width-card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
         <div>
            <h3 className="card-title">{title}</h3>
            {description && <p className="card-desc" style={{ margin: 0 }}>{description}</p>}
         </div>
         <div className="badge-pill" style={{ color: priority === 'High' ? '#ef4444' : '#60a5fa', borderColor: priority === 'High' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(96, 165, 250, 0.3)' }}>
            {priority}
         </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
         <span>Due: {placeholder?.deadline || 'May 7, 2026'}</span>
         <span style={{ color: '#475569' }}>|</span>
         <span style={{ color: '#10b981', fontWeight: '800' }}>Active Workflow</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {submittedItems.map((item) => (
            <div key={item.id} style={{ 
                display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', 
                background: 'rgba(16, 185, 129, 0.05)', borderRadius: '18px', border: '1px solid rgba(16, 185, 129, 0.1)'
            }}>
                <span style={{ fontSize: '20px' }}>{item.type === 'repo' ? '📦' : '📄'}</span>
                <div style={{ flex: 1, fontWeight: '700', color: '#10b981' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Submitted: {item.date}</div>
            </div>
          ))}

          {submittedItems.length === 0 && (
             <div style={{ padding: '24px', textAlign: 'center', color: '#334155', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '18px', fontSize: '14px' }}>
                No artifacts submitted yet. Use the buttons below to begin.
             </div>
          )}
      </div>

      <div style={{ marginTop: '32px' }}>
         {isAddingRepo && (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
               <input 
                  className="input-master" 
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', flex: 1, height: '48px', padding: '0 20px', borderRadius: '14px', color: 'white' }}
                  placeholder="Paste GitHub Repository link..."
                  value={githubURL}
                  autoFocus
                  onChange={e => setGithubURL(e.target.value)}
               />
               <button className="btn-azure" onClick={handleLocalSubmit} style={{ height: '48px' }}>
                  Submit
               </button>
            </div>
         )}

         <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', alignItems: 'center' }}>
            {submissionStatus === 'success' && (
                <span style={{ color: '#10b981', fontWeight: '900', fontSize: '14px', marginRight: 'auto' }}>
                    Submission Successful ✅
                </span>
            )}

            {file && (
                <div style={{ marginRight: 'auto', background: 'rgba(59, 130, 246, 0.1)', padding: '8px 16px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <span style={{ color: '#60a5fa', fontWeight: '800' }}>Selected:</span> {file.name}
                </div>
            )}
            
            <label className="btn-secondary" style={{ cursor: 'pointer' }}>
               <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
               📁 Browse Files
            </label>

            {file && (
               <button className="btn-azure" onClick={handleLocalSubmit} style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                  Submit File
               </button>
            )}

            {showGitHubAction && !file && (
               <button className="btn-azure" onClick={() => setIsAddingRepo(!isAddingRepo)}>
                  🔗 {isAddingRepo ? 'Cancel' : 'Submit GitHub Link'}
               </button>
            )}
         </div>
      </div>
    </div>
  );
}

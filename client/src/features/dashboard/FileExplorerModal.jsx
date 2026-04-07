import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';

export default function FileExplorerModal({ isOpen, onClose, onUpload }) {
  const [selectedFile, setSelectedFile] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const folders = [
    { name: 'Research', date: '5/1/2026 10:07 AM', type: 'Folder' },
    { name: 'E-Commerce Assets', date: '4/23/2026 2:45 PM', type: 'Folder' },
    { name: 'Documentation', date: '4/22/2026 4:16 PM', type: 'Folder' },
    { name: 'Wireframes', date: '4/20/2026 6:29 PM', type: 'Folder' },
    { name: 'Final Report', date: '4/18/2026 5:10 PM', type: 'Folder' },
    { name: 'Code Files', date: '4/17/2026 3:47 PM', type: 'Folder' },
    { name: 'TO-DO List', date: '4/15/2026 2:50 PM', type: 'Text Document' },
    { name: 'NLP_Model.pptx', date: '4/8/2026 6:30 PM', type: 'PowerPoint' },
  ];

  const handleUpload = () => {
    if (confirmed && selectedFile) {
      onUpload(selectedFile);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Browse Files" maxWidth="1000px">
      <div className="explorer-window">
        {/* SIDEBAR */}
        <div className="explorer-sidebar">
          <div className="explorer-sidebar-item explorer-sidebar-active"><span>🏠</span> Desktop</div>
          <div className="explorer-sidebar-item"><span>📥</span> Downloads</div>
          <div className="explorer-sidebar-item"><span>📄</span> Documents</div>
          <div className="explorer-sidebar-item"><span>🖼️</span> Pictures</div>
          <div className="explorer-sidebar-item"><span>🎵</span> Music</div>
          <div className="explorer-sidebar-item"><span>📹</span> Videos</div>
          <div className="explorer-sidebar-item"><span>☁️</span> OneDrive</div>
          <div className="explorer-sidebar-item"><span>🖥️</span> This PC</div>
        </div>

        {/* MAIN AREA */}
        <div className="explorer-main">
          {/* TOOLBAR */}
          <div className="explorer-toolbar">
             <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '6px', flex: 1 }}>
                <span>📁</span> <span style={{ fontSize: '13px' }}>Desktop</span>
             </div>
             <div style={{ border: '1px solid var(--glass-border)', padding: '6px 12px', borderRadius: '6px', width: '200px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Search</span>
                <span>🔍</span>
             </div>
          </div>

          {/* CONTENT */}
          <div className="explorer-content">
            <div className="explorer-grid">
              <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 140px', padding: '8px 16px', fontSize: '11px', color: '#64748b', borderBottom: '1px solid var(--glass-border)' }}>
                <span></span> <span>Name</span> <span>Modified Date</span>
              </div>
              {folders.map(f => (
                <div key={f.name} className="explorer-item" onClick={() => setSelectedFile(f.name)}>
                  <span>{f.type === 'Folder' ? '📂' : '📄'}</span>
                  <span>{f.name}</span>
                  <span style={{ color: '#64748b' }}>{f.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="explorer-footer">
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>File name:</label>
                    <input className="input-master" readOnly value={selectedFile} placeholder="Select a file from above..." />
                </div>
                <div style={{ width: '250px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>File type:</label>
                    <div className="input-master" style={{ height: '18px' }}>All Files (*.*)</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" className="checkbox-custom" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
                    I confirm that I have the rights to upload these files.
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-action" style={{ background: 'transparent', padding: '10px 32px' }} onClick={onClose}>Cancel</button>
                    <button 
                        className="btn-primary" 
                        style={{ padding: '10px 40px', opacity: confirmed && selectedFile ? 1 : 0.5, pointerEvents: confirmed && selectedFile ? 'auto' : 'none' }}
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

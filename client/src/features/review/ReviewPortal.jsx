import React from 'react';

export default function ReviewPortal() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a' }}>Document Review</h1>
        <p style={{ color: '#64748b' }}>Review and approve team submissions</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '32px' }}>
        {/* LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
           <h4 style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold' }}>Submitted Documents (3)</h4>
           {[
             { title: 'Market Research Report', by: 'Sarah Chen' , status: 'Pending Review' },
             { title: 'Technical Architecture Doc', by: 'Michael Kim', status: 'Needs Revision' },
             { title: 'User Experience Research', by: 'Emily Rodriguez', status: 'Accepted' }
           ].map((doc, i) => (
             <div key={doc.title} style={{ 
               padding: '20px', 
               background: i === 0 ? '#eff6ff' : 'white', 
               border: i === 0 ? '2px solid #2563eb' : '1px solid #e2e8f0',
               borderRadius: '16px'
             }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{doc.title}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{doc.by}</div>
                <div style={{ 
                  marginTop: '12px', 
                  fontSize: '11px', 
                  color: doc.status === 'Accepted' ? '#10b981' : doc.status === 'Needs Revision' ? '#f59e0b' : '#3b82f6' 
                }}>● {doc.status}</div>
             </div>
           ))}
        </div>

        {/* PREVIEW */}
        <div className="glass-panel" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>Market Research Report</h2>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Submitted by Sarah Chen • 2026-04-05 10:30 AM</p>
                </div>
                <div style={{ padding: '8px 16px', background: '#f59e0b', color: 'white', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>Pending Review</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>Plagiarism Score</div>
                    <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#10b981' }}>5%</div>
                    <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold', marginTop: '8px' }}>Excellent</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                     <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>Relevance Score</div>
                     <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#10b981' }}>92%</div>
                     <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold', marginTop: '8px' }}>Excellent</div>
                </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '40px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '24px' }}>Document Preview</h4>
                <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', color: '#475569', fontSize: '15px' }}>
                   <p style={{ fontWeight: 'bold', marginBottom: '16px' }}># Market Research Report</p>
                   <p>## Executive Summary</p>
                   <p style={{ color: '#64748b' }}>This comprehensive market research report analyzes the current state of the e-commerce industry, identifying key opportunities and challenges for our proposed platform...</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

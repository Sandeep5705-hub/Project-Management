import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

export default function ProjectChat({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const scrollRef = useRef();

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Polling for simplicity
    return () => clearInterval(interval);
  }, [projectId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/chat/${projectId}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Chat error');
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await api.post('/chat', { projectId, text });
      setText('');
      fetchMessages();
    } catch (err) {
      console.error('Send error');
    }
  };

  return (
    <div className="glass-panel" style={{ height: '500px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold', color: 'var(--text-main)' }}>Team Communications</div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            alignSelf: m.sender?._id === user.id ? 'flex-end' : 'flex-start',
            maxWidth: '80%'
          }}>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px', textAlign: m.sender?._id === user.id ? 'right' : 'left' }}>
              {m.sender?.name}
            </div>
            <div style={{ 
                padding: '10px 16px', 
                borderRadius: '12px', 
                background: m.sender?._id === user.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: '14px',
                border: m.sender?._id === user.id ? 'none' : '1px solid rgba(255,255,255,0.1)'
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '8px' }}>
        <input 
            placeholder="Type a message..." 
            value={text} 
            onChange={e => setText(e.target.value)} 
            style={{ flex: 1, background: 'rgba(15,23,42,0.8)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} 
        />
        <button type="submit" className="btn-primary">
            Send
        </button>
      </form>
    </div>
  );
}

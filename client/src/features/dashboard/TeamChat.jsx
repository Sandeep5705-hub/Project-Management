import React, { useState, useEffect, useRef } from 'react';

export default function TeamChat({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  // Simulation of other team members
  const memberColors = {
    'Sandeep': '#8b5cf6', // Self (Purple)
    'Jacob Jones': '#10b981', // Green
    'Jane Cooper': '#f97316', // Orange
    'Guy Hawkins': '#06b6d4'  // Cyan
  };

  useEffect(() => {
    const saved = localStorage.getItem(`chat_${projectId}`);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
    const interval = setInterval(() => {
        const current = localStorage.getItem(`chat_${projectId}`);
        if (current) setMessages(JSON.parse(current));
    }, 2000);
    return () => clearInterval(interval);
  }, [projectId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'Sandeep', 
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem(`chat_${projectId}`, JSON.stringify(updated));
    setInputText('');

    // Simulated response logic for demo
    if (inputText.toLowerCase().includes('hello')) {
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                sender: 'Jacob Jones',
                text: "Hey! Haven't caught up in a while. How's everything going?",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            const withBot = [...updated, botMsg];
            setMessages(withBot);
            localStorage.setItem(`chat_${projectId}`, JSON.stringify(withBot));
        }, 1500);
    }
  };

  return (
    <div style={{ 
        width: '100%',
        height: '100%',
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        background: 'radial-gradient(circle at top right, #1e1b4b, #020617)',
        borderRadius: '24px',
        position: 'relative'
    }}>
      {/* GALAXY DECORATION */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '150px', height: '150px', background: '#3b82f6', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: '200px', height: '200px', background: '#8b5cf6', filter: 'blur(120px)', opacity: 0.05, pointerEvents: 'none' }}></div>

      {/* HEADER - ROBERT FOX STYLE */}
      <div style={{ padding: '24px 32px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
               <img src="./user_avatar_john_1775589913745.png" alt="Robert Fox" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
                <div style={{ fontSize: '17px', fontWeight: '900', color: 'white' }}>Robert Fox</div>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>online</div>
            </div>
         </div>
         <div style={{ display: 'flex', gap: '20px', color: '#94a3b8' }}>
            <span style={{ fontSize: '20px', cursor: 'pointer' }}>📞</span>
            <span style={{ fontSize: '20px', cursor: 'pointer' }}>📹</span>
         </div>
      </div>

      {/* MESSAGES - FLOATING TAG STYLE */}
      <div style={{ flex: 1, padding: '40px 32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px', zIndex: 10 }}>
         {messages.map((m) => {
           const isSelf = m.sender === 'Sandeep';
           const color = memberColors[m.sender] || '#64748b';
           
           return (
             <div key={m.id} style={{ 
                alignSelf: isSelf ? 'flex-end' : 'flex-start',
                position: 'relative',
                maxWidth: '75%'
             }}>
                {/* BUBBLE */}
                <div style={{ 
                    background: isSelf ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : 'rgba(255,255,255,0.05)',
                    padding: '16px 24px', 
                    borderRadius: isSelf ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                    border: isSelf ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isSelf ? '0 10px 25px rgba(139, 92, 246, 0.3)' : '0 10px 25px rgba(0,0,0,0.2)',
                    backdropFilter: isSelf ? 'none' : 'blur(10px)'
                }}>
                    <div style={{ fontSize: '15px', color: 'white', lineHeight: '10px' }}>{m.text}</div>
                    <div style={{ fontSize: '10px', color: isSelf ? 'rgba(255,255,255,0.6)' : '#64748b', textAlign: 'right', marginTop: '12px' }}>{m.time}</div>
                </div>

                {/* FLOATING NAME TAG */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: '-12px', 
                    right: isSelf ? '-10px' : 'auto',
                    left: !isSelf ? '-10px' : 'auto',
                    background: color, 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '8px', 
                    fontSize: '11px', 
                    fontWeight: '900',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    zIndex: 20
                }}>
                   {m.sender}
                </div>
             </div>
           );
         })}
         <div ref={chatEndRef} />
      </div>

      {/* INPUT - FLOATING PILL */}
      <div style={{ padding: '32px', zIndex: 10 }}>
          <form onSubmit={handleSendMessage} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              background: 'rgba(255,255,255,0.05)', 
              padding: '10px 15px', 
              borderRadius: '30px', 
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)'
          }}>
             <button type="button" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>+</button>
             <input 
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '15px', padding: '10px 10px' }}
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
             />
             <span style={{ fontSize: '20px', cursor: 'pointer', opacity: 0.7 }}>😊</span>
             <button type="submit" style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#8b5cf6', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                🎤
             </button>
          </form>
      </div>

    </div>
  );
}

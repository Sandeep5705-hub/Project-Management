import React, { useState, useEffect, useRef } from 'react';

export default function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🎯 PERFECT KNOWLEDGE BASE (YOUR 20 QUESTIONS)
  const KNOWLEDGE_BASE = {
    'full stack': "🧠 **What is a full stack web application?**\n\nA full stack web application is a complete software system that includes three main parts:\n\n**Frontend:** The user interface that people interact with (buttons, pages, forms).\n**Backend:** The server-side logic that processes requests and handles operations.\n**Database:** The storage system where data like users, tasks, and files are saved.\n\nA full stack developer works on all these parts together to build a complete working application.",
    
    'difference': "🧠 **What is the difference between frontend and backend?**\n\nThe frontend is the part of the application that users can see and interact with directly in the browser. It includes design, layout, and user experience.\n\nThe backend is the hidden part that runs on a server. It handles business logic, processes data, manages APIs, and communicates with the database.\n\nIn simple terms:\n**Frontend = User Interface**\n**Backend = Logic + Data Handling**",
    
    'react': "🧠 **What is React used for?**\n\nReact is a JavaScript library used to build dynamic and interactive user interfaces. It allows developers to create reusable components like buttons, forms, and pages.\n\nReact makes applications faster by updating only the necessary parts of the UI instead of reloading the entire page.",
    
    'node.js': "🧠 **What is Node.js?**\n\nNode.js is a runtime environment that allows JavaScript to run outside the browser, especially on the server.\n\nIt is used to build backend applications, handle API requests, and manage server-side logic using JavaScript.",
    
    'api': "🧠 **What is an API?**\n\nAn API (Application Programming Interface) is a communication bridge between the frontend and backend.\n\nIt allows the frontend to request data from the backend and receive responses.\n\nFor example:\nFrontend asks: “Give user data”\nBackend responds with the data",
    
    'components': "🎨 **What are React components?**\n\nReact components are small, reusable pieces of code that define parts of the user interface. Each component can represent something like a button, a navbar, or a dashboard. Components help organize code and make it easier to maintain.",
    
    'usestate': "🎨 **What is useState in React?**\n\nuseState is a React Hook that allows you to store and manage data inside a component. For example, you can use it to store user input or track button clicks. When the state changes, React automatically updates the UI.",
    
    'useeffect': "🎨 **What is useEffect used for?**\n\nuseEffect is a React Hook used to perform side effects in a component. It is commonly used for fetching data from an API, running code when the page loads, or updating data when something changes.",
    
    'routing': "🎨 **How do you handle routing in React?**\n\nRouting in React is handled using a library called **react-router-dom**. It allows you to create multiple pages in a single-page application (e.g., /dashboard or /login).",
    
    'tailwind': "🎨 **What is Tailwind CSS?**\n\nTailwind CSS is a utility-first CSS framework used to style web applications quickly. Instead of writing custom CSS, you use predefined classes like `bg-blue-500` or `text-white`.",
    
    'express.js': "⚙️ **What is Express.js?**\n\nExpress.js is a lightweight framework built on Node.js that helps create backend servers and APIs easily. It simplifies tasks like handling requests and managing middleware.",
    
    'create api': "⚙️ **How do you create an API in Node.js?**\n\nTo create an API, you use Express.js to define routes (GET, POST, PUT, DELETE). Each route handles a specific request and sends a response.",
    
    'middleware': "⚙️ **What is middleware in Express?**\n\nMiddleware is a function that runs between the request and response cycle. It is used for Authentication, Logging, and Data validation.",
    
    'rest api': "⚙️ **What is a REST API?**\n\nA REST API follows a standard way of designing APIs using HTTP methods (GET, POST, PUT, DELETE). It is widely used for communication between frontend and backend.",
    
    'handle errors': "⚙️ **How do you handle errors in backend?**\n\nErrors are handled using **try-catch blocks** and proper HTTP status codes (200=Success, 404=Not Found, 500=Server Error). This helps the frontend understand what went wrong.",
    
    'mongodb': "🗄️ **What is MongoDB?**\n\nMongoDB is a NoSQL database that stores data in a flexible JSON-like format. Instead of tables, it uses Collections and Documents.",
    
    'schema': "🗄️ **What is a schema in Mongoose?**\n\nA schema defines the structure of data in MongoDB (fields, data types). Mongoose uses schemas to ensure data consistency.",
    
    'crud': "🗄️ **What is CRUD operation?**\n\nCRUD stands for: **Create** (Add), **Read** (Fetch), **Update** (Modify), and **Delete** (Remove). These are the basic operations performed on any database.",
    
    'communicate': "🔗 **How do frontend and backend communicate?**\n\nThey communicate using APIs. The frontend sends a request using `fetch()` or `axios`, and the backend processes it and sends a response.",
    
    'connect mongodb': "🔗 **How to connect MongoDB with Node.js?**\n\nYou use a library called **Mongoose**. You install it, add your connection string, and connect. This allows your backend to store and retrieve data."
  };

  const getAIResponse = (input) => {
    const text = input.toLowerCase();
    
    // Check for perfect matches from the Training Set
    for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
        if (text.includes(key)) return value;
    }

    // Default Fallback
    return "That's a great question! As a Gemini Full-Stack Expert, I'm here to help. Could you please specify if your question relates to the Frontend, Backend, or Database part of the application?";
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulated Gemini "Thinking"
    setTimeout(() => {
        const aiMsg = { role: 'assistant', content: getAIResponse(inputText) };
        setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%', 
        width: '100%', 
        background: 'radial-gradient(circle at top right, #0a192f, #020617)',
        color: '#ececf1', 
        overflow: 'hidden'
    }}>
      
      {/* 🔮 GEMINI HEADER */}
      <div style={{ 
          padding: '30px 60px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          zIndex: 10
      }}>
         <div style={{ fontSize: '100px', marginBottom: '24px', filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))' }}>🤖</div>
         <h1 style={{ fontSize: '40px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-1.5px', background: 'linear-gradient(to right, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Gemini Full-Stack Expert</h1>
         <p style={{ color: '#94a3b8', fontSize: '16px', marginTop: '8px', fontWeight: '800' }}>Trained with 20 Perfect Full-Stack Mastery Questions</p>
      </div>

      {/* 💬 CHAT STREAM AREA */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
         {messages.length === 0 ? (
             <div style={{ marginTop: '5vh', textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>✨</div>
                <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>Ask Gemini a Master Question</h2>
                <p style={{ fontSize: '16px' }}>I've been perfectly trained on Frontend, Backend, API, and MongoDB questions.</p>
             </div>
         ) : (
            <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
               {messages.map((m, idx) => (
                  <div key={idx} style={{ 
                      display: 'flex', 
                      gap: '24px', 
                      background: m.role === 'assistant' ? 'rgba(255,255,255,0.02)' : 'transparent',
                      padding: m.role === 'assistant' ? '32px' : '0',
                      borderRadius: '24px',
                      border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}>
                     <div style={{ 
                         width: '40px', height: '40px', minWidth: '40px', borderRadius: '12px', 
                         background: m.role === 'user' ? '#3b82f6' : '#8b5cf6',
                         display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
                     }}>
                        {m.role === 'user' ? '👤' : '🤖'}
                     </div>
                     <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#f1f5f9', whiteSpace: 'pre-wrap' }}>
                        {m.content}
                     </div>
                  </div>
               ))}
               <div ref={chatEndRef} />
            </div>
         )}
      </div>

      {/* ⚡ INPUT CONSOLE */}
      <div style={{ padding: '0 60px 40px 600px', width: '100%', display: 'flex', justifyContent: 'center' }}>
         <div style={{ maxWidth: '900px', width: '100%', position: 'relative' }}>
            <form onSubmit={handleSendMessage} style={{ position: 'relative' }}>
                <input 
                   style={{ 
                       width: '100%', 
                       background: 'rgba(0,0,0,0.3)', 
                       border: '1px solid rgba(255,255,255,0.1)', 
                       padding: '24px 70px 24px 30px', 
                       borderRadius: '24px', 
                       color: 'white', 
                       fontSize: '18px', 
                       boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                       outline: 'none'
                   }}
                   placeholder="Ask a trained question (e.g. what is react?)"
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" style={{ 
                    position: 'absolute', 
                    right: '16px', 
                    top: '16px', 
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: '#8b5cf6', 
                    border: 'none', 
                    cursor: 'pointer', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                }}>
                   🚀
                </button>
            </form>
         </div>
      </div>

    </div>
  );
}

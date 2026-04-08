import React, { useState, useEffect, useRef } from 'react';

const SUGGESTED_QUESTIONS = [
  "What is React?",
  "What is Node.js?",
  "What is MongoDB?",
  "What is an API?",
  "What is IEEE?",
  "What is a problem statement?",
  "What is CRUD?",
  "What is JWT?",
];

const KNOWLEDGE_BASE = {
  // ── FULL STACK ────────────────────────────────────────────────────────────
  'full stack': "🧠 **What is a full stack web application?**\n\nA full stack web application includes three main layers:\n\n**Frontend:** The UI users see (React)\n**Backend:** Server-side logic (Node.js + Express)\n**Database:** Data storage (MongoDB)\n\nA full stack developer builds all three layers together.",
  'difference': "🧠 **Frontend vs Backend?**\n\n**Frontend** = What users SEE (UI, design, buttons)\n**Backend** = What users DON'T see (APIs, database queries, business logic)\n\nThey communicate via HTTP requests using APIs.",
  'react': "⚛️ **What is React?**\n\nReact is a JavaScript library for building interactive UIs. Key concepts:\n- **Components** — reusable UI pieces\n- **useState** — state management\n- **useEffect** — side effects (API calls)\n- **Virtual DOM** — fast rendering without full page reloads",
  'virtual dom': "⚛️ **What is the Virtual DOM?**\n\nThe Virtual DOM is a lightweight in-memory copy of the real DOM. When state changes, React:\n1. Updates the virtual DOM\n2. Compares it with the previous version (diffing)\n3. Applies ONLY the changes to the real DOM\n\nThis makes React very fast.",
  'node.js': "⚙️ **What is Node.js?**\n\nNode.js is a JavaScript runtime built on **Chrome's V8 engine**. It allows JavaScript to run on the server (outside the browser).\n\nUsed for: building REST APIs, handling requests, real-time apps.",
  'node': "⚙️ **What is Node.js?**\n\nNode.js runs JavaScript on the server using the V8 engine. It's non-blocking and event-driven, making it great for APIs and real-time applications.",
  'v8': "⚙️ **What is V8?**\n\nV8 is Google's JavaScript engine used in Chrome and Node.js. It compiles JavaScript directly to machine code for fast execution.",
  'express': "⚙️ **What is Express.js?**\n\nExpress is a minimal Node.js web framework used to build REST APIs.\n\n```javascript\napp.get('/users', (req, res) => {\n  res.json({ user: 'Sandeep' });\n});\n```\n\nIt handles routing, middleware, and HTTP methods.",
  'api': "🔗 **What is an API?**\n\nAPI = Application Programming Interface. It's a communication contract between frontend and backend.\n\nThe frontend sends HTTP requests (GET, POST) → Backend processes and responds with JSON data.",
  'rest api': "🔗 **What is a REST API?**\n\nREST APIs follow HTTP standards:\n- **GET** — Fetch data\n- **POST** — Create data\n- **PUT/PATCH** — Update data\n- **DELETE** — Remove data\n\nREST is stateless — each request is independent.",
  'components': "⚛️ **What are React components?**\n\nComponents are reusable pieces of UI. There are two types:\n- **Functional Components** — modern, use hooks\n- **Class Components** — older, use lifecycle methods\n\nEach component manages its own state and renders JSX.",
  'usestate': "⚛️ **What is useState?**\n\n`useState` is a React Hook that adds state to functional components.\n\n```javascript\nconst [count, setCount] = useState(0);\n```\n\nWhen `setCount` is called, React re-renders the component.",
  'useeffect': "⚛️ **What is useEffect?**\n\n`useEffect` runs side effects in components:\n- Fetching API data on mount\n- Setting up subscriptions\n- Cleaning up timers\n\n```javascript\nuseEffect(() => { fetchData(); }, []);\n```\nEmpty `[]` = runs only once after mount.",
  'mongodb': "🗄️ **What is MongoDB?**\n\nMongoDB is a **NoSQL document database** that stores data in JSON-like documents:\n\n```json\n{ \"name\": \"Sandeep\", \"role\": \"owner\", \"score\": 140 }\n```\n\nInstead of tables (SQL), MongoDB uses **Collections** and **Documents**.",
  'mongoose': "🗄️ **What is Mongoose?**\n\nMongoose is an **ODM (Object Data Modeling)** library for MongoDB in Node.js. It provides:\n- **Schemas** — define document structure\n- **Models** — interact with collections\n- **Validation** — enforce data rules",
  'crud': "🗄️ **What is CRUD?**\n\nCRUD = the 4 basic database operations:\n- **C**reate → POST (insert document)\n- **R**ead → GET (fetch documents)\n- **U**pdate → PUT/PATCH (modify document)\n- **D**elete → DELETE (remove document)",
  'middleware': "⚙️ **What is Middleware in Express?**\n\nMiddleware is a function that runs between the request and response:\n\n```javascript\napp.use((req, res, next) => {\n  console.log('Request received');\n  next(); // pass to next middleware\n});\n```\n\nUsed for: authentication, logging, error handling.",
  'jwt': "🔐 **What is JWT?**\n\nJWT = JSON Web Token. Used for **authentication**.\n\nStructure: `Header.Payload.Signature`\n\nFlow:\n1. User logs in → server creates JWT\n2. User sends JWT in every request\n3. Server verifies JWT and responds\n\nLibrary: `jsonwebtoken`",
  'cors': "🔐 **What is CORS?**\n\nCORS = Cross-Origin Resource Sharing. It's a browser security policy that blocks requests from different domains.\n\nFix in Express:\n```javascript\nconst cors = require('cors');\napp.use(cors());\n```",
  'schema': "🗄️ **What is a Schema in Mongoose?**\n\nA schema defines the structure of a MongoDB document:\n\n```javascript\nconst userSchema = new Schema({\n  name: String,\n  email: String,\n  score: { type: Number, default: 0 }\n});\n```",
  'communicate': "🔗 **How do Frontend and Backend communicate?**\n\nUsing HTTP requests via **fetch** or **axios**:\n\n```javascript\nconst res = await axios.get('/api/users');\nconsole.log(res.data);\n```\n\nBackend processes the request and responds with JSON.",
  'tailwind': "🎨 **What is Tailwind CSS?**\n\nTailwind is a utility-first CSS framework. Instead of custom CSS, use classes:\n```html\n<div class=\"bg-blue-500 text-white p-4 rounded-lg\">\n```\n\nIt speeds up styling but this project uses **Vanilla CSS** for full control.",

  // ── IEEE + RESEARCH ────────────────────────────────────────────────────────
  'ieee': "📘 **What is IEEE?**\n\nIEEE = Institute of Electrical and Electronics Engineers.\n\nIt is the world's largest technical professional organization. They publish research papers and set standards in:\n- Electronics\n- Software Engineering\n- AI and Machine Learning\n\nWhen you write an **IEEE paper**, you follow their specific format: Abstract → Introduction → Methodology → Results → Conclusion → References.",
  'research paper': "📘 **What is a Research Paper?**\n\nA research paper presents new knowledge or a solution to a real-world problem. It follows a structured format:\n1. **Title** — clear and specific\n2. **Abstract** — brief 150-250 word summary\n3. **Introduction** — background and problem context\n4. **Literature Review** — existing research\n5. **Methodology** — how you solved the problem\n6. **Results** — output and performance\n7. **Conclusion** — key findings\n8. **References** — sources used",
  'abstract': "📘 **What is an Abstract in a Research Paper?**\n\nThe Abstract is a concise summary (150-250 words) of the entire paper. It covers:\n- The problem being solved\n- The approach/methodology\n- Key results\n- Conclusion\n\nIt's the FIRST section readers see and helps them decide if the paper is relevant.",
  'problem statement': "📘 **What is a Problem Statement?**\n\nA problem statement clearly identifies:\n1. **What** the real-world problem is\n2. **Who** is affected\n3. **Why** existing solutions fall short (research gap)\n4. **What** your solution proposes\n\nA strong problem statement gives direction to the entire project.",
  'research gap': "📘 **What is a Research Gap?**\n\nA research gap is an area where existing research does NOT provide a complete or satisfactory solution.\n\nExample: Many attendance systems exist, but none use AI-based facial recognition with real-time alerting — that's a research gap!\n\nYour project fills this gap.",
  'literature survey': "📘 **What is a Literature Survey?**\n\nA literature survey (literature review) is a study of existing research papers and solutions related to your topic.\n\nPurpose:\n- Understand what has already been done\n- Identify limitations of existing approaches\n- Justify why your solution is needed (the gap)",
  'methodology': "📘 **What is Methodology in Research?**\n\nMethodology is the step-by-step approach used to solve the problem:\n1. System architecture design\n2. Technology selection\n3. Implementation steps\n4. Testing strategy\n5. Evaluation metrics\n\nIt explains HOW you built your solution.",
  'novelty': "📘 **What is Novelty in Research?**\n\nNovelty means your work presents something NEW that hasn't been done before (or improves significantly on existing work).\n\nExamples of novelty:\n- New algorithm\n- New combination of technologies\n- Better performance than existing systems\n- Solving a problem nobody addressed before",

  // ── TESTING + DEPLOYMENT ──────────────────────────────────────────────────
  'unit test': "🛡️ **What is Unit Testing?**\n\nUnit testing tests individual functions/modules in isolation.\n\nIn JavaScript, the most popular testing framework is **Jest**:\n```javascript\ntest('adds 1 + 2 to equal 3', () => {\n  expect(1 + 2).toBe(3);\n});\n```",
  'jest': "🛡️ **What is Jest?**\n\nJest is a JavaScript testing framework used in React and Node.js projects.\n\nIt supports:\n- Unit tests\n- Integration tests\n- Code coverage reports\n\nRun tests with: `npm test`",
  'ci cd': "🛡️ **What is CI/CD?**\n\nCI/CD = Continuous Integration / Continuous Delivery.\n\n**CI** — Automatically run tests when code is pushed\n**CD** — Automatically deploy to production after tests pass\n\nTools: GitHub Actions, Jenkins, CircleCI",
  'docker': "🛡️ **What is Docker?**\n\nDocker containers package your app with all its dependencies into a portable unit.\n\nBenefits:\n- Works the same everywhere (dev, staging, production)\n- Easy deployment\n- Isolation from other apps\n\nRun: `docker build -t myapp .` then `docker run myapp`",
  'vercel': "🛡️ **What is Vercel?**\n\nVercel is a cloud platform for deploying **frontend** React/Next.js apps.\n\nFeatures:\n- Free tier available\n- Auto-deploy from GitHub\n- Global CDN\n- Custom domains\n\nCommand: `vercel deploy`",
  'ssl': "🛡️ **What is SSL/TLS?**\n\nSSL/TLS encrypts data transmitted between client and server.\n\n- HTTP = plain text (unsafe)\n- HTTPS = encrypted with SSL (safe)\n\nAll production apps should use HTTPS. Vercel and most hosts provide free SSL certificates.",
};

export default function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (input) => {
    const text = input.toLowerCase();
    for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
      if (text.includes(key)) return value;
    }
    return "🤔 Great question! I'm trained on Full-Stack Development, IEEE Research, and Testing topics.\n\nTry asking about:\n• React, Node.js, MongoDB, Express, JWT\n• IEEE paper format, Abstract, Problem Statement\n• Unit Testing, CI/CD, Docker, Vercel";
  };

  const handleSend = (e, overrideText) => {
    if (e) e.preventDefault();
    const text = overrideText || inputText;
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = { role: 'assistant', content: getAIResponse(text) };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
      background: 'radial-gradient(circle at top right, #0a192f, #020617)',
      color: '#ececf1', overflow: 'hidden'
    }}>

      {/* HEADER */}
      <div style={{
        padding: '24px 48px', display: 'flex', alignItems: 'center', gap: '20px',
        background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0
      }}>
        <div style={{ fontSize: '40px', filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.5))' }}>🤖</div>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '950', color: 'white', margin: 0, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI Academic Assistant
          </h1>
          <p style={{ color: '#475569', fontSize: '13px', margin: 0, fontWeight: '700' }}>
            Trained on Full-Stack • IEEE Research • Testing & Deployment
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(16,185,129,0.1)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '900' }}>ONLINE</span>
        </div>
      </div>

      {/* CHAT AREA */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {messages.length === 0 ? (
          <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>✨</div>
              <h2 style={{ fontSize: '24px', fontWeight: '950', color: 'white', marginBottom: '8px' }}>Ask Me Anything</h2>
              <p style={{ color: '#64748b', fontSize: '15px', fontWeight: '600' }}>I know Full-Stack Dev, IEEE Research Methods, and Deployment Strategies.</p>
            </div>

            {/* SUGGESTED CHIPS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {SUGGESTED_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => handleSend(null, q)}
                  style={{
                    padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: '800',
                    background: 'rgba(139,92,246,0.08)', color: '#a78bfa',
                    border: '1px solid rgba(139,92,246,0.2)', cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{
                display: 'flex', gap: '16px',
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start'
              }}>
                {/* AVATAR */}
                <div style={{
                  width: '36px', height: '36px', minWidth: '36px', borderRadius: '10px',
                  background: m.role === 'user' ? '#3b82f6' : '#8b5cf6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0
                }}>
                  {m.role === 'user' ? '👤' : '🤖'}
                </div>

                {/* MESSAGE BUBBLE */}
                <div style={{
                  maxWidth: '85%',
                  padding: '20px 24px',
                  background: m.role === 'user' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
                  border: m.role === 'user' ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: m.role === 'user' ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                  fontSize: '15px', lineHeight: '1.7', color: '#f1f5f9', whiteSpace: 'pre-wrap', fontWeight: '600'
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
                <div style={{ padding: '20px 28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px 20px 20px 20px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', animation: `bounce ${0.6 + i * 0.15}s ease-in-out infinite alternate` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* INPUT BAR */}
      <div style={{ padding: '20px 48px 32px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <form onSubmit={handleSend} style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <input
            style={{
              width: '100%', background: 'rgba(15,23,42,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '20px 70px 20px 28px', borderRadius: '20px',
              color: 'white', fontSize: '16px', fontWeight: '600',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)', outline: 'none',
              boxSizing: 'border-box'
            }}
            placeholder="Ask about React, IEEE, MongoDB, JWT, Docker..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            style={{
              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '12px',
              background: inputText.trim() ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'rgba(255,255,255,0.05)',
              border: 'none', cursor: inputText.trim() ? 'pointer' : 'not-allowed',
              color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            🚀
          </button>
        </form>
        <p style={{ textAlign: 'center', color: '#334155', fontSize: '12px', fontWeight: '700', marginTop: '12px', maxWidth: '800px', margin: '10px auto 0' }}>
          Covers: React • Node.js • MongoDB • JWT • IEEE Papers • Problem Statements • Testing • CI/CD • Docker
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          from { transform: translateY(0); opacity: 0.5; }
          to { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

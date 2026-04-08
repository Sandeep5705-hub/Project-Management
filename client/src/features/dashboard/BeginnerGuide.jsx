import React from 'react';

const GUIDE_SECTIONS = [
  { 
    title: '🧭 1. Project Overview', 
    desc: 'This project is a full stack web application where you build frontend, backend, and database together. It helps you understand how real applications are developed.',
    how: ['First, understand your project idea clearly', 'Write what problem your app solves', 'Break the project into small parts (UI, API, DB)', 'Keep everything simple at the start'],
    links: [{ label: 'Full Stack Basics', url: 'https://roadmap.sh/full-stack' }]
  },
  { 
    title: '🛤️ 2. Development Roadmap', 
    desc: 'A roadmap helps you follow the correct order while building your project.',
    how: ['Step 1: Write features (login, dashboard, etc.)', 'Step 2: Design UI (draw or use Figma)', 'Step 3: Start frontend development', 'Step 4: Build backend APIs', 'Step 5: Connect everything', 'Step 6: Test and fix errors'],
    links: [{ label: 'View Roadmap.sh', url: 'https://roadmap.sh' }]
  },
  { 
    title: '🎨 3. Frontend Basics', 
    desc: 'Frontend is the user interface of your app where users interact.',
    how: ['Create project using React', 'Build pages like Login, Dashboard', 'Add buttons, forms, navigation', 'Use state to manage data', 'Display API data on screen'],
    links: [{ label: 'React Official', url: 'https://react.dev' }]
  },
  { 
    title: '⚛️ 4. React Concepts', 
    desc: 'React allows you to build reusable UI components.',
    how: ['Create components (Navbar, Card, Page)', 'Use useState to store data', 'Use useEffect to fetch data', 'Split UI into smaller parts', 'Reuse components in multiple pages'],
    links: [{ label: 'Main Hooks', url: 'https://react.dev/reference/react' }]
  },
  { 
    title: '🎨 5. Styling (UI Design)', 
    desc: 'Styling improves the look and feel of your app.',
    how: ['Install Tailwind CSS', 'Use classes like bg-blue-500, p-4', 'Make UI responsive (mobile + desktop)', 'Maintain spacing and alignment', 'Keep design clean and simple'],
    links: [{ label: 'Tailwind Docs', url: 'https://tailwindcss.com/docs' }]
  },
  { 
    title: '⚙️ 6. Backend Basics', 
    desc: 'Backend handles logic, requests, and server operations.',
    how: ['Create backend folder', 'Install Express.js', 'Create server file', 'Define routes (API endpoints)', 'Send responses to frontend'],
    links: [{ label: 'Node.js Guide', url: 'https://nodejs.org/en/docs' }]
  },
  { 
    title: '🔗 7. API Development', 
    desc: 'APIs connect frontend and backend.',
    how: ['Create routes like /users, /tasks', 'Use GET to fetch data', 'Use POST to send data', 'Test APIs using Postman', 'Return JSON responses'],
    links: [{ label: 'Express Docs', url: 'https://expressjs.com' }]
  },
  { 
    title: '🗄️ 8. Database Basics', 
    desc: 'Database stores all application data.',
    how: ['Create MongoDB account', 'Get connection string', 'Connect using Mongoose', 'Create schema (User, Task)', 'Save and retrieve data'],
    links: [{ label: 'MongoDB Atlas', url: 'https://www.mongodb.com/atlas' }]
  },
  { 
    title: '🔐 9. Authentication', 
    desc: 'Authentication controls user access.',
    how: ['Create signup and login APIs', 'Store user data in database', 'Use password hashing (bcrypt)', 'Generate token (JWT)', 'Protect private routes'],
    links: [{ label: 'JWT Intro', url: 'https://jwt.io/introduction' }]
  },
  { 
    title: '🔑 10. Environment Variables', 
    desc: 'Used to store sensitive data securely.',
    how: ['Create .env file', 'Add keys like DB URL, API key', 'Use process.env in backend', 'Do not upload .env to GitHub', 'Keep secrets hidden'],
    links: [{ label: 'Dotenv Package', url: 'https://www.npmjs.com/package/dotenv' }]
  },
  { 
    title: '🤖 11. AI Integration', 
    desc: 'AI adds smart features to your app.',
    how: ['Get API key (OpenAI/Gemini)', 'Create API route in backend', 'Send user input to AI', 'Display response in frontend', 'Use for chatbot or suggestions'],
    links: [{ label: 'Gemini AI', url: 'https://ai.google.dev' }]
  },
  { 
    title: '🐙 12. GitHub Usage', 
    desc: 'GitHub helps manage and store your code.',
    how: ['Initialize git using git init', 'Add files using git add .', 'Commit changes using git commit', 'Push to GitHub repository', 'Update code regularly'],
    links: [{ label: 'Git Cheat Sheet', url: 'https://education.github.com/git-cheat-sheet-education.pdf' }]
  },
  { 
    title: '🛠️ 13. Development Tools', 
    desc: 'Tools make development easier and faster.',
    how: ['Use VS Code for coding', 'Use Postman to test APIs', 'Use Chrome DevTools for debugging', 'Install useful extensions', 'Organize your workspace'],
    links: [{ label: 'VS Code Tips', url: 'https://code.visualstudio.com/docs' }]
  },
  { 
    title: '🚀 14. Deployment', 
    desc: 'Deployment makes your project live online.',
    how: ['Push code to GitHub', 'Deploy frontend using Vercel', 'Deploy backend using Render', 'Add environment variables', 'Test live project'],
    links: [{ label: 'Render Hosting', url: 'https://render.com' }]
  },
  { 
    title: '🐞 15. Debugging & Testing', 
    desc: 'Debugging helps fix errors in your app.',
    how: ['Use console.log to check values', 'Check browser console (F12)', 'Test APIs step by step', 'Fix one error at a time', 'Re-test after fixing'],
    links: [{ label: 'Chrome DevTools', url: 'https://developer.chrome.com/docs/devtools' }]
  }
];

const MASTER_RESOURCES = [
  {
    title: '💻 1. VS Code (Code Editor)',
    url: 'https://code.visualstudio.com/',
    what: 'VS Code is a free and powerful code editor used to write and manage your project code.',
    how: ['Install VS Code', 'Open your project folder', 'Create files (App.js, server.js)', 'Write and edit code'],
    extra: '🔌 Extensions: ES7 React, Prettier, Thunder Client'
  },
  {
    title: '🐙 2. GitHub (Version Control)',
    url: 'https://github.com/',
    what: 'GitHub stores your code online and tracks all changes.',
    how: ['Create account', 'Create repository', 'git init', 'git add .', 'git commit', 'git push origin main']
  },
  {
    title: '🎨 3. React (Frontend)',
    url: 'https://react.dev/',
    what: 'Library for building dynamic and interactive user interfaces.',
    how: ['Learn components', 'Build UI pages', 'Use hooks like useState']
  },
  {
    title: '🎨 4. Tailwind CSS (Styling)',
    url: 'https://tailwindcss.com/',
    what: 'Utility-first CSS framework for modern responsive designs.',
    how: ['Use ready-made classes', 'Style UI quickly', 'Make responsive design']
  },
  {
    title: '⚙️ 5. Node.js (Backend Runtime)',
    url: 'https://nodejs.org/',
    what: 'Allows JavaScript to run on the server.',
    how: ['Install Node.js', 'Run backend using node server.js']
  },
  {
    title: '⚙️ 6. Express.js (Framework)',
    url: 'https://expressjs.com/',
    what: 'Simplifies API creation and request handling.',
    how: ['Create APIs', 'Handle requests and responses']
  },
  {
    title: '🗄️ 7. MongoDB Atlas (Database)',
    url: 'https://www.mongodb.com/cloud/atlas',
    what: 'Cloud-based NoSQL database for flexible data storage.',
    how: ['Create account', 'Create cluster', 'Get connection string']
  },
  {
    title: '🧪 8. Postman (API Testing)',
    url: 'https://www.postman.com/',
    what: 'Tool for testing backend endpoints before frontend integration.',
    how: ['Test GET/POST APIs', 'Check responses']
  },
  {
    title: '🚀 9. Vercel (FE Deployment)',
    url: 'https://vercel.com/',
    what: 'Best platform for hosting React applications.',
    how: ['Connect GitHub', 'Deploy frontend', 'Get live URL']
  },
  {
    title: '🚀 10. Render (BE Deployment)',
    url: 'https://render.com/',
    what: 'Reliable hosting for Node/Express APIs.',
    how: ['Upload code', 'Add variables', 'Deploy API']
  },
  {
    title: '🤖 11. AI API (Gemini/OpenAI)',
    url: 'https://ai.google.dev/',
    what: 'Add intelligence to your app via APIs.',
    how: ['Get API key', 'Store in .env', 'Call from backend']
  },
  {
    title: '🌐 12. Axios (API Calls)',
    url: 'https://axios-http.com/',
    what: 'Promise-based HTTP client for the browser and node.js.',
    how: ['Fetch data', 'Send POST requests']
  },
  {
    title: '🔄 13. React Router',
    url: 'https://reactrouter.com/',
    what: 'Standard library for navigation in React.',
    how: ['Create multiple pages', 'Handle navigation']
  },
  {
    title: '🧰 14. Chrome DevTools',
    url: 'https://developer.chrome.com/docs/devtools/',
    what: 'Built-in debugging tools for web developers.',
    how: ['Debug errors', 'Check console logs', 'Inspect UI']
  },
  {
    title: '📁 15. Starter Templates',
    url: 'https://github.com/topics/mern-stack',
    what: 'Open-source code to jumpstart your full-stack journey.',
    how: ['Download starter code', 'Modify for project']
  }
];

export default function BeginnerGuide() {
  return (
    <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', gap: '48px', color: '#0f172a' }}>
      
      {/* 📘 MASTER TITLE */}
      <div style={{ textAlign: 'center', padding: '80px 0', background: '#ffffff', borderRadius: '40px', border: '1px solid #bfdbfe', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
         <h1 style={{ fontSize: '48px', fontWeight: '950', margin: 0, textTransform: 'uppercase', letterSpacing: '4px', color: '#1e3a8a' }}>🚀 FULL STACK ACADEMY</h1>
         <p style={{ color: '#475569', fontSize: '20px', marginTop: '16px', fontWeight: '700' }}>Master your build with this step-by-step technical console.</p>
      </div>

      {/* 📚 1. THE 15 GUIDE MODULES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '24px' }}>
         {GUIDE_SECTIONS.map((section, idx) => (
            <div key={idx} style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '24px', 
                padding: '40px',
                position: 'relative',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1e3a8a', margin: 0 }}>{section.title}</h2>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {section.links.map((link, lIdx) => (
                            <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 16px', borderRadius: '80px', fontSize: '11px', fontWeight: '900', textDecoration: 'none', border: '1px solid #bfdbfe' }}>{link.label} ↗</a>
                        ))}
                    </div>
                </div>
                <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6' }}>{section.desc}</p>
                <div style={{ marginTop: '24px', padding: '24px', background: '#eff6ff', borderRadius: '16px', border: '1px solid #bfdbfe' }}>
                    <div style={{ fontSize: '12px', fontWeight: '900', color: '#2563eb', letterSpacing: '2px', marginBottom: '16px' }}>HOW TO USE:</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {section.how.map((step, sIdx) => (
                            <li key={sIdx} style={{ fontSize: '14px', color: '#0f172a', fontWeight: '700' }}><span style={{ color: '#2563eb', marginRight: '8px' }}>✔</span> {step}</li>
                        ))}
                    </ul>
                </div>
            </div>
         ))}
      </div>

      <div style={{ height: '40px' }}></div>

      {/* 📚 2. RESOURCES & TOOLS GRID (NEW) */}
      <div style={{ padding: '60px', background: '#ffffff', borderRadius: '40px', border: '1px solid #bfdbfe', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
            <div style={{ fontSize: '32px' }}>📚</div>
            <h2 style={{ fontSize: '32px', fontWeight: '900', margin: 0, color: '#1e3a8a' }}>Resources & Tools</h2>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {MASTER_RESOURCES.map((r, idx) => (
                <div key={idx} style={{ 
                    background: '#f8fafc', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '20px', 
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                }}>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>{r.title}</div>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '13px', fontWeight: '800', textDecoration: 'none' }}>Download/Visit ↗</a>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{r.what}</p>
                    {r.extra && <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '800' }}>{r.extra}</div>}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                        {r.how.map((step, sIdx) => (
                            <div key={sIdx} style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>• {step}</div>
                        ))}
                    </div>
                </div>
            ))}
         </div>
      </div>

      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b', fontSize: '14px', fontWeight: '800' }}>
         MASTER TECHNICAL CONSOLE • COMPLETE 2026 EDITION
      </div>

    </div>
  );
}

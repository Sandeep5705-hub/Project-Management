import React, { useState, useEffect } from 'react';

const QUIZ_DATA = {
  1: {
    title: "📘 QUIZ 1: RESEARCH PAPERS + IEEE + PROBLEM STATEMENT",
    questions: [
      { q: "What is the main purpose of a research paper?", o: ["To design UI", "To present new knowledge or solution", "To write code", "To test software"], a: "To present new knowledge or solution" },
      { q: "What does IEEE stand for?", o: ["International Engineering Event", "Institute of Electrical and Electronics Engineers", "Internet Engineering Group", "Software Research Body"], a: "Institute of Electrical and Electronics Engineers" },
      { q: "Which section gives a brief overview of the paper?", o: ["Methodology", "Abstract", "Conclusion", "References"], a: "Abstract" },
      { q: "What should a strong problem statement include?", o: ["Code", "Clear description of real-world issue", "UI design", "Images"], a: "Clear description of real-world issue" },
      { q: "What is a research gap?", o: ["Gap in UI", "Missing solution in existing research", "Coding error", "Database issue"], a: "Missing solution in existing research" },
      { q: "Which section explains how the solution is implemented?", o: ["Abstract", "Methodology", "References", "Title"], a: "Methodology" },
      { q: "Why do we study existing research papers?", o: ["For copying", "To understand previous solutions and limitations", "For styling", "For coding"], a: "To understand previous solutions and limitations" },
      { q: "What is the role of introduction in an IEEE paper?", o: ["Code explanation", "Overview of problem and importance", "Testing", "Output"], a: "Overview of problem and importance" },
      { q: "What is the purpose of conclusion?", o: ["Add new topic", "Summarize results and findings", "Add code", "Add diagrams"], a: "Summarize results and findings" },
      { q: "What is included in the references section?", o: ["Code", "Sources used in research", "UI", "Testing"], a: "Sources used in research" },
      { q: "What defines a good research problem?", o: ["Complex code", "Real-world relevance and clarity", "Long text", "Design"], a: "Real-world relevance and clarity" },
      { q: "What is novelty in research?", o: ["Old idea", "New and unique contribution", "Code", "Testing"], a: "New and unique contribution" },
      { q: "What is a literature survey?", o: ["Writing code", "Study of existing research papers", "UI design", "Deployment"], a: "Study of existing research papers" },
      { q: "What should NOT be in a problem statement?", o: ["Clear explanation", "Ambiguous or unclear statements", "Real-world issue", "Objective"], a: "Ambiguous or unclear statements" },
      { q: "What is methodology in research?", o: ["UI design", "Step-by-step solution approach", "Testing", "Deployment"], a: "Step-by-step solution approach" },
      { q: "What is expected in the results section?", o: ["Code", "Output and performance of system", "UI", "References"], a: "Output and performance of system" },
      { q: "Why is problem statement important?", o: ["Not needed", "Defines direction of project", "Only for PPT", "For UI"], a: "Defines direction of project" },
      { q: "What is a hypothesis in research?", o: ["Guess or assumption to test", "Code", "UI", "Diagram"], a: "Guess or assumption to test" },
      { q: "What makes an IEEE paper strong?", o: ["Length", "Clear structure and valid research", "More images", "Colors"], a: "Clear structure and valid research" },
      { q: "What is the first step before building a project?", o: ["Coding", "Identifying problem from research papers", "Testing", "Deployment"], a: "Identifying problem from research papers" }
    ]
  },
  2: {
    title: "⚙️ QUIZ 2: FULL-STACK DEVELOPMENT (REACT + NODE.JS + MONGODB)",
    questions: [
      { q: "What is the primary purpose of an API (Application Programming Interface)?", o: ["To design the user interface", "To allow different software applications to communicate with each other", "To manage database server hardware", "To scan for malware in source code"], a: "To allow different software applications to communicate with each other" },
      { q: "Which of the following is a common architectural style for web APIs?", o: ["REST", "TCP", "HTML", "CSS"], a: "REST" },
      { q: "What does JWT stand for in the context of web authentication?", o: ["Java Web Tool", "JSON Web Token", "JavaScript Window Toolkit", "Joint Workflow Terminal"], a: "JSON Web Token" },
      { q: "Which HTTP method is traditionally used to create a new resource on a server?", o: ["GET", "DELETE", "POST", "PATCH"], a: "POST" },
      { q: "What is the main function of bcrypt in user authentication?", o: ["To hash and salt passwords securely", "To compress user profile images", "To establish a web socket connection", "To send email verification links"], a: "To hash and salt passwords securely" },
      { q: "In a MERN stack application, what role does Express.js play?", o: ["Frontend framework", "Database management system", "Backend web application framework", "State management library"], a: "Backend web application framework" },
      { q: "What is the standard data format used when communicating with a REST API?", o: ["XML", "CSV", "JSON", "YAML"], a: "JSON" },
      { q: "Which Git command is used to save your changes to the local repository?", o: ["git push", "git commit", "git pull", "git clone"], a: "git commit" },
      { q: "What is CORS in the context of web development?", o: ["Cross-Origin Resource Sharing", "Cascading Option Rules Sheet", "Client-Object Route System", "Core Operations Routing Server"], a: "Cross-Origin Resource Sharing" },
      { q: "Which tool is commonly used to test REST APIs during development?", o: ["Photoshop", "Postman", "Jenkins", "Docker"], a: "Postman" },
      { q: "What does a 404 HTTP status code mean?", o: ["Internal Server Error", "Unauthorized", "Bad Request", "Not Found"], a: "Not Found" },
      { q: "How is authentication state typically persisted on the client side in a React application?", o: ["In a physical file on the desktop", "Using LocalStorage or HttpOnly Cookies", "Inside the package.json file", "By hardcoding it into the CSS"], a: "Using LocalStorage or HttpOnly Cookies" },
      { q: "Which package manager is installed by default with Node.js?", o: ["Yarn", "Bower", "npm", "Pip"], a: "npm" },
      { q: "What is the primary purpose of Redux in a React application?", o: ["To handle CSS animations", "To manage global application state", "To create database tables", "To deploy the application to AWS"], a: "To manage global application state" },
      { q: "Which MongoDB function is used to find a single document specifying a unique ID?", o: ["lookup()", "searchOne()", "findById()", "selectNode()"], a: "findById()" },
      { q: "In the context of software projects, what does 'CI/CD' stand for?", o: ["Code Integration / Code Deployment", "Continuous Integration / Continuous Deployment", "Custom Interface / Core Database", "Client Interaction / Client Delivery"], a: "Continuous Integration / Continuous Deployment" },
      { q: "What is OAuth primarily used for?", o: ["Encrypting databases", "Third-party delegated authorization", "Compiling source code", "Load balancing servers"], a: "Third-party delegated authorization" },
      { q: "Which React hook is used to run side effects like data fetching?", o: ["useState", "useContext", "useEffect", "useReducer"], a: "useEffect" },
      { q: "What does a 200 HTTP status code indicate?", o: ["Created", "OK (Success)", "Moved Permanently", "Forbidden"], a: "OK (Success)" },
      { q: "What is the purpose of the 'Authorization' header in an HTTP request?", o: ["To pass the client's screen resolution", "To specify the acceptable response formats", "To supply credentials proving the client's identity", "To declare the size of the request payload"], a: "To supply credentials proving the client's identity" }
    ]
  },
  3: {
    title: "🛡️ QUIZ 3: TESTING, SECURITY & FINAL VIVA PREPARATION",
    questions: [
      { q: "What is the purpose of unit testing?", o: ["Test the whole app", "Test individual functions/modules in isolation", "Test UI colors", "Test deployment pipeline"], a: "Test individual functions/modules in isolation" },
      { q: "Which tool is commonly used for testing in JavaScript/React?", o: ["Mongoose", "Jest", "Express", "MongoDB Compass"], a: "Jest" },
      { q: "What does CI/CD stand for?", o: ["Code Input/Code Delivery", "Continuous Integration / Continuous Delivery", "Create Interface / Control Data", "Central Input / Central Data"], a: "Continuous Integration / Continuous Delivery" },
      { q: "What does a 'Smoke Test' verify?", o: ["Full system logic in detail", "Basic core functionality works", "Database query speed", "Network packet traffic"], a: "Basic core functionality works" },
      { q: "SSL/TLS is used for...", o: ["Making websites look good", "Encrypting data in transit between client and server", "Running database queries", "Managing API routing"], a: "Encrypting data in transit between client and server" },
      { q: "What is a 'Regression Test'?", o: ["Testing brand new features only", "Ensuring existing features still work after code changes", "Speed benchmarking", "UI pixel comparison"], a: "Ensuring existing features still work after code changes" },
      { q: "What should a '.env' file store?", o: ["UI components", "Environment-specific secrets and configuration variables", "Database schemas", "Test case results"], a: "Environment-specific secrets and configuration variables" },
      { q: "Vercel is best suited for deploying...", o: ["MongoDB Databases", "Frontend React / Next.js applications", "Email servers", "Native mobile apps"], a: "Frontend React / Next.js applications" },
      { q: "What is a 'Penetration Test'?", o: ["Performance benchmarking", "A simulated cyber attack to find security vulnerabilities", "UI accessibility test", "Database load test"], a: "A simulated cyber attack to find security vulnerabilities" },
      { q: "What does Docker help developers achieve?", o: ["Better website styling", "Containerizing apps for consistent environments", "Writing better database schemas", "Making faster API calls"], a: "Containerizing apps for consistent environments" },
      { q: "What is 'User Acceptance Testing' (UAT)?", o: ["Internal developer testing", "Final validation testing by the actual end users", "Speed benchmarking", "Automated code review"], a: "Final validation testing by the actual end users" },
      { q: "What is lazy loading in frontend development?", o: ["Making the app load slower", "Loading components/resources only when they are needed", "Pre-caching all data upfront", "Compressing all images on upload"], a: "Loading components/resources only when they are needed" },
      { q: "What is 'Technical Debt'?", o: ["Money owed to a software vendor", "The future cost of rework resulting from shortcuts taken now", "Monthly server hosting costs", "Cost of running tests"], a: "The future cost of rework resulting from shortcuts taken now" },
      { q: "A final academic project submission must include...", o: ["Source code only", "Source code, full report, and a presentation (PPT)", "Only the PowerPoint slides", "Only a README file"], a: "Source code, full report, and a presentation (PPT)" },
      { q: "What is 'Load Testing'?", o: ["Checking the size of files", "Testing system performance under heavy user traffic", "Verifying page color themes", "Checking JavaScript syntax errors"], a: "Testing system performance under heavy user traffic" },
      { q: "What is 'SEO' in web development?", o: ["Styling Engine Optimization", "Search Engine Optimization", "State End Object in React", "Secure Entry Object"], a: "Search Engine Optimization" },
      { q: "What is the main goal of a code review process?", o: ["Writing new features faster", "Ensuring code quality, catching bugs, and knowledge sharing", "Deploying to production", "Designing the database schema"], a: "Ensuring code quality, catching bugs, and knowledge sharing" },
      { q: "What is 'Tree Shaking' in JavaScript bundlers?", o: ["Removing tree images from website", "Eliminating unused/dead code from the final production bundle", "Creating hierarchical folder structures", "Organizing database collections"], a: "Eliminating unused/dead code from the final production bundle" },
      { q: "What is 'Performance Profiling'?", o: ["Styling a profile page", "Measuring system speed and identifying bottlenecks", "Creating user accounts", "Writing documentation"], a: "Measuring system speed and identifying bottlenecks" },
      { q: "What happens AFTER a project is deployed to production?", o: ["Project is permanently closed", "Continuous monitoring, feedback collection, and bug fixing", "Code is deleted from servers", "The dev team is disbanded"], a: "Continuous monitoring, feedback collection, and bug fixing" }
    ]
  }
};

export default function AssessmentSystem({ quizNum, projectId }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // ← NEW: selected but not confirmed
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isFinished, setIsFinished] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ← success animation
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [startTime] = useState(Date.now());
  const [finalScore, setFinalScore] = useState(0);

  const data = QUIZ_DATA[quizNum];
  const questions = data.questions;
  const isLastQuestion = currentIdx === questions.length - 1;

  useEffect(() => {
    if (timeLeft > 0 && !isFinished && !isReadyToSubmit) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished) {
      finishQuiz(score);
    }
  }, [timeLeft, isFinished, isReadyToSubmit]);

  // 🛡️ STRICT NAVIGATION LOCK
  useEffect(() => {
    localStorage.setItem(`quiz_active_${projectId}`, 'true');
    localStorage.setItem(`quiz_current_num_${projectId}`, String(quizNum));
    const handleUnload = (e) => { e.preventDefault(); e.returnValue = "Quiz in progress!"; };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      if (localStorage.getItem(`quiz_active_${projectId}`) === 'true') finishQuiz(score);
    };
  }, [projectId, quizNum]);

  const finishQuiz = (finalScore) => {
    setIsFinished(true);
    const speed = Math.round((Date.now() - startTime) / 1000);
    const s = typeof finalScore === 'number' ? finalScore : score;
    const accuracy = Math.round((s / questions.length) * 100);

    // Unlock next quiz
    const progress = JSON.parse(localStorage.getItem(`quiz_progress_${projectId}`) || '{"q1":true,"q2":false,"q3":false}');
    const nextQ = `q${parseInt(quizNum) + 1}`;
    if (nextQ in progress) progress[nextQ] = true;
    localStorage.setItem(`quiz_progress_${projectId}`, JSON.stringify(progress));

    // Mark this quiz complete in partial progress
    const partial = JSON.parse(localStorage.getItem(`quiz_partial_${projectId}`) || '{"q1":0,"q2":0,"q3":0}');
    partial[`q${quizNum}`] = questions.length;
    localStorage.setItem(`quiz_partial_${projectId}`, JSON.stringify(partial));

    // Save performance stats
    const prev = JSON.parse(localStorage.getItem(`performance_stats_${projectId}`) || '{"totalScore":0,"quizzesDone":0}');
    prev.totalScore = (prev.totalScore || 0) + s * 10;
    prev.quizzesDone = (prev.quizzesDone || 0) + 1;
    prev[`quiz${quizNum}`] = { score: s * 10, accuracy, speed, date: new Date().toLocaleDateString() };
    localStorage.setItem(`performance_stats_${projectId}`, JSON.stringify(prev));

    localStorage.removeItem(`quiz_active_${projectId}`);
    localStorage.removeItem(`quiz_current_num_${projectId}`);
  };

  // ── Confirm selected answer and move to next / show submit screen ──
  const handleNext = () => {
    if (!selectedOption) return;

    const newScore = selectedOption === questions[currentIdx].a ? score + 1 : score;
    setScore(newScore);
    setSelectedOption(null);

    // Track partial progress
    const partial = JSON.parse(localStorage.getItem(`quiz_partial_${projectId}`) || '{"q1":0,"q2":0,"q3":0}');
    partial[`q${quizNum}`] = currentIdx + 1;
    localStorage.setItem(`quiz_partial_${projectId}`, JSON.stringify(partial));

    if (isLastQuestion) {
      // Pass newScore since state hasn't updated yet
      setFinalScore(newScore);
      setIsReadyToSubmit(true);
    } else {
      setCurrentIdx(idx => idx + 1);
    }
  };

  const handleSubmit = () => {
    finishQuiz(finalScore);
    setShowSuccess(true);
    // After 2.5 seconds show the result screen
    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  };

  // ─── SUCCESS ANIMATION SCREEN ──────────────────────────────────
  if (showSuccess) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at center, #ffffff 0%, #eff6ff 70%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, flexDirection: 'column', gap: '24px'
      }}>
        {/* Animated checkmark */}
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'rgba(16,185,129,0.15)',
          border: '3px solid #10b981',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '56px',
          boxShadow: '0 0 60px rgba(16,185,129,0.3), 0 0 120px rgba(16,185,129,0.1)',
          animation: 'pulse 1s ease-in-out infinite'
        }}>✅</div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '950', color: '#1e3a8a', margin: 0, letterSpacing: '-1px' }}>Submitted Successfully!</h2>
          <p style={{ color: '#10b981', fontSize: '18px', marginTop: '12px', fontWeight: '700' }}>Your score and points have been recorded. 🏆</p>
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
          <div style={{ padding: '20px 32px', background: '#eff6ff', borderRadius: '16px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: '900', letterSpacing: '2px', marginBottom: '8px' }}>ACCURACY</div>
            <div style={{ fontSize: '28px', fontWeight: '950', color: '#1e3a8a' }}>{Math.round((finalScore / questions.length) * 100)}%</div>
          </div>
          <div style={{ padding: '20px 32px', background: '#d1fae5', borderRadius: '16px', border: '1px solid #6ee7b7', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#10b981', fontWeight: '900', letterSpacing: '2px', marginBottom: '8px' }}>POINTS EARNED</div>
            <div style={{ fontSize: '28px', fontWeight: '950', color: '#064e3b' }}>+{finalScore * 10} pts</div>
          </div>
        </div>
        <p style={{ color: '#475569', fontSize: '14px', fontWeight: '700', marginTop: '8px' }}>Redirecting to results...</p>
      </div>
    );
  }

  // ─── RESULT SCREEN ──────────────────────────────────────────────
  if (isFinished) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <div style={{ padding: '60px', background: '#ffffff', borderRadius: '32px', border: '1px solid #bfdbfe', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ fontSize: '72px', marginBottom: '24px' }}>🏆</div>
          <h2 style={{ fontSize: '36px', fontWeight: '950', color: '#1e3a8a', marginBottom: '8px' }}>Assessment Complete!</h2>
          <p style={{ color: '#475569', marginBottom: '40px', fontSize: '18px' }}>Your technical validation is officially recorded on the leaderboard.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '40px' }}>
            <div style={{ padding: '24px 16px', background: '#eff6ff', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
              <div style={{ fontSize: '9px', color: '#2563eb', fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' }}>ACCURACY</div>
              <div style={{ fontSize: '30px', fontWeight: '950', color: '#1d4ed8' }}>{Math.round((finalScore / questions.length) * 100)}%</div>
            </div>
            <div style={{ padding: '24px 16px', background: '#d1fae5', borderRadius: '20px', border: '1px solid #6ee7b7' }}>
              <div style={{ fontSize: '9px', color: '#10b981', fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' }}>POINTS</div>
              <div style={{ fontSize: '30px', fontWeight: '950', color: '#064e3b' }}>+{finalScore * 10}</div>
            </div>
            <div style={{ padding: '24px 16px', background: '#fef3c7', borderRadius: '20px', border: '1px solid #fde68a' }}>
              <div style={{ fontSize: '9px', color: '#f59e0b', fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' }}>CORRECT</div>
              <div style={{ fontSize: '30px', fontWeight: '950', color: '#b45309' }}>{finalScore}/{questions.length}</div>
            </div>
          </div>
          {/* Next phase hint */}
          {parseInt(quizNum) < 3 && (
            <div style={{ padding: '16px', background: 'rgba(59,130,246,0.06)', borderRadius: '14px', border: '1px solid rgba(59,130,246,0.1)', marginBottom: '28px', fontSize: '14px', color: '#60a5fa', fontWeight: '700' }}>
              🔓 Phase {parseInt(quizNum) + 1} has been unlocked! Head to Assessments to continue.
            </div>
          )}
          {parseInt(quizNum) === 3 && (
            <div style={{ padding: '16px', background: 'rgba(16,185,129,0.06)', borderRadius: '14px', border: '1px solid rgba(16,185,129,0.1)', marginBottom: '28px', fontSize: '14px', color: '#10b981', fontWeight: '700' }}>
              🎉 Congratulations! All 3 phases completed. Full project validation achieved!
            </div>
          )}
          <button onClick={() => window.location.reload()} className="btn-azure" style={{ padding: '20px 56px', borderRadius: '16px', fontWeight: '950', fontSize: '16px' }}>
            ← Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  // ─── QUIZ SCREEN ────────────────────────────────────────────────
  return (
    <div style={{ padding: '40px 60px', maxWidth: '900px' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '950', margin: 0, letterSpacing: '-1px', color: '#1e3a8a' }}>{data.title}</h1>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '8px', fontWeight: '700', letterSpacing: '2px' }}>VALIDATION IN PROGRESS</p>
        </div>
        <div style={{ padding: '14px 28px', background: '#fef2f2', borderRadius: '14px', border: '1px solid #fca5a5', color: '#ef4444', fontWeight: '950', fontSize: '18px', flexShrink: 0 }}>
          ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {/* QUESTION CARD */}
      <div style={{ background: '#ffffff', padding: '48px', borderRadius: '28px', border: '1px solid #bfdbfe', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '36px' }}>
          <div style={{ padding: '6px 16px', background: '#2563eb', borderRadius: '8px', fontSize: '12px', fontWeight: '950', color: 'white' }}>
            Q {currentIdx + 1} / {questions.length}
          </div>
          <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${((currentIdx + 1) / questions.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: '3px', transition: '0.4s ease' }} />
          </div>
          <div style={{ fontSize: '12px', color: '#475569', fontWeight: '900' }}>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</div>
        </div>

        {/* Question */}
        <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', marginBottom: '36px', lineHeight: '1.5' }}>
          {questions[currentIdx].q}
        </h2>

        {/* Options — select but don't auto-advance */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
          {questions[currentIdx].o.map((opt, i) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                key={i}
                onClick={() => setSelectedOption(opt)}
                style={{
                  padding: '20px 24px',
                  textAlign: 'left',
                  background: isSelected ? '#eff6ff' : '#ffffff',
                  border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  borderRadius: '16px',
                  color: isSelected ? '#1d4ed8' : '#475569',
                  fontSize: '15px',
                  fontWeight: isSelected ? '800' : '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: isSelected ? '0 4px 6px -1px rgba(37, 99, 235, 0.1)' : 'none'
                }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  border: isSelected ? '2px solid #2563eb' : '2px solid #cbd5e1',
                  background: isSelected ? '#2563eb' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
                </div>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        {!isReadyToSubmit ? (
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className="btn-azure"
            style={{
              width: '100%', padding: '20px', borderRadius: '16px',
              fontWeight: '950', fontSize: '16px',
              opacity: selectedOption ? 1 : 0.4,
              cursor: selectedOption ? 'pointer' : 'not-allowed',
              letterSpacing: '1px'
            }}
          >
            {isLastQuestion ? '📋 Review & Submit' : 'Next Question →'}
          </button>
        ) : (
          /* FINAL SUBMIT BUTTON — appears inline after last question */
          <div style={{ padding: '32px', background: '#d1fae5', borderRadius: '20px', border: '1px solid #6ee7b7', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏁</div>
            <h3 style={{ color: '#064e3b', fontWeight: '950', fontSize: '22px', marginBottom: '8px' }}>All Questions Answered!</h3>
            <p style={{ color: '#047857', marginBottom: '24px', fontSize: '15px' }}>Click Submit to officially record your score on the team leaderboard.</p>
            <button
              onClick={handleSubmit}
              className="btn-azure"
              style={{ padding: '20px 64px', borderRadius: '16px', fontWeight: '950', fontSize: '18px', background: '#10b981', color: 'white', border: 'none' }}
            >
              ✅ SUBMIT ASSESSMENT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

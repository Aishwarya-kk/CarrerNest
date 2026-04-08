import { Routes, Route, Link } from "react-router-dom";
import { careers } from "./data";
import RegisterPage from "./RegisterPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import CareerPage from "./CareerPage";
import ReviewPage from "./ReviewPage";
import SplashScreen from "./SplashScreen";
import { useState } from "react";

function Home() {
  const [answers, setAnswers] = useState({
    coding: "",
    problem: "",
    design: "",
    data: "",
    logic: ""
  });

  const [result, setResult] = useState([]);

  // AI CAREER FORM
  const [careerForm, setCareerForm] = useState({
    interest: "",
    skills: "",
    domain: "",
    level: "",
    time: ""
  });

  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [bestRoleData, setBestRoleData] = useState(null);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleCareerFormChange = (e) => {
    setCareerForm({ ...careerForm, [e.target.name]: e.target.value });
  };

  // QUIZ SUGGESTION
  const handleQuiz = () => {
    let frontend = 0;
    let backend = 0;
    let dataAnalyst = 0;
    let blockchain = 0;
    let fullstack = 0;
    let dataScience = 0;
    let sqlDeveloper = 0;

    if (answers.coding === "yes") {
      frontend += 2;
      backend += 2;
      fullstack += 2;
      blockchain += 1;
      dataScience += 1;
    }

    if (answers.problem === "yes") {
      backend += 2;
      blockchain += 2;
      dataScience += 1;
      fullstack += 1;
      sqlDeveloper += 1;
    }

    if (answers.design === "yes") {
      frontend += 3;
      fullstack += 1;
    }

    if (answers.data === "yes") {
      dataAnalyst += 3;
      dataScience += 2;
      sqlDeveloper += 2;
    }

    if (answers.logic === "yes") {
      backend += 2;
      blockchain += 2;
      sqlDeveloper += 2;
      fullstack += 1;
    }

    const scores = {
      "Front End Developer": frontend,
      "Back End Developer": backend,
      "Data Analyst": dataAnalyst,
      "Blockchain Developer": blockchain,
      "Full Stack Developer": fullstack,
      "Data Science": dataScience,
      "SQL Developer": sqlDeveloper
    };

    const sortedCareers = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    setResult(sortedCareers);
  };

  // ROADMAP + PLATFORM DATA
  const careerDetails = {
    "Front End Developer": {
      roadmap: "HTML → CSS → JavaScript → React → Projects",
      platforms: "Udemy, Scaler, FreeCodeCamp, YouTube"
    },
    "Back End Developer": {
      roadmap: "HTML Basics → JavaScript → Node.js → Express → MongoDB / MySQL",
      platforms: "Udemy, Scaler, Coursera, YouTube"
    },
    "Full Stack Developer": {
      roadmap: "HTML → CSS → JavaScript → React → Node.js → Database → Projects",
      platforms: "Udemy, Scaler, FreeCodeCamp, YouTube"
    },
    "Data Analyst": {
      roadmap: "Excel → SQL → Python → Power BI / Tableau → Projects",
      platforms: "Coursera, Udemy, Simplilearn, YouTube"
    },
    "Data Science": {
      roadmap: "Python → Statistics → Pandas → Machine Learning → Projects",
      platforms: "Coursera, Udemy, Kaggle, YouTube"
    },
    "Blockchain Developer": {
      roadmap: "Solidity → Ethereum → Smart Contracts → Web3.js → DApps",
      platforms: "Alchemy University, Udemy, YouTube"
    },
    "SQL Developer": {
      roadmap: "SQL Basics → Joins → Queries → Procedures → Database Projects",
      platforms: "Udemy, W3Schools, YouTube"
    }
  };

  // AI CAREER RECOMMENDATION
  const handleAiCareerRecommendation = () => {
    let frontend = 0;
    let backend = 0;
    let dataAnalyst = 0;
    let blockchain = 0;
    let fullstack = 0;
    let dataScience = 0;
    let sqlDeveloper = 0;

    const interest = careerForm.interest.toLowerCase();
    const skills = careerForm.skills.toLowerCase();
    const domain = careerForm.domain.toLowerCase();
    const level = careerForm.level.toLowerCase();
    const time = careerForm.time.toLowerCase();

    if (interest.includes("design")) frontend += 3;
    if (interest.includes("coding")) {
      frontend += 2;
      backend += 2;
      fullstack += 2;
    }
    if (interest.includes("data")) {
      dataAnalyst += 3;
      dataScience += 3;
      sqlDeveloper += 2;
    }
    if (interest.includes("problem")) {
      backend += 2;
      blockchain += 2;
      fullstack += 1;
    }
    if (interest.includes("logic")) {
      backend += 2;
      blockchain += 2;
      sqlDeveloper += 2;
    }

    if (skills.includes("html")) frontend += 2;
    if (skills.includes("css")) frontend += 2;
    if (skills.includes("javascript")) {
      frontend += 2;
      backend += 1;
      fullstack += 2;
    }
    if (skills.includes("react")) {
      frontend += 3;
      fullstack += 2;
    }
    if (skills.includes("sql")) sqlDeveloper += 3;
    if (skills.includes("python")) {
      dataScience += 3;
      dataAnalyst += 2;
    }
    if (skills.includes("excel")) dataAnalyst += 3;
    if (skills.includes("node")) backend += 3;
    if (skills.includes("solidity")) blockchain += 4;

    if (domain === "frontend") frontend += 5;
    if (domain === "backend") backend += 5;
    if (domain === "fullstack") fullstack += 5;
    if (domain === "data analyst") dataAnalyst += 5;
    if (domain === "data science") dataScience += 5;
    if (domain === "blockchain") blockchain += 5;
    if (domain === "sql") sqlDeveloper += 5;

    if (level === "beginner") {
      frontend += 2;
      dataAnalyst += 2;
      sqlDeveloper += 2;
    }
    if (level === "intermediate") {
      backend += 1;
      fullstack += 2;
      dataScience += 1;
    }
    if (level === "advanced") {
      blockchain += 2;
      dataScience += 2;
      backend += 1;
    }

    if (time === "1 hr/day") {
      frontend += 2;
      sqlDeveloper += 2;
      dataAnalyst += 1;
    }
    if (time === "2 hrs/day") {
      fullstack += 2;
      backend += 1;
      frontend += 1;
    }
    if (time === "3+ hrs/day") {
      blockchain += 2;
      dataScience += 2;
      fullstack += 2;
    }

    const scores = {
      "Front End Developer": frontend,
      "Back End Developer": backend,
      "Data Analyst": dataAnalyst,
      "Blockchain Developer": blockchain,
      "Full Stack Developer": fullstack,
      "Data Science": dataScience,
      "SQL Developer": sqlDeveloper
    };

    const sortedCareers = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    setAiSuggestions(sortedCareers);

    const bestRole = sortedCareers[0][0];
    setBestRoleData({
      role: bestRole,
      roadmap: careerDetails[bestRole].roadmap,
      platforms: careerDetails[bestRole].platforms
    });
  };

  return (
    <div className="home">
      {/* HERO */}
      <div className="hero-section">
        <h1>🚀 Career Path Explorer</h1>
        <p>Select your path and start your learning journey</p>
      </div>

      {/* MINI QUIZ */}
      <div className="quiz-section">
        <h2>🧠 Mini Quiz / Self Assessment</h2>
        <p>Answer these questions and get your career suggestion</p>

        <div className="quiz-grid">
          <div className="quiz-question">
            <label>Do you like coding?</label>
            <select name="coding" onChange={handleChange}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="quiz-question">
            <label>Do you enjoy solving problems?</label>
            <select name="problem" onChange={handleChange}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="quiz-question">
            <label>Do you like design / UI?</label>
            <select name="design" onChange={handleChange}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="quiz-question">
            <label>Do you like working with data?</label>
            <select name="data" onChange={handleChange}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="quiz-question">
            <label>Do you enjoy logic and systems?</label>
            <select name="logic" onChange={handleChange}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <button className="quiz-btn" onClick={handleQuiz}>
          Get Suggestion
        </button>

        {result.length > 0 && (
          <div className="quiz-result">
            <p>🥇 <strong>Best Match:</strong> <span>{result[0][0]}</span></p>
            {result[1] && (
              <p>🥈 <strong>Second Match:</strong> <span>{result[1][0]}</span></p>
            )}
            {result[2] && (
              <p>🥉 <strong>Third Match:</strong> <span>{result[2][0]}</span></p>
            )}
          </div>
        )}
      </div>

      {/* AI CAREER RECOMMENDATION */}
      <div className="ai-section">
        <h2>⭐ AI Career Recommendation Box</h2>
        <p>Enter your interests and get a smart career recommendation</p>

        <div className="ai-grid">
          <div className="quiz-question">
            <label>Interest</label>
            <input
              type="text"
              name="interest"
              placeholder="Example: coding, design, data"
              value={careerForm.interest}
              onChange={handleCareerFormChange}
            />
          </div>

          <div className="quiz-question">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="Example: HTML, CSS, SQL, Python"
              value={careerForm.skills}
              onChange={handleCareerFormChange}
            />
          </div>

          <div className="quiz-question">
            <label>Preferred Domain</label>
            <select name="domain" value={careerForm.domain} onChange={handleCareerFormChange}>
              <option value="">Select</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="data analyst">Data Analyst</option>
              <option value="data science">Data Science</option>
              <option value="blockchain">Blockchain</option>
              <option value="sql">SQL</option>
            </select>
          </div>

          <div className="quiz-question">
            <label>Experience Level</label>
            <select name="level" value={careerForm.level} onChange={handleCareerFormChange}>
              <option value="">Select</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="quiz-question">
            <label>Available Time</label>
            <select name="time" value={careerForm.time} onChange={handleCareerFormChange}>
              <option value="">Select</option>
              <option value="1 hr/day">1 hr/day</option>
              <option value="2 hrs/day">2 hrs/day</option>
              <option value="3+ hrs/day">3+ hrs/day</option>
            </select>
          </div>
        </div>

        <button className="quiz-btn" onClick={handleAiCareerRecommendation}>
          Get AI Recommendation
        </button>

        {aiSuggestions.length > 0 && (
          <div className="quiz-result">
            <p>🥇 <strong>Best Match:</strong> <span>{aiSuggestions[0][0]}</span></p>
            {aiSuggestions[1] && (
              <p>🥈 <strong>Second Match:</strong> <span>{aiSuggestions[1][0]}</span></p>
            )}
            {aiSuggestions[2] && (
              <p>🥉 <strong>Third Match:</strong> <span>{aiSuggestions[2][0]}</span></p>
            )}
          </div>
        )}

        {bestRoleData && (
          <div className="ai-output-card">
            <h3>🎯 Best Role for You: {bestRoleData.role}</h3>
            <p><strong>📚 Suggested Roadmap:</strong> {bestRoleData.roadmap}</p>
            <p><strong>🎓 Recommended Platforms:</strong> {bestRoleData.platforms}</p>
          </div>
        )}
      </div>

      {/* COMMUNITY SECTION */}
      <div className="community-section">
        <h2>👥 Student Community</h2>
        <p>Connect, ask doubts, share projects, and grow with peers</p>

        <div className="community-grid">
          <div className="community-card">
            <h3>💬 Join Discord / Telegram</h3>
            <p>Connect with learners and discuss roadmaps, coding, and career paths.</p>
            <a href="https://discord.com/" target="_blank" rel="noreferrer">
              Join Community
            </a>
          </div>

          <div className="community-card">
            <h3>❓ Ask Doubts</h3>
            <p>Post coding doubts, get help with projects, and solve problems together.</p>
            <a href="https://stackoverflow.com/" target="_blank" rel="noreferrer">
              Ask Questions
            </a>
          </div>

          <div className="community-card">
            <h3>🚀 Share Your Projects</h3>
            <p>Upload or share your mini projects and portfolio work with others.</p>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              Share Projects
            </a>
          </div>

          <div className="community-card">
            <h3>🏆 Weekly Coding Challenge</h3>
            <p>Practice coding every week and improve problem-solving skills.</p>
            <a href="https://leetcode.com/" target="_blank" rel="noreferrer">
              Start Challenge
            </a>
          </div>
        </div>
      </div>

      {/* CAREER CARDS */}
      <div className="career-grid">
        {careers.map((career) => (
          <Link to={`/career/${career.id}`} className="career-card" key={career.id}>
            <div className="career-icon">{career.icon}</div>
            <h2>{career.title}</h2>
            <p>{career.desc}</p>
            <button>Explore Path</button>
          </Link>
        ))}
      </div>

      {/* REVIEW BUTTON */}
      <div className="review-link-box">
        <Link to="/review" className="review-btn">
          ⭐ Give Review
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
 <Route path="/" element={<SplashScreen />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Home />} />
       <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/career/:id" element={<CareerPage />} />
      <Route path="/review" element={<ReviewPage />} />
    </Routes>
  );
}

export default App;

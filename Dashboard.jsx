import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { careers } from "./data";

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  // QUIZ STATE
  const [answers, setAnswers] = useState({
    coding: "",
    problem: "",
    design: "",
    data: "",
    logic: ""
  });

  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

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

    const sortedCareers = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    setResult(sortedCareers.slice(0, 3));
  };

  return (
    <div className="dashboard">
      {/* TOP BAR */}
      <div className="top-bar">
        <h3>Welcome, {username || "User"} 👋</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* HERO */}
      <div className="hero-section">
        <h1>🚀 CareerNest</h1>
        <p>Build Skills. Choose Paths. Shape Your Future.</p>
      </div>

      {/* QUIZ SECTION */}
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
            <p>🥇 <strong>Best Match:</strong> {result[0][0]}</p>
            {result[1] && <p>🥈 <strong>Second Match:</strong> {result[1][0]}</p>}
            {result[2] && <p>🥉 <strong>Third Match:</strong> {result[2][0]}</p>}
          </div>
        )}
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
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="/review">
          <button className="quiz-btn">⭐ Give Review</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
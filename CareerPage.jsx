import { useParams, Link } from "react-router-dom";
import { careers } from "./data";
import { useState } from "react";
import jsPDF from "jspdf";

function CareerPage() {
  const { id } = useParams();
  const career = careers.find((item) => item.id === id);

  const [readiness, setReadiness] = useState({
    skills: 0,
    projects: 0,
    certifications: 0,
    resume: false,
    github: false
  });

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    role: "",
    skills: "",
    projects: "",
    certifications: ""
  });

  if (!career) {
    return (
      <div className="career-page">
        <h1>Career Not Found</h1>
        <Link to="/" className="back-btn">⬅ Back</Link>
      </div>
    );
  }

  const calculateReadiness = () => {
    let skillScore = Math.min(readiness.skills * 10, 40);
    let projectScore = Math.min(readiness.projects * 10, 30);
    let certScore = Math.min(readiness.certifications * 6, 15);
    let resumeScore = readiness.resume ? 10 : 0;
    let githubScore = readiness.github ? 5 : 0;

    return {
      skillScore,
      projectScore,
      certScore,
      resumeScore,
      githubScore,
      total: skillScore + projectScore + certScore + resumeScore + githubScore
    };
  };

  const score = calculateReadiness();

  const downloadResume = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(resumeData.name || "Your Name", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(resumeData.email || "your@email.com", 20, 30);
    doc.text(`Role: ${resumeData.role || career.title}`, 20, 38);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Skills", 20, 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const skillsText = doc.splitTextToSize(
      resumeData.skills || "Your skills will appear here",
      170
    );
    doc.text(skillsText, 20, 63);

    let y = 63 + skillsText.length * 7 + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Projects", 20, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const projectsText = doc.splitTextToSize(
      resumeData.projects || "Your projects will appear here",
      170
    );
    doc.text(projectsText, 20, y + 8);

    y = y + 8 + projectsText.length * 7 + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Certifications", 20, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const certText = doc.splitTextToSize(
      resumeData.certifications || "Your certifications will appear here",
      170
    );
    doc.text(certText, 20, y + 8);

    doc.save(`${resumeData.name || "resume"}.pdf`);
  };

  return (
    <div className="career-page">
      <div className="career-header">
        <span className="career-big-icon">{career.icon}</span>
        <h1>{career.title}</h1>
        <p>{career.desc}</p>
        <a href={career.youtube} target="_blank" rel="noreferrer" className="learn-btn">
          ▶ Start Learning
        </a>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>🛣 Roadmap</h2>
          <ul>
            {career.roadmap.map((step, index) => (
              <li key={index}>Step {index + 1}: {step}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h2>🧠 Skills Required</h2>
          <ul>
            {career.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h2>📊 Skill Progress Tracker</h2>
          <div className="progress-wrapper">
            {career.progress.map((item, index) => (
              <div className="progress-item" key={index}>
                <div className="progress-top">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h2>📜 Certificate Platforms</h2>
          <ul>
            {career.certificates.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h2>💡 Project Ideas</h2>
          <ul>
            {career.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card insights-card">
          <h2>💼 Salary / Career Insights</h2>
          <div className="insight-box">
            <p><strong>Beginner Salary:</strong> {career.salary}</p>
            <p><strong>Top Tools Used:</strong></p>
            <ul>
              {career.tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
            <p><strong>Career Growth Path:</strong></p>
            <div className="growth-path">{career.growth}</div>
          </div>
        </div>
      </div>

      {/* JOB READINESS SCORE */}
      <div className="readiness-section">
        <h2>⭐ Job Readiness Score</h2>
        <p>Check how prepared you are for this career path</p>

        <div className="readiness-form">
          <div className="form-group">
            <label>Skills Learned</label>
            <input
              type="number"
              min="0"
              max="4"
              value={readiness.skills}
              onChange={(e) =>
                setReadiness({ ...readiness, skills: Number(e.target.value) })
              }
            />
          </div>

          <div className="form-group">
            <label>Projects Completed</label>
            <input
              type="number"
              min="0"
              max="3"
              value={readiness.projects}
              onChange={(e) =>
                setReadiness({ ...readiness, projects: Number(e.target.value) })
              }
            />
          </div>

          <div className="form-group">
            <label>Certifications Earned</label>
            <input
              type="number"
              min="0"
              max="3"
              value={readiness.certifications}
              onChange={(e) =>
                setReadiness({ ...readiness, certifications: Number(e.target.value) })
              }
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={readiness.resume}
                onChange={(e) =>
                  setReadiness({ ...readiness, resume: e.target.checked })
                }
              />
              Resume Ready
            </label>

            <label>
              <input
                type="checkbox"
                checked={readiness.github}
                onChange={(e) =>
                  setReadiness({ ...readiness, github: e.target.checked })
                }
              />
              GitHub Profile Added
            </label>
          </div>
        </div>

        <div className="score-card">
          <h3>🎯 Your Job Readiness: {score.total}%</h3>

          <div className="score-bar">
            <div className="score-fill" style={{ width: `${score.total}%` }}></div>
          </div>

          <div className="score-breakdown">
            <p><strong>Skills:</strong> {score.skillScore}/40</p>
            <p><strong>Projects:</strong> {score.projectScore}/30</p>
            <p><strong>Certifications:</strong> {score.certScore}/15</p>
            <p><strong>Resume:</strong> {score.resumeScore}/10</p>
            <p><strong>GitHub:</strong> {score.githubScore}/5</p>
          </div>

          <div className="readiness-message">
            {score.total >= 80 && <p>🚀 You are highly job ready!</p>}
            {score.total >= 50 && score.total < 80 && <p>📈 You are improving well, keep going!</p>}
            {score.total < 50 && <p>📚 Keep learning and building more projects.</p>}
          </div>
        </div>
      </div>

      {/* RESUME BUILDER */}
      <div className="resume-section">
        <h2>📄 Resume Builder</h2>
        <p>Create your simple resume preview for this career</p>

        <div className="resume-grid">
          <div className="resume-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={resumeData.name}
                onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={resumeData.email}
                onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Career Role</label>
              <input
                type="text"
                value={resumeData.role}
                onChange={(e) => setResumeData({ ...resumeData, role: e.target.value })}
                placeholder="Example: Front End Developer"
              />
            </div>

            <div className="form-group">
              <label>Skills</label>
              <textarea
                value={resumeData.skills}
                onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                placeholder="Example: HTML, CSS, JavaScript, React"
              />
            </div>

            <div className="form-group">
              <label>Projects</label>
              <textarea
                value={resumeData.projects}
                onChange={(e) => setResumeData({ ...resumeData, projects: e.target.value })}
                placeholder="Example: Portfolio Website, Weather App"
              />
            </div>

            <div className="form-group">
              <label>Certifications</label>
              <textarea
                value={resumeData.certifications}
                onChange={(e) => setResumeData({ ...resumeData, certifications: e.target.value })}
                placeholder="Example: React Certificate, SQL Basics"
              />
            </div>

            <button className="download-btn" onClick={downloadResume}>
              📥 Download Resume PDF
            </button>
          </div>

          <div className="resume-preview">
            <h3>📑 Resume Preview</h3>
            <div className="resume-box">
              <h2>{resumeData.name || "Your Name"}</h2>
              <p>{resumeData.email || "your@email.com"}</p>
              <p><strong>Role:</strong> {resumeData.role || career.title}</p>

              <div className="resume-block">
                <h4>Skills</h4>
                <p>{resumeData.skills || "Your skills will appear here"}</p>
              </div>

              <div className="resume-block">
                <h4>Projects</h4>
                <p>{resumeData.projects || "Your projects will appear here"}</p>
              </div>

              <div className="resume-block">
                <h4>Certifications</h4>
                <p>{resumeData.certifications || "Your certifications will appear here"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
 <div className="review-btn-box">
  <Link to="/review">
    <button className="review-btn">Go to Review Page ⭐</button>
  </Link>
</div>
   <Link to="/" className="back-btn">⬅ Back to Careers</Link>
    </div>
  );
}

export default CareerPage;
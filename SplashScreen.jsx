import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/register");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-card">
        <div className="logo-circle">🚀</div>
        <h1>CareerNest</h1>
        <p>Build Skills. Choose Paths. Shape Your Future.</p>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <small>Loading your future...</small>
      </div>
    </div>
  );
}

export default SplashScreen;
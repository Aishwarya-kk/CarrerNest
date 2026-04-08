import { useState } from "react";
import { Link } from "react-router-dom";

function ReviewPage() {
  const [review, setReview] = useState({
    rating: "",
    message: "",
    suggestion: "",
    recommend: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!review.rating || !review.message || !review.recommend) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="review-page">
      <div className="review-card">
        <h1>⭐ Review Our App</h1>
        <p>We would love to hear your feedback</p>

        <form onSubmit={handleSubmit}>
          <label>Rate this app</label>
          <select name="rating" value={review.rating} onChange={handleChange}>
            <option value="">Select Rating</option>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Very Good</option>
            <option value="3">⭐⭐⭐ Good</option>
            <option value="2">⭐⭐ Average</option>
            <option value="1">⭐ Poor</option>
          </select>

          <label>Your Feedback</label>
          <textarea
            name="message"
            placeholder="Write your feedback here..."
            value={review.message}
            onChange={handleChange}
          ></textarea>

          <label>Any Suggestions?</label>
          <textarea
            name="suggestion"
            placeholder="Suggest improvements..."
            value={review.suggestion}
            onChange={handleChange}
          ></textarea>

          <label>Would you recommend this app?</label>
          <select
            name="recommend"
            value={review.recommend}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Yes">Yes 👍</option>
            <option value="No">No 👎</option>
          </select>

          <button type="submit">Submit Review</button>
        </form>

        {submitted && (
          <div className="submitted-box">
            <h3>✅ Thank you for your review!</h3>
            <p>Your feedback helps improve this app.</p>
          </div>
        )}

        <Link to="/dashboard" className="back-btn">
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default ReviewPage;
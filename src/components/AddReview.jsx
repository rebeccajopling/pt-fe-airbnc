import React, { useState } from "react";
import axios from "axios";
import "../SingleProperty.css";

function AddReview({ propertyId, selectedUser, onReviewSubmit }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      return;
    }
    setSubmitting(true);

    try {
      const response = await axios.post(
        `/api/properties/${propertyId}/reviews`,
        {
          guest_id: selectedUser.user_id,
          rating,
          comment,
        }
      );
      //reset to default empty review
      setRating(1);
      setComment("");

      onReviewSubmit(response.data.review);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
    setSubmitting(false);
  };

  return (
    <form className="add-review-item" onSubmit={handleSubmit}>
      <img
        src={selectedUser?.avatar}
        alt={`${selectedUser?.first_name} ${selectedUser?.surname}`}
        className="property-user-avatar"
      />
      <div className="review-content">
        <h4>
          {selectedUser.first_name} {selectedUser.surname}
        </h4>
        <div className="select-rating">
          <h4>Select Rating:&nbsp;</h4>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={star <= rating ? "star selected" : "star"}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a review..."
            required
          />
        </div>

        <div>
          <button type="submit" style={{ cursor: "pointer" }}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddReview;

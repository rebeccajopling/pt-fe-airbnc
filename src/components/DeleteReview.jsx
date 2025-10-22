import React, { useState } from "react";
import axios from "axios";

function DeleteReview({ reviewId, guestId, currentUserId, setReviews }) {
  const isCurrentUser = currentUserId === guestId;
  if (!isCurrentUser) {
    return null;
  }

  const deleteReview = async () => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r.review_id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  return (
    <button onClick={deleteReview} className="delete-review-button">
      Delete
    </button>
  );
}

export default DeleteReview;

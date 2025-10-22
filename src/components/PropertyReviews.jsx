import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import AddReview from "./AddReview";

function PropertyReviews({ reviews, setReviews, propertyId, selectedUser }) {
  const [showReviews, setShowReviews] = useState(false);

  async function deleteReview(reviewId) {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r.review_id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  }

  function renderDeleteReviewButton(review) {
    const isCurrentUser = selectedUser?.user_id === review.guest_id;
    if (isCurrentUser) {
      return (
        <button
          onClick={() => deleteReview(review.review_id)}
          className="delete-review-button"
        >
          Delete
        </button>
      );
    }
    return null;
  }

  function renderReviewItem(review) {
    const guestName = review.guest
      ? `${review.guest.first_name} ${review.guest.surname}`
      : "Unknown guest";

    return (
      <li key={review.review_id} className="review-item">
        <Link to={`/users/${review.guest_id}`}>
          <img
            src={review.guest.avatar}
            alt={guestName}
            className="property-user-avatar"
          />
        </Link>
        <div className="review-content">
          <h4>{guestName}</h4>
          <h4>Rating: {"★".repeat(review.rating)}</h4>
          <p>{review.comment}</p>
          <p className="review-date">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
          {renderDeleteReviewButton(review)}
        </div>
      </li>
    );
  }

  function renderReviewList() {
    return <ul>{reviews.map((review) => renderReviewItem(review))}</ul>;
  }

  function renderReviewsSection() {
    if (!showReviews) {
      return null;
    }

    if (reviews.length === 0) {
      return <p className="no-reviews">No reviews yet.</p>;
    }

    return renderReviewList();
  }

  function renderAddReviewButton() {
    if (!showReviews) {
      return null;
    }

    return (
      <AddReview
        propertyId={propertyId}
        selectedUser={selectedUser}
        onReviewSubmit={(newReview) => {
          setReviews((prev) => [
            ...prev,
            {
              ...newReview,
              guest: {
                user_id: selectedUser.user_id,
                first_name: selectedUser.first_name,
                surname: selectedUser.surname,
                avatar: selectedUser.avatar,
              },
            },
          ]);
        }}
      />
    );
  }

  return (
    <div className="property-reviews">
      <h3
        style={{ cursor: "pointer" }}
        onClick={() => setShowReviews(!showReviews)}
      >
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </h3>

      {renderReviewsSection()}

      {renderAddReviewButton()}
    </div>
  );
}

export default PropertyReviews;

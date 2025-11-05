import { useParams, Link } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SingleUser.css";
import "../PropertyList.css";

function SingleUser({ setSelectedUser }) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userProperties, setUserProperties] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showUserReviews, setShowUserReviews] = useState(false);

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${id}`);
        const userData = userResponse.data.user;
        setUser(userData);
        setSelectedUser(userData);

        const propertyResponse = await axios.get("/api/properties");
        const allProperties = propertyResponse.data.properties;
        const hostedProperties = allProperties.filter(
          (property) => property.host_id === Number(id)
        );
        setUserProperties(hostedProperties);

        if (hostedProperties.length === 0) {
          try {
            const allReviewsArrays = await Promise.all(
              allProperties.map(async (property) => {
                try {
                  const reviewsResponse = await axios.get(
                    `/api/properties/${property.property_id}/reviews`
                  );
                  return reviewsResponse.data.reviews;
                } catch {
                  return [];
                }
              })
            );

            const allReviews = allReviewsArrays.flat();

            const userReviewEntries = allReviews.filter(
              (review) => review.guest_id === Number(id)
            );

            const userReviewsWithProperty = userReviewEntries.map((review) => {
              const matchedProperty = allProperties.find(
                (property) => property.property_id === review.property_id
              );

              return {
                ...review,
                property: matchedProperty || null,
              };
            });

            setUserReviews(userReviewsWithProperty);
          } catch (err) {
            console.error("Error fetching reviews", err);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchSingleUser:", err);
        setError("Failed to load user information.");
        setLoading(false);
      }
    };

    fetchSingleUser();
  }, [id, setSelectedUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="single-user">
      <div className="single-user-info-box">
        <div className="user-info">
          <h2>
            {user.first_name} {user.surname}
          </h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone_number}</p>
        </div>
        <img
          src={user.avatar}
          alt={`${user.first_name}'s avatar`}
          className="single-user-avatar"
        />
      </div>

      {userProperties.length > 0 ? (
        <div className="user-properties-section">
          <h3>{user.first_name}'s Properties:</h3>
          <div className="property-list">
            <ul>
              {userProperties.map((property) => (
                <li key={property.property_id}>
                  <img src={property.image_url} alt={property.name} />
                  <p className="property-name">{property.name}</p>
                  <p>
                    {property.location} &nbsp;&middot;&nbsp; £
                    {property.price_per_night} per night
                  </p>
                  <Link
                    to={`/properties/${property.property_id}`}
                    className="property-view"
                  >
                    View Property
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : userReviews.length > 0 ? (
        <div className="user-reviews-section">
          <h3
            style={{ cursor: "pointer" }}
            onClick={() => setShowUserReviews(!showUserReviews)}
          >
            {showUserReviews ? `Hide Reviews` : `${user.first_name}'s Reviews`}
          </h3>

          {showUserReviews ? (
            <ul className="reviews-list">
              {userReviews.map((review) => (
                <li key={review.review_id} className="user-review-item">
                  {review.property && (
                    <Link to={`/properties/${review.property.property_id}`}>
                      <img
                        src={review.property.image_url}
                        alt={review.property.name}
                        className="review-image"
                      />
                    </Link>
                  )}
                  <div className="review-content">
                    <h4>Rating: {"★".repeat(review.rating)}</h4>
                    <p>{review.comment}</p>
                    <p className="review-date">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <div className="user-properties-section">
          <h3>
            {user.first_name} has not hosted or reviewed any properties yet.
          </h3>
        </div>
      )}
    </div>
  );
}

export default SingleUser;

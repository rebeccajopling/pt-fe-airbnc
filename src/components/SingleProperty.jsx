import { useParams, Link } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SingleProperty.css";

function SingleProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [loadingProperty, setLoadingProperty] = useState(true);
  const [errorProperty, setErrorProperty] = useState(null);

  const [propertyReviews, setPropertyReviews] = useState([]);
  const [loadingPropertyReviews, setLoadingPropertyReviews] = useState(true);
  const [errorPropertyReviews, setErrorPropertyReviews] = useState(null);

  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/properties/${id}`)
      .then((propertyResponse) => {
        setProperty(propertyResponse.data.property);
        setLoadingProperty(false);

        return axios.get(`/api/properties/${id}/reviews`);
      })
      .then((reviewsResponse) => {
        const reviews = reviewsResponse.data.reviews;

        const reviewsWithGuestData = reviews.map((review) => {
          return axios
            .get(`/api/users/${review.guest_id}`)
            .then((userRes) => {
              const updatedReview = {
                review_id: review.review_id,
                property_id: review.property_id,
                guest_id: review.guest_id,
                rating: review.rating,
                comment: review.comment,
                created_at: review.created_at,
                guest: {
                  user_id: userRes.data.user.user_id,
                  first_name: userRes.data.user.first_name,
                  surname: userRes.data.user.surname,
                },
              };
              return updatedReview;
            })
            .catch((err) => {
              console.error("Failed to fetch guest user:", err);
              return review;
            });
        });

        return Promise.all(reviewsWithGuestData);
      })
      .then((reviewsWithGuests) => {
        setPropertyReviews(reviewsWithGuests);
        setLoadingPropertyReviews(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorProperty("Failed to load property");
        setLoadingProperty(false);
        setErrorPropertyReviews("Failed to load reviews");
        setLoadingPropertyReviews(false);
      });
  }, [id]);

  if (loadingProperty || loadingPropertyReviews) return <div>Loading...</div>;
  if (errorProperty || errorPropertyReviews)
    return <div>{errorProperty || errorPropertyReviews}</div>;

  return (
    <div>
      <div className="single-property">
        <div className="single-property-info">
          <div className="property-info">
            <h2>{property.name}</h2>
            <p>{property.description}</p>
            <p>{property.location}</p>
            <p>£{property.price_per_night} per night</p>
          </div>

          <div className="host-info">
            <div className="host-text">
              <p>Hosted by:</p>
              <p className="host-name">{property.host_name}</p>
            </div>
            <Link to={`/users/${property.host_id}`}>
              <img
                src={property.avatar}
                alt={property.host_name}
                className="property-user-avatar"
              />
            </Link>
          </div>
        </div>

        <div className="single-property-hero-img">
          <img src={property.image_url} alt={property.name} />
        </div>
      </div>

      <div className="property-reviews">
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => setShowReviews(!showReviews)}
        >
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </h3>

        {showReviews ? (
          <div>
            {propertyReviews.length === 0 ? (
              <p className="no-reviews">No reviews yet.</p>
            ) : (
              <ul>
                {propertyReviews.map((review) => {
                  const guestName = review.guest
                    ? `${review.guest.first_name} ${review.guest.surname}`
                    : "Unknown guest";

                  return (
                    <li key={review.review_id} className="review-item">
                      <h4>{guestName}</h4>
                      <h4>Rating: {review.rating}</h4>
                      <p>{review.comment}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SingleProperty;

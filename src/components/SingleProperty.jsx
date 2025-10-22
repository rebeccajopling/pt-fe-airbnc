import { useParams, Link } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SingleProperty.css";
import PropertyReviews from "./PropertyReviews";

function SingleProperty({ selectedUser }) {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [loadingProperty, setLoadingProperty] = useState(true);
  const [errorProperty, setErrorProperty] = useState(null);

  const [propertyReviews, setPropertyReviews] = useState([]);
  const [loadingPropertyReviews, setLoadingPropertyReviews] = useState(true);
  const [errorPropertyReviews, setErrorPropertyReviews] = useState(null);

  useEffect(() => {
    const fetchSinglePropertyAndReviews = async () => {
      try {
        const propertyResponse = await axios.get(`/api/properties/${id}`);
        setProperty(propertyResponse.data.property);
        setLoadingProperty(false);

        const reviewsResponse = await axios.get(
          `/api/properties/${id}/reviews`
        );
        const reviews = reviewsResponse.data.reviews;

        const reviewsWithGuests = await Promise.all(
          reviews.map(async (review) => {
            try {
              const userResponse = await axios.get(
                `/api/users/${review.guest_id}`
              );
              return {
                review_id: review.review_id,
                property_id: review.property_id,
                guest_id: review.guest_id,
                rating: review.rating,
                comment: review.comment,
                created_at: review.created_at,
                guest: {
                  user_id: userResponse.data.user.user_id,
                  first_name: userResponse.data.user.first_name,
                  surname: userResponse.data.user.surname,
                  avatar: userResponse.data.user.avatar,
                },
              };
            } catch (err) {
              console.error("Failed to fetch guest user:", err);
              return review;
            }
          })
        );

        setPropertyReviews(reviewsWithGuests);
        setLoadingPropertyReviews(false);
      } catch (err) {
        console.error(err);
        setErrorProperty("Failed to load property");
        setLoadingProperty(false);
        setErrorPropertyReviews("Failed to load reviews");
        setLoadingPropertyReviews(false);
      }
    };

    fetchSinglePropertyAndReviews();
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

      <PropertyReviews
        reviews={propertyReviews}
        setReviews={setPropertyReviews}
        propertyId={property.property_id}
        selectedUser={selectedUser}
      />
    </div>
  );
}

export default SingleProperty;

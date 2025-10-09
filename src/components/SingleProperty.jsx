import { useParams } from "react-router";
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

  useEffect(() => {
    axios
      .get(`/api/properties/${id}`)
      .then((response) => {
        setProperty(response.data.property);
        setLoadingProperty(false);

        return axios.get(`/api/properties/${id}/reviews`);
      })
      .then((response) => {
        setPropertyReviews(response.data.reviews);
        setLoadingPropertyReviews(false);
      })
      .catch(() => {
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
      <div className="property-hero">
        <img src={property.image_url} alt={property.name} />
      </div>
      <div className="single-property">
        <h2>{property.name}</h2>
        <p>{property.description}</p>
        <p>{property.location}</p>
        <p>£{property.price_per_night} per night</p>
        <p>Host: {property.host_name}</p>
        <img
          src={property.avatar}
          alt={property.host_name}
          className="user-avatar"
        />
      </div>
      <div>
        {propertyReviews.map((review) => (
          <li key={property.property_id}>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.comment}</p>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SingleProperty;

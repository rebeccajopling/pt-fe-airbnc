import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";

function SingleProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/properties/${id}`)
      .then((response) => {
        setProperty(response.data.property);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load property");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading property...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="single-property">
      <h2>{property.name}</h2>
      <p>{property.location}</p>
      <img src={property.image_url} alt={property.name} />
      <p>{property.description}</p>
    </div>
  );
}

export default SingleProperty;

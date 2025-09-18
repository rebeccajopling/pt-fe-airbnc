import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/properties")
      .then((response) => {
        const propertyList = response.data.properties.map(
          ({ property_id, name, location, price_per_night, image_url }) => ({
            id: property_id,
            name,
            location,
            price_per_night,
            image_url,
          })
        );
        setProperties(propertyList);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong while fetching properties.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="property-list">
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <Link to={`properties/${property.id}`}>
              <h3>{property.name}</h3>
              <img src={property.image_url} alt={property.name} />
              <p>{property.location}</p>
              <p>£{property.price_per_night} per night</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertiesList;

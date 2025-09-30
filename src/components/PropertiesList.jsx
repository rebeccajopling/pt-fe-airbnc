import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import SearchBar from "./SearchBar/SearchBar";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Fetching properties with query:", searchQuery);
    axios
      .get(`/api/properties?${searchQuery}`)
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
        console.error("Error fetching properties:", err);
        setError("Something went wrong while fetching properties.");
        setLoading(false);
      });
  }, [searchQuery]);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="property-list">
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <Link to={`properties/${property.id}`}>
              <h3>{property.name}</h3>
              <img src={property.image_url} alt={property.name} />
              <p>{property.location}</p>
              <p>£{property.price_per_night} per night</p>
              <p className="property-view">View</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertiesList;

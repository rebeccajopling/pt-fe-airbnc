import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import SearchBar from "./SearchBar/SearchBar";
import "../PropertyList.css";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const url = searchQuery
      ? `/api/properties?${searchQuery}`
      : `/api/properties`;

    const fetchProperties = async () => {
      try {
        const propertyResponse = await axios.get(url);
        const propertyList = propertyResponse.data.properties.map(
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
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Something went wrong while fetching properties.");
        setLoading(false);
      }
    };
    fetchProperties();
  }, [searchQuery]);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="property-list">
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <img src={property.image_url} alt={property.name} />
            <p className="property-name">{property.name}</p>
            <p>
              {property.location} &nbsp;&middot;&nbsp; £
              {property.price_per_night} per night
            </p>
            <Link to={`properties/${property.id}`} className="property-view">
              View Property
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertiesList;

import React, { useEffect, useState } from "react";
import axios from "axios";

function PropertyTypeDDM({ selectedTypes, setSelectedTypes }) {
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/property-types")
      .then((res) => setPropertyTypes(res.data.property_types))
      .catch((err) => console.error("Error fetching property types:", err));
  }, []);

  const handlePropertyTypeChange = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updatedTypes);
  };

  return (
    <div className="dropdown">
      <span className="dropdown-label">Property Type ↓</span>
      <div className="dropdown-content">
        {propertyTypes.map((type) => (
          <label key={type.property_type} className="dropdown-item">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type.property_type)}
              onChange={() => handlePropertyTypeChange(type.property_type)}
            />
            {type.property_type}
          </label>
        ))}
      </div>
    </div>
  );
}

export default PropertyTypeDDM;

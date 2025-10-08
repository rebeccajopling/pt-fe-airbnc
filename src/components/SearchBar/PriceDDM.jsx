import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchBar.css";

function PriceDDM({ priceRange, setPriceRange }) {
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setPriceRange({
      min: value,
      max: priceRange.max,
    });
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setPriceRange({
      min: priceRange.min,
      max: value,
    });
  };

  return (
    <div className="dropdown">
      <span className="dropdown-label">Price Range &nbsp; ↓</span>
      <div className="dropdown-content">
        <label className="dropdown-item">
          Min Price:
          <input
            type="string"
            name="min"
            value={priceRange.min}
            onChange={handleMinPriceChange}
          />
        </label>
        <label className="dropdown-item">
          Max Price:
          <input
            type="string"
            name="max"
            value={priceRange.max}
            onChange={handleMaxPriceChange}
          />
        </label>
      </div>
    </div>
  );
}

export default PriceDDM;

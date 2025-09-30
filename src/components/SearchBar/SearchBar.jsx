import React, { useState } from "react";
import PropertyTypeDDM from "./PropertyTypeDDM";
import PriceDDM from "./PriceDDM";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const handleSearch = () => {
    const queryParams = [];

    if (selectedPropertyTypes.length > 0) {
      const typeParams = selectedPropertyTypes.map(
        (type) => `property_type=${type}`
      );
      queryParams.push(...typeParams);
    }

    if (sortOrder) {
      queryParams.push("sort=cost_per_night");

      if (sortOrder === "high-low") {
        queryParams.push("order=descending");
      } else if (sortOrder === "low-high") {
        queryParams.push("order=ascending");
      }
    }

    if (priceRange.min) {
      queryParams.push(`minprice=${priceRange.min}`);
    }

    if (priceRange.max) {
      queryParams.push(`maxprice=${priceRange.max}`);
    }

    const queryString = queryParams.join("&");
    onSearch(queryString);
  };

  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <div className="filter-controls">
        <p>SORT:</p>
        <button
          type="button"
          onClick={() => setSortOrder("high-low")}
          className={sortOrder === "high-low" ? "selected" : ""}
        >
          Price High-Low
        </button>

        <button
          type="button"
          onClick={() => setSortOrder("low-high")}
          className={sortOrder === "low-high" ? "selected" : ""}
        >
          Price Low-High
        </button>

        <p>FILTER:</p>

        <PropertyTypeDDM
          selectedTypes={selectedPropertyTypes}
          setSelectedTypes={setSelectedPropertyTypes}
        />

        <PriceDDM priceRange={priceRange} setPriceRange={setPriceRange} />

        <button type="submit" className="submit-button">
          {"\u2192"}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

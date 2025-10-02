import { Link } from "react-router";

function BackButton() {
  return (
    <div className="search-bar">
      <h3>
        <Link to="/users" className="back-link">
          {"\u2190"} All Users
        </Link>
      </h3>
    </div>
  );
}

export default BackButton;

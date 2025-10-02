import userIcon from "../assets/user.png";
import { Link } from "react-router";
import "../Header.css";

function Header({ selectedUser }) {
  return (
    <div className="header">
      <Link to="/" className="back-link">
        <h1>airbnc</h1>
      </Link>
      <div className="user-section">
        <Link to="/users">
          <img
            className="header-icon"
            src={selectedUser ? `${selectedUser.avatar}` : userIcon}
            alt="user-icon"
          />
        </Link>
        <p>{selectedUser ? `${selectedUser.first_name}` : "CHANGE USER"}</p>
      </div>
    </div>
  );
}

export default Header;

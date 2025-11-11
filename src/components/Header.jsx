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
        <div className="user-info">
          <img
            className="header-icon"
            src={selectedUser ? selectedUser.avatar : userIcon}
            alt="user-icon"
          />
          <p className="user-name">
            {selectedUser ? selectedUser.first_name : "USER"}
          </p>
        </div>
        <Link to="/users">
          <p className="change-user">CHANGE USER</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;

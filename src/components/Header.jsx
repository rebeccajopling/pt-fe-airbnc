import userIcon from "../assets/user.png";
import { Link } from "react-router";

function Header() {
  return (
    <div className="header">
      <h1>airbnc</h1>
      <Link to="/users">
        <img src={userIcon} alt="user-icon" />
      </Link>
    </div>
  );
}

export default Header;

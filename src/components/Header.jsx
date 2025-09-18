import userIcon from "../assets/user.png";

function Header() {
  return (
    <div className="header">
      <h1>airbnc</h1>
      <img src={userIcon} alt="user-icon" />
    </div>
  );
}

export default Header;

import { Link } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header">
          <div className="header__logo">
            <Link to="/main">
              <img src="/logo.png" width={65} alt="Tag" />
            </Link>
          </div>
          <div className="header__menu">
            <Link to="skills">Skills</Link>
            <Link to="education">Education</Link>
            <Link to="experiences">Experiences</Link>
            <Link to="my-works">My Works</Link>
            <Link to="contact">Contact</Link>
          </div>
          <div className="header__logout">
            <Link to="dashboard">
              <i
                className="fa-solid fa-user-gear fa-lg"
                style={{ color: "#ffffff" }}
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

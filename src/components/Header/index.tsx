import { Link } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header">
          <div className="header__logo">
            <Link to="/">
              <img src="/logo.png" width={65} alt="Tag" />
            </Link>
          </div>
          <div className="header__menu">
            <Link to="about">About me</Link>
            <Link to="skills">Skills</Link>
            <Link to="education">Education</Link>
            <Link to="experiences">Experiences</Link>
            <Link to="my-works">My Works</Link>
            <Link to="contact">Contact</Link>
            <a download="CV Front end" target="blank" href="/CV Front end.pdf">
              Download CV
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

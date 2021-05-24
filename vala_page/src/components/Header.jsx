import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavButton from "./sub_components/NavButton";
import "./Header.scss";

function Header() {
  return (
    <div className="header-section">
      <div className="navbar navbar-full">
        <div className="container">
          <Logo />
          <nav className="navbar navbar-expand ">
            <div className="menunav">
              <Link className="nav-item" id="menumobile" to="/our-work">
                Our work
              </Link>
              <Link className="nav-item" id="menumobile" to="/contact-us">
                Contact Us
              </Link>
            </div>
            <div>
              <span className="nav-icon">
                <NavButton />
              </span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;

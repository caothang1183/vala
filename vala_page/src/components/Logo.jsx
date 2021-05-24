import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../assets/images/logo.svg";
import $ from "jquery";
const Logo = ({ openmn }) => {
  const hanldeCloseNav = () => {
    console.log({ openmn });
    $("#myNav").css({ height: "0%" });
    $("#iconmenu").html(
      `<i style='color:white' class="fas fa-bars fa-2x"></i>`
    );
  };
  return (
    <div style={{ zIndex: 2000000 }} className="logo">
      <Link to="/">
        <img alt="" onClick={hanldeCloseNav} src={LogoIcon}></img>
      </Link>
    </div>
  );
};

export default Logo;

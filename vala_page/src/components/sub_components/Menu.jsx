import React from "react";
import { Link } from "react-router-dom";

import { Modal, Button } from "antd";
function Menu() {
  return (
    <div className="list-group main-menu" id="main-menu">
      <Link className="menu-item" to="/" >Home</Link>
      <Link className="menu-item" to="/about-us" >About us</Link>
      <Link className="menu-item" to="/our-work" >Our work</Link>
      <Link className="menu-item" to="/projects" >Projects</Link>
      <Link className="menu-item" to="/blog" >Blog</Link>
      <Link className="menu-item" to="/contact-us" >Contact us</Link>
    </div>
  );
}
export default Menu;

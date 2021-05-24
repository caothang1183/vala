import React from "react";
import { Link } from "react-router-dom";

function SubMenu(props) {
  return (
    <div className="NavLink">
      {/*sub menu */}

      <div className="list-group">
        <Link data-aos={props.animation ? "fade-up" : ""} to="/test">
          Strategy
        </Link>
        <Link data-aos={props.animation ? "fade-up" : ""} to="#">
          Branding
        </Link>
        <Link data-aos={props.animation ? "fade-up" : ""} to="#">
          Digital Marketing
        </Link>
        <Link data-aos={props.animation ? "fade-up" : ""} to="#">
          Web/App
        </Link>
        <Link data-aos={props.animation ? "fade-up" : ""} to="#">
          Booking
        </Link>
        <Link data-aos={props.animation ? "fade-up" : ""} to="#">
          Become a Influencer
        </Link>
      </div>
    </div>
  );
}

export default SubMenu;

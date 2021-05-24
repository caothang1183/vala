import React, { useContext } from "react";
import ModalSetting from "./components/ModalSetting";
import "./../../components/Style.scss";
import { Notification } from "./Notification";
import { Link } from "react-router-dom";
import { context } from "../../provider";

const NavHeader = () => {
  const { auth } = useContext(context);
  return (
    <nav className="navbar navbar-expand  topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={() => {
          console.log("hello");
          document.body.classList.toggle("sidebar-toggled");
          const sideBar = document.getElementById("accordionSidebar");
          sideBar.classList.toggle("toggled");
        }}
      >
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-search fa-fw"></i>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <Notification name="Alert" icon={"fas fa-bell fa-fw"} number={"3+"} />
        <Notification
          name="Message"
          icon={"fas fa-envelope fa-fw"}
          number={"7"}
        />

        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow ">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {auth.first_name}
            </span>
            <img
              className="img-profile rounded-circle"
              src="https://i.stack.imgur.com/34AD2.jpg"
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right  shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to="/user-profile">
              <i className="fas fa-user fa-sm fa-fw mr-2 "></i>
              Profile
            </Link>
            <ModalSetting />

            <a className="dropdown-item" href="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
            </a>

            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#LogoutModal"
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavHeader;

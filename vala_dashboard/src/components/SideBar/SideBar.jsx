import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageNavContent from "./PageNavContent";

const Sidebar = () => {
  const [showNavCard, setShowNavCard] = useState(true);

  function handleListUser() {
    
    let user = JSON.parse(localStorage.getItem("User"));
 
    if (user && user.role_id === 1) {
      return (
        <PageNavContent
          pageName="User"
          addUrl="/add-user"
          listUrl="/list-user"
        />
      );
    }
  }

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/dashboard"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">VALA GROUP</div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {handleListUser()}
      <PageNavContent
        pageName="Project"
        addUrl="/add-project"
        listUrl="/list-project"
      />
      <PageNavContent
        pageName="Topic"
        addUrl="/add-topic"
        listUrl="/list-topic"
      />

      <PageNavContent
        pageName="Categories"
        addUrl={null}
        listUrl="/list-categories"
      />

      <PageNavContent
        pageName="Blogs"
        addUrl="/add-blog"
        listUrl="/list-blogs"
      />

      <PageNavContent
        pageName="Branding"
        addUrl="/add-branding"
        listUrl="/list-branding"
      />

      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => {
            setShowNavCard(!showNavCard);
            document.body.classList.toggle("sidebar-toggled");
            document
              .getElementById("accordionSidebar")
              .classList.toggle("toggled");
          }}
        ></button>
      </div>
      {showNavCard && (
        <div className="sidebar-card d-none d-lg-flex">
          <img
            style={{
              borderRadius: "50%",
              height: "60px",
              width: "60px",
              objectFit: "cover",
            }}
            className="sidebar-card-illustration mb-2"
            src="https://images.unsplash.com/photo-1548611307-d1a4c28832b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80"
            alt="..."
          />
          <p className="text-center mb-2">
            <strong>User Vala</strong> 
          </p>
          <a className="btn btn-success btn-sm" href="#">
            View Profile
          </a>
        </div>
      )}
    </ul>
  );
};

export default Sidebar;

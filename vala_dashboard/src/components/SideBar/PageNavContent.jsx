import React from "react";
import "./PageNavContent.scss";
import { Link } from "react-router-dom";

const PageNavContent = ({ pageName, addUrl, listUrl }) => {
  return (
    <>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">{pageName}</div>
      {addUrl && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to={addUrl}
            //   data-toggle="collapse"
            data-target={`#collapse${pageName}`}
            aria-expanded="true"
            aria-controls={`collapse${pageName}`}
          >
            <i className="fa fa-fw fa-plus-square"></i>

            <span>Add {pageName}</span>
          </Link>
        </li>
      )}

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to={listUrl}
          //   data-toggle="collapse"
          data-target={`#collapse${pageName}`}
          aria-expanded="true"
          aria-controls={`collapse${pageName}`}
        >
          <i className="fa fa-fw fa-bars"></i>

          <span>List {pageName}</span>
        </Link>
      </li>
    </>
  );
};

export default PageNavContent;

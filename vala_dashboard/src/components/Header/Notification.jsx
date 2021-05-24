import React from "react";
import { NotificationItem } from "./NotificationItem";

export const Notification = ({ name, list, icon, number }) => {
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id={`${name}Dropdown`}
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className={icon}></i>
        <span className="badge badge-danger badge-counter">{number}</span>
      </a>
      <div
        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby={`${name}Dropdown`}
      >
        <h6 className="dropdown-header">{name} Center</h6>
        <NotificationItem
          message={
            "Hi there! I am wondering if you can help me with a problem I've been having."
          }
          time={"58m"}
          name={"Emily Fowler"}
          isOnline={true}
          avatar={
            "https://images.unsplash.com/photo-1601289149034-2daad70d0076?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
        />
        <a className="dropdown-item text-center small text-gray-500" href="#">
          Read More {name}
        </a>
      </div>
    </li>
  );
};

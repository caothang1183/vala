import React from "react";

export const NotificationItem = ({ isOnline, avatar, message, name, time }) => {
  return (
    <a className="dropdown-item d-flex align-items-center" href="#">
      <div className="dropdown-list-image mr-3">
        <img
          style={{ objectFit: "cover" }}
          className="rounded-circle"
          src={avatar}
          alt="..."
        />
        {isOnline && <div className="status-indicator bg-success"></div>}
      </div>
      <div className="font-weight-bold">
        <div className="text-truncate">{message}</div>
        <div className="small text-gray-500">
          {name} · {time}
        </div>
      </div>
    </a>
  );
};

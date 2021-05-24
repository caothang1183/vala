import $ from "jquery";
import React from "react";

const Modal = ({ name, message, func }) => {
  return (
    <div
      className="modal fade"
      id={`${name}Modal`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Are you sure?
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <a
              onClick={() => {
                func();
                $(".modal-backdrop").remove();
                $(".modal").hide();
                $("body").removeClass("modal-open");
              }}
              className="btn btn-primary"
            >
              {name}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

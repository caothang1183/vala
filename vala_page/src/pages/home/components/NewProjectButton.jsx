import { Dialog, Slide } from "@material-ui/core";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./NewProjectButton.scss";
import NewProjectForm from "./NewProjectForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const NewProjectButton = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const backgroundModal = {
    height: "200vh",
    background: `linear-gradient(90deg, rgba(8,94,114, 0.6), rgba(8,94,114, 0.8)), 
        url('https://images.unsplash.com/photo-1573495612077-a689b084faab?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fGFldTZyTC1qNmV3fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  return (
    <>
      <button
        onClick={() => {
          setIsNewProjectOpen(true);
        }}
        style={{ zIndex: 200000 }}
        className="button-start-project-modal"
      >
        <span>Start Your Project</span>
      </button>
      <Dialog
        fullScreen
        open={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        TransitionComponent={Transition}
      >
        <div style={backgroundModal}>
          <div
            style={{
              cursor: "pointer",
              color: "white",
              display: "flex",
              width: "90px",
              margin: "8% auto 4% auto",
            }}
            className="subscribe-close"
            onClick={() => setIsNewProjectOpen(false)}
          >
            <FaTimes
              className="subscribe-modal-icon"
              style={{
                display: "block",
                width: "40px",
                height: "40px",
              }}
            />
            <span
              style={{
                margin: "auto 0px",
                fontWeight: "700",
                fontSize: "18px",
                textTransform: "uppercase",
              }}
            >
              Close
            </span>
          </div>
          <NewProjectForm />
        </div>
      </Dialog>
    </>
  );
};

export default NewProjectButton;

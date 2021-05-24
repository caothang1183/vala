import axios from "axios";
import React, { useState } from "react";
import "./NewProjectForm.scss";
const NewProjectForm = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const [content, setContent] = useState("");

  const handleFName = (event) => {
    setFName(event.target.value);
  };

  const handleLName = (event) => {
    setLName(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleContent = (event) => {
    // setContent(event.target.value);
  };

  const submit = (event) => {
    alert(fname);
    axios
      .post("http://localhost:8080/api/contact", {
        fname,
        lname,
        phone,
        email,
      })
      .then((res) => {});
    event.preventDefault();
  };
  return (
    <>
      <div className="newProjectForm">
        <div className="newProjectForm-left">
          <h1>Let us help you get your project started.</h1>
          <h2>Contact us</h2>
          <div>
            <div className="icon-border">
              <i className="fas fa-phone fa-2x" />
            </div>
            <p>0908 999 999</p>
          </div>
          <div>
            <div className="icon-border">
              <i className="far fa-paper-plane fa-2x" />
            </div>
            <p>info@kagency.com </p>
          </div>
        </div>
        <div className="newProjectForm-right">
          <form onSubmit={submit} method="post">
            <input
              className="newProjectForm-name"
              onChange={handleFName}
              type="text"
              placeholder="First name"
            />
            <input
              className="newProjectForm-name"
              onChange={handleLName}
              type="text"
              placeholder="Last name"
            />
            <input
              style={{ gridColumn: "1/3" }}
              type="text"
              placeholder="Your phone"
              onChange={handlePhone}
            />
            <input
              style={{ gridColumn: "1/3" }}
              type="text"
              placeholder="Your email"
              onChange={handleEmail}
            />
            <textarea
              className="newProjectForm-textarea"
              //   style={{ gridColumn: "1/3", gridRow: "4/7" }}
              type="text"
              placeholder="Your brief:"
              onChange={handleContent}
            ></textarea>
            <button
              style={{ gridColumn: "1/3" }}
              type="submit"
              className="newProject-signup"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
      <div className="social-links">
        <div className="icon-border">
          <i className="fab fa-facebook-f fa-2x"></i>
        </div>
        <div className="icon-border">
          <i className="fab fa-tiktok fa-2x"></i>
        </div>
        <div className="icon-border">
          <i className="fas fa-phone fa-2x" />
        </div>
        <div className="icon-border">
          <i className="fab fa-google fa-2x"></i>
        </div>
      </div>
    </>
  );
};

export default NewProjectForm;

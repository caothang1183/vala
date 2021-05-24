import React from "react";
import "./SubscribeNews.scss";

const SubscribeNews = () => {
  return (
    <div className="subscribe-modal-content">
      <h1>Subscribe to our newsletter</h1>
      <form action="">
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
        <input type="email" placeholder="Email" />
      </form>
      <p>
        KAGENCY needs the contact information you provide to us to contact you
        about our products and services. You may unsubscribe from these
        communications at any time. For information on how to unsubscribe, as
        well as our privacy practices and commitment to protecting your privacy,
        please review our{" "}
        <a href="_blank" style={{ color: "white" }}>
          <span style={{ textDecoration: "underline" }}>Privacy Policy</span>
        </a>
      </p>
      <button className="subscribe-signup">SIGN UP</button>
    </div>
  );
};

export default SubscribeNews;

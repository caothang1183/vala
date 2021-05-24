import { Link } from "react-router-dom";
import "./InfoButton.scss";

const InfoButton = ({ label, horizontalPadding = false, link = "" }) => (
  <button
    data-aos="fade-up"
    className={horizontalPadding ? "InfoButton-padding" : "InfoButton"}
  >
    <Link to={link}>{label}</Link>
  </button>
);

export default InfoButton;

import Button from "@material-ui/core/Button";
import $ from "jquery";
import { StyleRoot } from "radium";
import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import inlGrey from "../../assets/images/icons/inl_light.svg";
import insGrey from "../../assets/images/icons/ins_light.svg";
import pinGrey from "../../assets/images/icons/pin_light.svg";
import ytGrey from "../../assets/images/icons/yt_light.svg";
import NewProjectButton from "../../pages/home/components/NewProjectButton";
import NewProjectForm from "../../pages/home/components/NewProjectForm";
import SocialIcon from "../../socialcomponent/SocialIcon";
import "./SubMenu.scss";
import axios from "axios";
const reducer = (category, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        categorydata: action.payload,
        error: "",
        loading: true,
      };
    case "FETCH_ERROR":
      return {
        categorydata: [],
        error: "",
        loading: true,
      };
    default:
      return category;
  }
};
const NavButton = (props) => {
  const icons = [ytGrey, pinGrey, inlGrey, insGrey];
  const [openmn, setOpenmn] = useState(false);
  const [category, dispatch] = useReducer(reducer, {
    categorydata: [],
    error: "",
    loading: false,
  });

  useEffect(() => {
    let isSubsribed = true;
    axios.get("https://kagency-api.herokuapp.com/api/topics/").then(
      (res) => {
        if (isSubsribed) {
          dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        }
      },
      (error) => {
        dispatch({ type: "FETCH_ERROR" });
      }
    );
    return () => {
      isSubsribed = false;
    };
  }, []);
  //console.log(category.categorydata);
  var cate = category.categorydata;
  const openNav = () => {
    setOpenmn((openmn) => !openmn);
    //console.log(!openmn)

    if (openmn === false) {
      let element = document.getElementById("myNav");
      let iconmn = document.getElementById("iconmenu");
      ReactDOM.findDOMNode(element).style.height = "100%";
      ReactDOM.findDOMNode(
        iconmn
      ).innerHTML = `<i class="fas fa-times fa-2x"></i>`;
      $(".menu-item").animate(
        { opacity: "1", transform: "translateY(-30px)" },
        "3000"
      );
    } else if (openmn === true) {
      let element = document.getElementById("myNav");
      ReactDOM.findDOMNode(element).style.height = "0%";
      let iconmn = document.getElementById("iconmenu");
      ReactDOM.findDOMNode(
        iconmn
      ).innerHTML = `<i style='color:white' class="fas fa-bars fa-2x"></i>`;
      $(".menu-item").animate(
        { transform: "translateY(0px)", opacity: "0" },
        "3000"
      );
    }
  };

  const closeNav = (e) => {
    setOpenmn(!true);
    let element = document.getElementById("myNav");
    ReactDOM.findDOMNode(element).style.height = "0%";
    let iconmn = document.getElementById("iconmenu");

    ReactDOM.findDOMNode(
      iconmn
    ).innerHTML = `<i style='color:white' class="fas fa-bars fa-2x"></i>`;
  };

  const closeModal = () => {
    let mymodal = document.getElementById("myNavModal");
    // console.log(mymodal);
    ReactDOM.findDOMNode(mymodal).style.width = "0%";
  };

  return (
    <div>
      <Button style={{ zIndex: 2000000 }} onClick={openNav} id="menu">
        <span id="iconmenu">
          <i className="fas fa-bars fa-2x"></i>
        </span>
      </Button>
      <StyleRoot>
        <div id="myNav" className="overlay ">
          <div className="container head-nav">
            <span onClick={closeNav} className="logoicon"></span>
          </div>
          <span className="socialicon">
            <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 footer-social">
              <SocialIcon icons={icons} />
            </div>
          </span>
          <span>
            <NewProjectButton />
          </span>

          <div className="overlay-content">
            <Link className="menu-item" onClick={closeNav} to="/">
              Home
            </Link>
            <div className="dropup">
              <Link className="dropbtn" onClick={closeNav} to="/about-us">
                Our work
              </Link>

              <div className="dropup-content">
                {cate.map((item) => (
                  <Link
                    onClick={closeNav}
                    style={{ fontSize: 20 }}
                    data-aos={props.animation ? "fade-up" : ""}
                    to={{
                      pathname: item.name
                        .toLowerCase()
                        .replaceAll(" ", "-")
                        .replaceAll("/", "-"),
                      state: {
                        fromNotifications: item,
                      },
                    }}
                    className="link-menu"
                    key={item.id}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link className="menu-item" onClick={closeNav} to="/about-us">
              About us
            </Link>

            <Link className="menu-item" onClick={closeNav} to="/projects">
              Projects
            </Link>

            <Link className="menu-item" onClick={closeNav} to="/blog">
              Blog
            </Link>
            <Link className="menu-item" onClick={closeNav} to="/contact-us">
              Contact us
            </Link>
          </div>
        </div>
      </StyleRoot>
      <div id="myNavModal" className="overlaymodal">
        <p className="closebtn" onClick={closeModal}>
          <i className="fas fa-times fa-2x"></i>
        </p>
        <div className="overlaymodal-content">
          <NewProjectForm />
        </div>
      </div>
    </div>
  );
};

export default NavButton;

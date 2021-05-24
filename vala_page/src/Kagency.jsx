import { BackTop } from "antd";
import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import "./Kagency.scss";
import AboutUs from "./pages/about_us/AboutUs";
import Blog from "./pages/blog/Blog";
import BlogDetailPage from "./pages/blog/BlogDetailPage";
import Topic from "./pages/topics/Topic";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import OurWork from "./pages/our_work/OurWork";
import PrivacyPolicy from "./pages/privacy_policy/PrivacyPolicy";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";
import Projects from "./pages/projects/Projects";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import NotFound from "./pages/PageNotFound/NotFound";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop";
const reducer = (category, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      console.log(action.payload);
      return {
        topic: action.payload,
        error: "",
        loading: true,
      };
    case "FETCH_ERROR":
      return {
        topic: [],
        error: "",
        loading: true,
      };
    default:
      return category;
  }
};

const Kagency = () => {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    topic: [],
    error: "",
    loading: false,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (navigator.onLine) {
      // setOpen(true);
    } else {
      setOpen(true);
    }
  }, []);
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
  const routeComponents = state.topic.map((item) => (
    <Route
      exact
      path={
        "/" + item.name.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")
      }
      component={Topic}
      key={item.id}
    />
  ));

  if (!state.loading) {
    return <div></div>;
  } else {
    return (
      <div>
        <Router>
          <Header />
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about-us" exact component={AboutUs} />
              <Route path="/our-work" exact component={OurWork} />
              <Route path="/projects" exact component={Projects} />
              <Route path="/projects/:id" exact component={ProjectDetailPage} />
              <Route path="/blog" exact component={Blog} />
              <Route path="/blog/:id" exact component={BlogDetailPage} />
              <Route path="/contact-us" exact component={Contact} />
              <Route path="/privacy-policy" exact component={PrivacyPolicy} />
              {routeComponents}

              <Route component={NotFound} />
            </Switch>
          </ScrollToTop>
        </Router>
        <BackTop>
          <div className="backTop">
            <i className="fa fa-arrow-up fa-2x"></i>
          </div>
        </BackTop>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Mất kết nối đến internet
          </Alert>
        </Snackbar>
      </div>
    );
  }
};

export default Kagency;

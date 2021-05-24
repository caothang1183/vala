import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Modal from "./../components/Modal";
import SideBar from "./SideBar/SideBar";
import Footer from "./Footer";
import NavHeader from "./Header/NavHeader";
import { context } from "../provider";
import {
  fetchLocalAction,
  logoutAction,
} from "../common/constants/authConstant";
import Spinner from "./../components/Spinner";

const ProtectedRoute = ({ component: Component, role_id, user, ...rest }) => {
  const { authDispatch } = useContext(context);
  useEffect(() => {
    if (localStorage.getItem("UserAdmin")) {
      let user = JSON.parse(localStorage.getItem("User"));
      authDispatch(
        fetchLocalAction({
          token: localStorage.getItem("UserAdmin"),
          info: { first_name: user.first_name, last_name: user.last_name },
        })
      );
    }
  }, [authDispatch]);

  const checkAuth = () => {
    let user = JSON.parse(localStorage.getItem("User"));
    let result = false;
    if (user) {
      result = user.activated && !user.blocked && user.role_id !== 0;
    }

    return result;
  };

  const logout = () => {
    authDispatch(logoutAction());
    localStorage.removeItem("UserAdmin");
    localStorage.removeItem("User");
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (checkAuth()) {
          return (
            <>
              <div id="wrapper">
                <SideBar role_id={role_id} />
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    <NavHeader />
                    <Component />
                  </div>
                  <Footer />
                  <Modal
                    name="Logout"
                    message={`Select "Logout" below if you are ready to end your current session.`}
                    func={logout}
                  />
                </div>
              </div>
              <Spinner />
            </>
          );
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;

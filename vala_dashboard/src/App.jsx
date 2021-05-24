import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./components/Style.scss";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/LoginPage";
import DashboardRoute from "./routes/routes";

const App = () => {
  useEffect(() => {
    var check = window.localStorage.getItem("darkmode");
    if (check === "true") {
      $(
        "#content-wrapper, .sticky-footer, .dropdown-menu-right, .dropdown-menu .dropdown-item, .MuiDialog-paper , .modal-content , .collapse-inner"
      ).addClass("bg-dark text-white"); //
      $(".navbar").addClass("bg-dark");
      $("#accordionSidebar").addClass("bg-gradient-dark");
    } else if (check === "false") {
      $(
        "#content-wrapper, .sticky-footer, .dropdown-menu-right, .dropdown-menu .dropdown-item , .MuiDialog-paper, .modal-content, .collapse-inner"
      ).removeClass("bg-dark text-white"); //
      $(".navbar").removeClass("bg-dark");
      $(".sticky-footer").removeClass("dark-mode");
      $("#accordionSidebar").removeClass("bg-gradient-dark");
    }
  });

  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" exact component={LoginPage} />
        <ProtectedRoute path="/dashboard" exact component={DashboardPage} />
        {DashboardRoute &&
          DashboardRoute.map((item, index) => (
            <ProtectedRoute
              key={index}
              path={item.path}
              exact={item.exact}
              component={item.component}
            />
          ))}
      </Switch>
    </Router>
  );
};
export default App;

import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  loginAction,
  loginFailedAction,
  loginSuccessAction,
} from "../../common/constants/authConstant";
import { context } from "../../provider";
import api from "./../../api";
import "./LoginPage.scss";
import { decodedToken } from "../../utils/jsonWebToken";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, authDispatch } = useContext(context);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    authDispatch(loginAction());
    api
      .post("/auth", { email, password })
      .then((res) => {
        decodedToken(res.data.accessToken);
        localStorage.setItem("UserAdmin", res.data.accessToken);
        let user = JSON.parse(localStorage.getItem("User"));
        // history.push("/dashboard");
        //   authDispatch(loginSuccessAction(res.data.accessToken));

        console.log(user.activated && !user.blocked && user.role_id !== 0);
        if (user.activated && !user.blocked && user.role_id !== 0) {
          history.push("/dashboard");
          authDispatch(loginSuccessAction(res.data.accessToken));
        } else {
          alert("user is not permitted");
          localStorage.removeItem("UserAdmin");
          localStorage.removeItem("User");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        authDispatch(loginFailedAction(err.response.data.message));
      });
  };

  if (localStorage.getItem("UserAdmin")) {
    history.push("/dashboard");
  }

  return (
    <div className="login">
      <h1>Dashboard login</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="input">
          {/* <label htmlFor="email">Email </label> */}
          <input
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          {/* <label htmlFor="password">Password </label> */}
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`btn btn-info ${auth.loading ? "disabled" : ""}`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

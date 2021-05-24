import React, { useContext, useEffect, useState } from "react";
import { context } from "./../../../provider";
import "./UserProfile.scss";
import api from "./../../../api";
import { useHistory } from "react-router";
import {
  editUserNameSuccessAction,
  loginAction,
} from "../../../common/constants/authConstant";

const UserProfile = () => {
  const history = useHistory();
  const { authDispatch, auth } = useContext(context);
  const [user, setUser] = useState({});
  const [error, setError] = useState({
    password: "",
    new_password: "",
    new_password_confirm: "",
  });

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("User"));
    setUser({
      ...user,
      first_name: auth.first_name,
      last_name: auth.last_name,
      email: loginInfo.email,
    });
  }, []);

  const handleError = (e) => {
    const { value, name } = e.target;
    let mess = "";
    switch (name) {
      case "first_name":
        mess = value === "" ? "*First Name cannot be empty" : "";
        break;
      case "last_name":
        mess = value === "" ? "*Last Name cannot be empty" : "";
        break;
      default:
        break;
    }
    setError({
      ...error,
      [name]: mess,
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = JSON.parse(localStorage.getItem("User"));
    loginInfo.first_name = user.first_name;
    loginInfo.last_name = user.last_name;
    localStorage.setItem("User", JSON.stringify(loginInfo));
    let requestBody = {
      first_name: user.first_name,
      last_name: user.last_name,
    };
    authDispatch(loginAction());
    api
      .post(`/users/update/${loginInfo.id}`, requestBody)
      .then((res) => {
        console.log(res.data);
        console.log(requestBody);
        authDispatch(editUserNameSuccessAction(requestBody));
        alert("User Name updated!");
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="container-fluid" style={{ width: "80%" }}>
        <div className="userProfile">
          <h3>User Profile</h3>
          <div className="userProfile-content">
            <div className="userAvatar">
              <img
                src="https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
                alt="avatar"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="grid-item">
                  <h6> Email</h6>
                  <input name="email" disabled type="text" value={user.email} />
                </div>
                <div className="grid-item"></div>
                <div className="grid-item">
                  <h6> First Name</h6>
                  <input
                    name="first_name"
                    type="text"
                    value={user.first_name}
                    onChange={handleChange}
                    onBlur={handleError}
                  />
                  <p className="text-danger">{error.first_name}</p>
                </div>
                <div className="grid-item"></div>
                <div className="grid-item">
                  <h6> Last Name</h6>
                  <input
                    name="last_name"
                    type="text"
                    value={user.last_name}
                    onChange={handleChange}
                    onBlur={handleError}
                  />
                  <p className="text-danger">{error.last_name}</p>
                </div>
              </div>

              <button
                className="btn btn-primary"
                disabled={user.first_name === "" || user.last_name === ""}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

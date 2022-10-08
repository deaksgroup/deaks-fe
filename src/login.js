import React, { useState } from "react";
import axios from "axios";
import "./styles/login.css";

import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const LoginForm = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onLogin = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/userLogin`, {
        email,
        password,
      })
      .then(function(res) {
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("roles", res.data.user.roles);
        localStorage.setItem("email", res.data.user.email);
        NotificationManager.success("User logged in sucessfully", "Success");
        navigation("/users");
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          "Incorrect password or username",
          "Login Failed"
        );
      });
  };

  return (
    <React.Fragment>
      {" "}
      <div className=" formWrapper">
        <div className="form-signin">
          <form onSubmit={onLogin}>
            <img
              className="mb-4"
              src={require("./assets/logo.jpg")}
              alt=""
            ></img>
            <h1 className=" signinHeading">Sign in</h1>

            <div className="form-floating">
              <label htmlFor="floatingInput">Username</label>
              <input
                type="text"
                value={email}
                onChange={emailChangeHandler}
                className="form-control"
                id="floatingInput"
                placeholder="Username"
              ></input>
            </div>
            <div className="form-floating">
              <label htmlFor="floatingPassword">Password</label>
              <input
                type="password"
                onChange={passwordChangeHandler}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
              ></input>
            </div>

            <div className="my-4"></div>
            <button className="w-100 btn btn-lg  loginButton" type="submit">
              Sign In
            </button>
            <p className="mt-4 text-center mb-3 text-muted">
              &copy;DeaksApp 2022
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LoginForm;

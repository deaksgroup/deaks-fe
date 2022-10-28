import React, { useState } from "react";
import axios from "axios";
import "./styles/login.css";

import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { CircularProgress } from "@mui/material";

const LoginForm = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onLogin = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post(`/userLogin`, {
        email,
        password,
      })
      .then(function (res) {
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("roles", res.data.user.roles);
        localStorage.setItem("email", res.data.user.email);
        NotificationManager.success("User logged in successfully", "Success");
        setTimeout(() => {
          navigation("/users");
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
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

            <div className="my-4">
              <button
                disabled={loading}
                className="w-100 btn btn-lg  loginButton"
                type="submit"
              >
                SIGN IN
                {loading ? (
                  <span>
                    <CircularProgress
                      size="1rem"
                      sx={{ color: "white", marginLeft: "10px" }}
                    />
                  </span>
                ) : (
                  ""
                )}
              </button>
              {/*  */}
            </div>
          </form>
          <p className="copyright">&copy;DeaksApp 2022</p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LoginForm;

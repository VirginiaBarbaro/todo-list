import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setToken, setUser } from "../slice/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios({
            method: "POST",
            url: " https://ha-auth-react.now.sh/auth ",
            headers: {
             "Content-Type": "application/json"
            },
            data: {
              username: username,
              password: password,
            },
          });

          dispatch(setToken(response.data))
          dispatch(setUser(username))

          console.log(response)
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <>
      <div className="container">
        <div className="col-8 m-auto mt-4 ">
          <h2 className="mb-4 p-3">Login with your credentials</h2>
          <form
            className="form-control shadow p-4"
            onSubmit={(event)=> handleSubmit(event)}
          >
            <div className="mb-3 row my-2">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label my-2">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control my-2"
                  id="staticEmail"
                  placeholder="email@example.com"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label my-2">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control my-2"
                  id="inputPassword"
                  placeholder="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-success">Login</button>
          </form>
          <Link to="/" className="btn btn-outline-primary mt-4 back">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;

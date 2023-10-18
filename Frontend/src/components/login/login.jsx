import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { store } from "../../store";
import { login } from "../../api";
import "./login.css";
import DotsLoader from "../../utils/loader";

function LoginPage() {
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setError("");
    const response = await login(formData);
    if (response.success) {
      store.dispatch({
        type: "SET_USER",
        payload: response.data.user,
      });
      navigate("/");
    } else {
      console.log(response);
      setError(response.error);
    }
    setLoggingIn(false);
  };

  return (
    <>
      <div className="login-page">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="login-btn" type="submit">
            {loggingIn ? <DotsLoader /> : "Log In"}
          </button>
          <p className="signup-link">
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </form>
      </div>
      <div className="error-container">
        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  );
}

export default LoginPage;

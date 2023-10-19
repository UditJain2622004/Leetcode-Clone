import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../api";
import { store } from "../../store";
import DotsLoader from "../../utils/loader";

import "./signup.css";

function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
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
    setError("");
    setSigningUp(true);
    const response = await signup(formData);
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
    setSigningUp(false);
  };

  return (
    <>
      <div className="signup-page">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              minLength={8}
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          <button className="signup-btn" type="submit">
            {signingUp ? <DotsLoader /> : "Sign Up"}
          </button>
          <p className="login-link">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
      <div className="error-container">
        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  );
}

export default SignupPage;

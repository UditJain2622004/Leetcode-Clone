import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./navbar.css";

function Navbar() {
  const user = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-dark">
      <Link className="navbar-brand" to={"/"}>
        <span className="navbar-title">PracticeDen</span>
      </Link>
      {user && (
        <div className="nav-buttons">
          <Link className="navbar-brand nav-button" to={"/profile"}>
            <span className="navbar-title">Profile</span>
          </Link>
          <Link className="navbar-brand nav-button" to={"/logout"}>
            <span className="navbar-title">Logout</span>
          </Link>
        </div>
      )}
      {!user && (
        <div className="nav-buttons">
          <Link className="navbar-brand nav-button" to={"/signup"}>
            <span className="navbar-title">SignUp</span>
          </Link>
          <Link className="navbar-brand nav-button" to={"/login"}>
            <span className="navbar-title">SignIn</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

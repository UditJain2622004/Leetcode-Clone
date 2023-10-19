import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api.js";
import { store } from "../../store.js";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutAndNavigate() {
      const response = await logout();
      if (response.success) {
        store.dispatch({ type: "CLEAR_USER" });
        navigate("/");
        window.scrollTo(0, 0);
      } else {
        navigate("/");
        window.scrollTo(0, 0);
      }
    }

    logoutAndNavigate();
  }, [navigate]);

  return <></>;
}

export default Logout;

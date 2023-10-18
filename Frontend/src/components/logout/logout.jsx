import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api.js";
import { store } from "../../store.js";

function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    async function logoutAndNavigate() {
      //   let loadingOverlay = document.querySelector(".loading-overlay");
      //   loadingOverlay.style.display = "block";
      const response = await logout();
      //   loadingOverlay.style.display = "none";
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

  return (
    <>
      {/* <div class="loading-overlay">
        <div class="loading-spinner"></div>
      </div> */}
    </>
  );
}

export default Logout;

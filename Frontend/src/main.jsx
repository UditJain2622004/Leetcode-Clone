import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistedStore } from "./store.js";

import LoginPage from "./components/login/login";
import SignupPage from "./components/signup/signup";
import Logout from "./components/logout/logout";
import Homepage from "./components/homepage/homepage";
import Profile from "./components/profilePage/profile";
import QuestionDetail from "./components/questionDetail/questionDetail";
import Navbar from "./components/navbar/navbar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <Router>
            <Navbar />

            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/question/:id" element={<QuestionDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </>
);

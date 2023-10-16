import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Homepage from "../components/homepage/homepage";
import QuestionDetail from "./questionDetail";
import Navbar from "../components/navbar/navbar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
      </Routes>
    </Router>
  </>
  // <React.StrictMode>
  //   <Homepage />
  // </React.StrictMode>
);

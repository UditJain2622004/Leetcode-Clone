import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./homepage.css";
import { getAllQuestions } from "../../api.js";
import QuestionList from "./questionList";

function Homepage() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getAllQuestions();
      console.log(fetchedQuestions);
      if (fetchedQuestions.success) {
        setQuestions(fetchedQuestions.data.questions);
      }
    };

    fetchQuestions();
  }, []);
  return (
    <div className="page">
      <QuestionList questions={questions} title={"Questions In Den"} />
    </div>
  );
}

export default Homepage;

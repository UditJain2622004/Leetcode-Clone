import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getAllQuestions } from "../../api.js";
import QuestionList from "./questionList";

import "./homepage.css";

function Homepage() {
  const user = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getAllQuestions();
      // console.log(fetchedQuestions);
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

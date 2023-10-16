import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./homepage.css";
import { getAllQuestions } from "../../src/api";
import Question from "./question";

function Homepage() {
  const [questions, setQuestions] = useState([]);
  // const amenities = ["wifi", "ac", "parking", "powerBackup", "tv", "fridge"];
  // const rules = ["smoking", "guests", "loudMusic"];

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
      <h1>Problem List</h1>

      <div className="container">
        {questions.length > 0 && (
          <div className="question-list">
            {questions.map((ques) => (
              <Link key={ques._id} to={`/question/${ques._id}`}>
                <Question key={ques._id} question={ques} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;

{
  /* <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Cras justo odioddddddddddddddddddddddddddddddddddd sss
          <span className="badge badge-primary badge-pill">14</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Dapibus ac facilisis in
          <span className="badge badge-primary badge-pill">2</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Morbi leo risus
          <span className="badge badge-primary badge-pill">1</span>
        </li>
      </ul> */
}

import React from "react";
import { Link } from "react-router-dom";
import "./questionList.css"; // Create a CSS file for your styles

const QuestionList = ({ questions }) => {
  //   questions = [
  //     {
  //       id: 1,
  //       title: "Check Prime",
  //       difficulty: "easy",
  //       tags: ["array", "math", "array", "math", "array", "math"],
  //     },
  //     {
  //       id: 2,
  //       title: "Check Palindrome",
  //       difficulty: "medium",
  //       tags: ["array", "math"],
  //     },
  //     {
  //       id: 3,
  //       title: "Check Prime",
  //       difficulty: "hard",
  //       tags: ["array", "math"],
  //     },
  //     {
  //       id: 1,
  //       title: "Check Palindrome",
  //       difficulty: "easy",
  //       tags: ["array", "math", "array", "math", "array", "math"],
  //     },
  //     {
  //       id: 2,
  //       title: "Check Prime",
  //       difficulty: "medium",
  //       tags: ["array", "math"],
  //     },
  //     {
  //       id: 3,
  //       title: "Check Palindrome",
  //       difficulty: "hard",
  //       tags: ["array", "math"],
  //     },
  //   ];
  return (
    <div className="homepage">
      <h2 className="homepage-title">Questions in Den</h2>
      <div className="row title-row">
        <div className="col col-lg-8 col-md-9 col-sm-11 list-title">Title</div>
        <div className="col col-lg-1 col-md-1 col-sm-0 list-difficulty">
          Difficulty
        </div>
        <div className="col col-lg-3 col-md-2 col-sm-1 list-tags">Tags</div>
      </div>
      <div className="question-list">
        {/* <ul> */}
        {questions.map((question) => (
          <div className="row" key={question.id}>
            <div className="col col-lg-8 col-md-9 col-sm-11 question-title">
              <Link
                className="question"
                key={question._id}
                to={`/question/${question._id}`}
              >
                {question.title}
              </Link>
            </div>

            <div className="col col-lg-1 col-md-1 col-sm-0 question-difficulty question-details">
              <span
                className={`difficulty ${question.difficulty.toLowerCase()}`}
              >
                {question.difficulty[0].toUpperCase()}
                {question.difficulty.slice(1)}
              </span>
            </div>
            <div className="col col-lg-3 col-md-2 col-sm-1 question-tags question-details">
              <div className="tags">
                {question.tags.length > 2 &&
                  question.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                {question.tags.length <= 2 &&
                  question.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
            <hr />
          </div>
        ))}
        {/* </ul> */}
      </div>
    </div>
  );
};

export default QuestionList;

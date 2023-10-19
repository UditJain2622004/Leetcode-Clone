import React from "react";
import { Link } from "react-router-dom";

import DotsLoader from "./../../utils/loader";

import "./questionList.css";

const QuestionList = ({ questions, title }) => {
  return (
    <>
      {!questions && (
        <p className="no-questions">
          No question solved yet! Start your practice <Link to={"/"}>now</Link>
        </p>
      )}
      {questions && (
        <div className="question-list-area">
          <h2 className="list-title">{title}</h2>

          <div className="row title-row">
            <div className="col col-lg-8 col-md-9 col-sm-11">Title</div>
            <div className="col col-lg-1 col-md-1 col-sm-0 list-difficulty">
              Difficulty
            </div>
            <div className="col col-lg-3 col-md-2 col-sm-1 list-tags">Tags</div>
          </div>

          <div className="question-list">
            {questions.length == 0 && <DotsLoader />}
            {questions.length > 0 &&
              questions.map((question) => (
                <div className="row" key={question.id}>
                  <div className="col col-lg-8 col-md-9 col-sm-11 question-title-area">
                    {/* prettier-ignore */}
                    <Link className="question-title-text" key={question._id} to={`/question/${question._id}`}>
                      {question.title}
                    </Link>
                  </div>

                  <div className="col col-lg-1 col-md-1 col-sm-0 question-difficulty question-details">
                    {/* prettier-ignore */}
                    <span className={`difficulty ${question.difficulty.toLowerCase()}`} >
                      {question.difficulty[0].toUpperCase()}{question.difficulty.slice(1)}
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
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionList;

import React from "react";

function Question(props) {
  console.log(props);
  const { question } = props;
  return (
    <div className="row question" key={question._id}>
      <div className="col-8">{question.title}</div>
      <div className="col">{question.difficulty}</div>
      <div className="col">{question.difficulty}</div>
    </div>
  );
}

export default Question;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import QuestionList from "../homepage/questionList";

import { getProfile } from "../../api";
import "./profile.css";

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [profile, setProfile] = useState({});
  const [questionSolved, setQuestionSolved] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log(user);
      const profile = await getProfile(user._id);
      console.log(profile);
      if (profile.success) {
        setProfile(profile.data.user);
        let questions = profile.data.user.submissions.map((el) => el.question);
        questions = [...new Set(questions)];
        questions.length > 0
          ? setQuestionSolved(questions)
          : setQuestionSolved(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <div className="stats">
        <div className="row">
          <div className="col col-lg-5 col-md-4 col-sm-6 personal info">
            <h5 className="info-title">Personal Info</h5>
            <p>Name : {profile.name || "..."}</p>
            <p>Email : {profile.email || "..."}</p>
          </div>
          <div className="col col-lg-5 col-md-4 col-sm-6 stats info">
            <h5 className="info-title">Progress</h5>
            <p className="easy">Easy : {profile.stats?.easy ?? "..."}</p>
            <p className="medium">Medium : {profile.stats?.medium ?? "..."}</p>
            <p className="hard">Hard : {profile.stats?.hard ?? "..."}</p>
          </div>
        </div>
      </div>

      <div className="solved-question">
        <QuestionList questions={questionSolved} title={"Question Solved"} />
      </div>
    </div>
  );
}

export default Profile;

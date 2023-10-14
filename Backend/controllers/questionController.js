import * as executer from "./../execute.js";
import Question from "./../models/questionModel.js";

export const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find().select(
      "title difficulty tags likes number"
    );

    res.status(200).json({
      success: true,
      data: {
        questions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};
export const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        question,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};
export const addQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      data: {
        question,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

export const submitQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    const results = await executer.make_batch_request(
      req.body,
      question.testCases,
      question.answers
    );
    for (const submission in results.submissions) {
      console.log(results.submissions[submission]);
    }

    // console.log(results);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

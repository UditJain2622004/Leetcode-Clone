import * as executer from "../utils/execute.js";
import { check_answer } from "../utils/analyzer.js";
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
    // console.log(question);
    const results = await executer.make_batch_request(
      req.body,
      question.testCases
    );
    // for (const submission in results.submissions) {
    //   console.log(results.submissions[submission]);
    // }

    const output = check_answer(results.submissions);
    // for (const submission in results.submissions) {
    //   console.log(results.submissions[submission].compile_output);
    // }
    console.log(output);
    res.status(201).json({
      success: output.success,
      data: {
        output,
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

export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

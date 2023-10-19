import * as executer from "../utils/execute.js";
import { check_answer } from "../utils/analyzer.js";
import Question from "./../models/questionModel.js";
import Submission from "./../models/submissionModel.js";

export const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find()
      .select("title difficulty tags likes number")
      .lean();

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
      error: "Something went wrong!",
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
      error: "Something went wrong!",
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
      error: "Something went wrong!",
    });
  }
};

export const submitQuestion = async (req, res, next) => {
  try {
    const user = req.body.user;
    if (user) delete req.body.user;

    const question = await Question.findById(req.params.id);

    //prettier-ignore
    const results = await executer.make_batch_request(req.body, question.testCases);

    const output = await check_answer(
      results.submissions,
      req.body.language_id,
      req.params.id
    );

    if (user) {
      const { description, id, time, memory } = output;
      const submission = await Submission.create({
        question: req.params.id,
        user: user._id,
        description,
        id,
        time,
        memory,
        language_id: req.body.language_id,
      });
    }

    // console.log(output);
    res.status(201).json({
      success: true,
      data: {
        output,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: "Something went wrong!",
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
      error: "Something went wrong!",
    });
  }
};

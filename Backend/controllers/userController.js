import mongoose from "mongoose";
import User from "./../models/userModel.js";
import Submission from "./../models/submissionModel.js";

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const calculate_stats = (submissions) => {
  const stats = { easy: 0, medium: 0, hard: 0 };
  submissions.forEach((el) => {
    stats[el.question.difficulty.toLowerCase()] += 1;
  });
  return stats;
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      results: users.length,
      data: {
        users: users,
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

export const createUser = async (req, res, next) => {
  try {
    //prettier-ignore
    let details = filterObj(req.body, ["name","email","password","passwordConfirm",]);
    const newUser = await User.create(details);
    newUser.password = undefined;
    res.status(201).json({
      success: true,
      data: {
        user: newUser,
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

export const getUserById = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id).select("name email").lean();

    let submissions = await Submission.find({
      user: new mongoose.Types.ObjectId(req.params.id),
      id: 3,
    })
      .populate({
        path: "question",
        select: "title difficulty tags",
      })
      .select("-__v -user -description")
      .lean();

    const uniqueQuestionIds = Array.from(
      new Set(submissions.map((item) => item.question))
    );
    const uniqueQuestions = uniqueQuestionIds.map((id) => {
      return submissions.find((item) => item.question === id);
    });

    const stats = calculate_stats(uniqueQuestions);
    user.stats = stats;
    user.submissions = uniqueQuestions;
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    let updates = filterObj(req.body, ["name", "email"]);
    updates.updated = Date.now();
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      success: true,
      data: {
        user: user,
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

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
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

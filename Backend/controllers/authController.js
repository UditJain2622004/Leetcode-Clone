import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  try {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      domain: "localhost",
    };

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // 1) Check if email & password are given in request
    if (!req.body.email || !req.body.password) {
      throw new Error("Please provide email and password.");
    }
    // 2) Check if user exists & password is correct
    const user = await User.findOne({ email: email }).select("+password");

    // 3) Compare passwords
    if (!user || !(await user.comparePassword(password, user.password))) {
      throw new Error("Incorrect email or password!!");
    }
    createSendToken(user, 200, req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

export const logout = (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
  });
};

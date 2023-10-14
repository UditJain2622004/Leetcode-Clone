import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  result: {
    type: String,
  },
  time: {
    type: Number,
  },
  Memory: {
    type: Number,
  },
  language: {
    type: String,
  },

  //********************* */
  solution: {
    type: String,
  },
});

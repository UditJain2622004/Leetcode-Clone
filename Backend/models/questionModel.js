import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  statement: {
    type: String,
  },
  examples: {
    type: [[String]],
  },
  constraints: {
    type: [String],
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  tags: {
    type: [String],
  },

  //****************** */
  likes: {
    type: Number,
  },
  solution: {
    type: String,
  },
  number: {
    type: Number,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;

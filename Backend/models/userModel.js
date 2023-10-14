const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name given!! Name required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "No email given!! email required"],
    unique: true,
    lowercase: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please provide a valid email",
    ],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  password: {
    type: String,
    required: [true, "No password given"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      // THIS WORKS ON SAVE AND CREATE ONLY, NOT ON UPDATE
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  questionsSolved: {
    type: [mongoose.Schema.ObjectId],
    ref: "Question",
  },
  easy: {
    type: Number,
    default: 0,
  },
  medium: {
    type: Number,
    default: 0,
  },
  hard: {
    type: Number,
    default: 0,
  },

  //************* */
  rank: {
    type: number,
  },
  solutions: {
    type: string,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // encrypts the password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.comparePassword = async function (
  enteredPassword,
  Password
) {
  return await bcrypt.compare(enteredPassword, Password);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  // console.log(resetToken);
  // console.log(this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;

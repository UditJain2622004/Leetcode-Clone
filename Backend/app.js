import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection established"));

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

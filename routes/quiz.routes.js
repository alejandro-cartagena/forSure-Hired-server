import express from "express";
import Quiz from "../models/quiz.model.js";
import Jobs from "../models/job.model.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

// CREATE A QUIZ ASSOCIATED WITH A JOB
router.post("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, behavioral, technical } = req.body;

    const createdQuiz = await Quiz.create({
      name,
      behavioral,
      technical,
      job: jobId,
    });

    await Jobs.findByIdAndUpdate(
      jobId,
      { $push: { quizzes: createdQuiz._id } },
      { new: true }
    );

    res.status(201).json({ message: "Quiz created successfully", createdQuiz });
  } catch (error) {
    console.log("error while creating a quiz", error);
  }
});

// CREATE A QUIZ NOT ASSOCIATED WITH ANY JOB
router.post("/", async (req, res) => {
  try {
    const { name, behavioral, technical } = req.body;

    const createdQuiz = await Quiz.create({
      name,
      behavioral,
      technical,
    });

    res.status(201).json({ message: "Quiz created successfully", createdQuiz });
  } catch (error) {
    console.log(error);
  }
});

// GET ALL QUIZZES ASSOCIATED WITH JOB
router.get("/", isAuth, async (req, res) => {
  try {
    const { jobId } = req.body;

    const allQuizzes = await Quiz.find({ job: jobId });

    res.status(200).json(allQuizzes);
  } catch (error) {
    console.log("error getting all quizzes", error);
  }
});

// GET SINGLE QUIZ
router.get("/:quizId", isAuth, async (req, res) => {
  try {
    const { quizId } = req.params;

    const singleQuiz = await Quiz.findById(quizId);
    res.json(singleQuiz);
  } catch (error) {
    console.log("error getting single quiz", error);
  }
});

// DELETE A QUIZ
router.delete("/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;
    const quizToDelete = await Quiz.findByIdAndDelete(quizId);

    await Jobs.findByIdAndUpdate(
      quizToDelete.job,
      { $pull: { quizzes: quizToDelete._id } },
      { new: true }
    );

    res.json({ message: "Quiz successfully deleted" });
  } catch (error) {
    console.log("error deleting a single quiz", error);
  }
});

export default router;

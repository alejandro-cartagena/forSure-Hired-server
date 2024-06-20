import express from "express";
import checkJob from "../middlewares/checkJob.js";
import Jobs from "../models/job.model.js";
import isAuth from "../middlewares/isAuth.js";
import isOwner from "../middlewares/isOwner.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/", checkJob, isAuth, async (req, res) => {
  try {
    //DESTRUCTURE THE REQ.BODY TO VERIFY THE PROPS AND CREATE A NEW JOB WITH THE RESULT
    const {
      title,
      description,
      techs,
      location,
      appliedDate,
      minSalary,
      maxSalary,
      jobUrl,
      company,
      user,
    } = req.body;
    const newJob = await Jobs.create({
      title,
      description,
      techs,
      location,
      appliedDate,
      minSalary,
      maxSalary,
      jobUrl,
      company,
      user,
    });
    //ADD THE NEW JOB ID TO THE USER JOBS LIST
    await User.findByIdAndUpdate(req.user._id, { $push: { jobs: newJob._id } });
    res
      .status(201)
      .json({ messagee: `New Job added to your Tracking List`, job: newJob });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//RETURN ALL THE JOBS THAT BELONGS TO THE LOGGED IN USER
router.get("/", isAuth, async (req, res) => {
  try {
    const allJobs = await Jobs.find({ user: req.user._id });
    res.status(200).json(allJobs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//ONLY CAN SEE A JOB IF YOU ARE THE OWNER
router.get("/:jobId", isAuth, isOwner, async (req, res) => {
  try {
    const { jobId } = req.params;
    const singleJob = await Jobs.findById(jobId);
    res.json(singleJob);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//ONLY LOGGED IN AND OWNER USERS CAN MODIFY A JOB
router.put("/:jobId", checkJob, isAuth, isOwner, async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedJob = await Jobs.findByIdAndUpdate(jobId, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      message: `Job ${updatedJob.title} successfully updated.`,
      job: updatedJob,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//ONLY LOGGED IN AND OWNER USERS CAN DELETE A JOB
router.delete("/:jobId", isAuth, isOwner, async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await Jobs.findByIdAndDelete(jobId);
    //TODO: delete job from user job list and delete all quizzes linked to job
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { jobs: deletedJob._id },
    });
    res.json({ message: `Job ${deletedJob.title} successfully deleted.` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;

import express from "express";
import checkJob from "../middlewares/checkJob.js";
import Jobs from "../models/job.model.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

//TODO: after testing routes need to add isAuth and isOwner middleware for protect them

router.post("/", checkJob, async (req, res) => {
  try {
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
    res
      .status(201)
      .json({ messagee: `New Job added to your Tracking List`, job: newJob });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allJobs = await Jobs.find();
    res.status(200).json(allJobs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const singleJob = await Jobs.findById(jobId);
    res.json(singleJob);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:jobId", checkJob, async (req, res) => {
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

router.delete("/jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await Jobs.findByIdAndDelete(jobId);
    //TODO: delete job from user job list and delete all quizzes linked to job
    res.json({ message: `Job ${deletedJob.title} successfully deleted.` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;

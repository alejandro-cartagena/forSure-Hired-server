import Jobs from "../models/job.model.js";

const isOwner = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Jobs.findById(jobId);
    job.user.toString() === req.user._id
      ? next()
      : res.status(403).json({
          message: "You haven't permission to see or modify this job",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default isOwner;

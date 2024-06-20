import Jobs from "../models/job.model.js";

export default isOwner = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Jobs.findById(jobId);
    job.user === req.user._id
      ? next()
      : res
          .status(403)
          .json({
            message: "You haven't permission to see or modify this job",
          });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

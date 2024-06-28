const checkJob = (req, res, next) => {
  const jobProps = [
    "_id",
    "title",
    "description",
    "skills",
    "location",
    "appliedDate",
    "minSalary",
    "maxSalary",
    "jobUrl",
    "stage",
    "company",
    "user",
    "quiz",
    "updatedAt",
    "createdAt",
    "__v",
  ];
  for (const prop in req.body) {
    if (!jobProps.includes(prop)) {
      return res.status(400).json({ message: "Invalid Body" });
    }
  }
  next();
};

export default checkJob;

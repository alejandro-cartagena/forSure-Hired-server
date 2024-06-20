export default checkJob = (req, res, next) => {
  const jobProps = [
    "title",
    "description",
    "techs",
    "location",
    "appliedDate",
    "minSalary",
    "maxSalary",
    "jobUrl",
    "company",
    "user",
    "quizzes",
  ];
  for (const prop in req.body) {
    if (!jobProps.includes(prop)) {
      return res.status(400).json({ message: "Invalid Body" });
    }
  }
  next();
};

import express, { urlencoded } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
//ROUTERS IMPORT
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import quizRouter from "./routes/quiz.routes.js";

import connectDB from "./config/mongoose.config.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/jobs", jobRouter);
app.use("/quiz", quizRouter);

app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`Server running on port ${process.env.PORT}...`);
  connectDB();
});

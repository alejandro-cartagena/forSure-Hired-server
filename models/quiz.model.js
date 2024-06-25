import { Schema, model } from "mongoose";

const quizModel = new Schema(
  {
    name: { type: String, required: true },
    questions: [{ type: String, required: true }],
    correctAnswers: [{ type: String, required: true }],
    wrongAnswers: [[{ type: String, required: true }]],
    job: { type: Schema.Types.ObjectId, ref: "Job" },
  },
  { timestamps: true }
);

export default model("Quiz", quizModel);

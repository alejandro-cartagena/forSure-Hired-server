import { Schema, model } from "mongoose";

const questionSetSchema = new Schema(
  {
    questions: [{ type: String, required: true }],
    correctAnswers: [{ type: String, required: true }],
    incorrectAnswers: [[{ type: String, required: true }]],
  },
  { _id: false }
);

const quizModel = new Schema(
  {
    name: { type: String, required: true },
    behavioral: questionSetSchema,
    technical: questionSetSchema,
    job: { type: Schema.Types.ObjectId, ref: "job" },
  },
  { timestamps: true }
);

export default model("Quiz", quizModel);

// [1, 2, 3, 4]
// [
//     [1, 2, 3],
//     [],
//     [],
//     []

// ]

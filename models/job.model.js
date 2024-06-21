import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const companySchema = new Schema({
  name: { type: String, required: true, trim: true },
  logo: { type: String, required: true, trim: true },
  valoration: { type: Number, required: true, trim: true },
  address: { type: addressSchema, required: true },
});

const jobSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      // minLength: 10,
      // maxLength: 40,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    skills: { type: String, required: true, trim: true },
    location: {
      type: String,
      required: true,
      enum: ["On Site", "Hybrid", "Remote"],
    },
    appliedDate: { type: Date, required: true },
    minSalary: { type: String, required: true, trim: true },
    maxSalary: { type: String, required: true, trim: true },
    jobUrl: { type: String, required: true, trim: true },
    company: { type: companySchema, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  },
  { timestamps: true }
);

export default model("Job", jobSchema);

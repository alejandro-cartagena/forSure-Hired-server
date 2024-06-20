import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      maxLength: 34,
      minLength: 4,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxLength: 42,
      trim: true,
    },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: ["jobseeker", "employer"] },
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    fullName: { type: String },
    address: { type: String },
    jobs: [{ type: Schema.Types.ObjectId, required: true, ref: "Job" }],
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);

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
    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      default: "jobseeker",
    },
    profilePic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp0xKoXUryp0JZ1Sxp-99eQiQcFrmA1M1qbQ&s",
    },
    fullName: { type: String },
    address: { type: String },
    jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);

import { Schema, model } from "mongoose";

const stateEnum = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true, enum: stateEnum },
});

const companySchema = new Schema({
  name: { type: String, required: true, trim: true },
  logo: {
    type: String,
    required: true,
    trim: true,
    default: "https://cdn-icons-png.freepik.com/512/10303/10303793.png",
  },
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
    appliedDate: { type: String, required: true },
    minSalary: { type: String, required: true, trim: true },
    maxSalary: { type: String, required: true, trim: true },
    jobUrl: { type: String, required: true, trim: true },
    stage: {
      type: String,
      required: true,
      enum: ["Applied", "Interview", "Rejected", "Closed"],
      default: "Applied",
    },
    company: { type: companySchema, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
  },
  { timestamps: true }
);

export default model("Job", jobSchema);

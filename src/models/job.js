import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  companyName: String,
  title: String,
  type: String,
  location: String,
  experince: String,
  description: String,
  skills: String,
  recruiterId: String,
  applicants: [
    {
      name: String,
      email: String,
      userId: String,
      status: String,
    },
  ],
});

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    recruiterUserID: String,
    name: String,
    email: String,
    candidateUserID: String,
    status: Array,
    jobID: String,
    jobAppliedDate: String,
});

const Applications = mongoose.models.Applications || mongoose.model("Applications", ApplicationSchema);
export default Applications;
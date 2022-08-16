const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    attachments: { // resume
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "Applied", // Applied, Phone Interview, In-Person Interview, On-site Interview, Rejected, Accepted
    },
    notes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applicant", ApplicantSchema);

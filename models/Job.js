const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    companyId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    salary: {
        type: String,
        required: true,
    },
    hiddenSalary: {
        type: Boolean,
        default: false,
    },
    jobType: {
        type: String,
        required: true,
        default: "Full Time",
    },
    jobCondition: {
        type: String,
        required: true,
        default: "Remote",
    },
    requirements: {
        type: String,
        required: true,
    },
    jobApplications: {
        type: Array,
        default: [],
    },
    jobViews: {
        type: Array,
        default: [],
    },
    jobLikes: {
        type: Array,
        default: [],
    },
    jobComments: {
        type: Array,
        default: [],
    },
    closed: {
        type: String,
        default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
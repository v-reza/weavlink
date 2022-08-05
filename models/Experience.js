const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    userId: {
        type: String
    },
    title: {
        type: String
    },
    employmentType: {
        type: String
    },
    companyName: {
        type: String
    },
    location: {
        type: String
    },
    isCurrentlyWorking: {
        type: Boolean
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    industry: {
        type: String
    },
    description: {
        type: String
    },
    profileHeadline: {
        type: String
    },
    skills: {
        type: Array,
        default: []
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", ExperienceSchema);

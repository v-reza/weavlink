const mongoose = require("mongoose");

const MyEducationsSchema = new mongoose.Schema(
  {
    education: {
      type: String
    },
    degree: {
      type: String
    },
    fieldOfStudy: {
      type: String
    },
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    startYears: {
      type: String
    },
    endYears: {
      type: String
    },
    grade: {
      type: String
    },
    activities: {
      type: String
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MyEducation", MyEducationsSchema);

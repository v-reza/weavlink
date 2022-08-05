const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    school: {
      type: String,
    },
    degree: {
      type: String,
    },
    fieldOfStudy: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    grade: {
      type: String,
    },
    activitiesAndSocieties: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", EducationSchema);

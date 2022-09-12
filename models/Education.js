const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    domains: {
      type: Array,
    },
    alpha_two_code: {
      type: String
    },
    country: {
      type: String
    },
    web_pages: {
      type: Array
    },
    name: {
      type: String
    },
    state_province: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", EducationSchema);

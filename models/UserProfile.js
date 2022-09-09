const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    headLine: {
      type: String,
    },
    address: {
      type: String,
    },
    currentPosition: {
      type: Array,
      default: []
    },
    skills: {
      type: Array,
      default: []
    },
    industry: {
      type: String,
    },
    education: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);

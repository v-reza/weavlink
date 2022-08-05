const mongoose = require("mongoose");

const UserSkillsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSkills", UserSkillsSchema);

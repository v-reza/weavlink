const mongoose = require("mongoose");

const MySkillsSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
    skillToUse: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MySkills", MySkillsSchema);

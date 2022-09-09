const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skills", SkillsSchema);

const mongoose = require("mongoose");

const UserEducationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    education: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserEducations", UserEducationSchema);

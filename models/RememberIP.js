const mongoose = require("mongoose");

const RememberIP = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RememberIP", RememberIP);

const mongoose = require("mongoose");

const ReplyCommentsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReplyComments", ReplyCommentsSchema);

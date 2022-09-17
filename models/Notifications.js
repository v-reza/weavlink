const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema(
  {
    currentUserVisited: {
      type: String,
    },
    userId: {
      type: String,
    },
    type: {
      type: String,
      default: "visit"
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", NotificationsSchema);

const mongoose = require("mongoose");

const PeopleViewSchema = new mongoose.Schema(
  {
    currentUser: {
      type: String,
    },
    userView: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PeopleView", PeopleViewSchema);

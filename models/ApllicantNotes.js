const mongoose = require("mongoose");

const ApplicantNotesSchema = new mongoose.Schema(
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

module.exports = mongoose.model("ApplicantNotes", ApplicantNotesSchema);

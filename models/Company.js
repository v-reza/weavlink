const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    companyEmail: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
    },
    companyCover: {
        type: String,
    },
    companyOwner: {
        type: String
    },
    companyFollowers: {
        type: Array,
        default: [],
    },
    companyFollowings: {
        type: Array,
        default: [],
    },
    companyMembers: {
        type: Array,
        default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);

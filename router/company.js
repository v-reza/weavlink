const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Company = require("../models/Company");
const User = require("../models/User");

router.get("/check/my-company", verifyBearerToken, async (req, res) => {
  try {
    const company = await Company.find({
      companyOwner: req.user.id,
    });
    return res.status(200).json(company);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
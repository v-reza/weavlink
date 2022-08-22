const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Company = require("../models/Company");
const User = require("../models/User");

router.post("/new", verifyBearerToken, async (req, res) => {
  try {
    const oldCompany = await Company.findOne({
      $or: [
        { companyEmail: req.body.companyEmail },
        { companyName: req.body.companyName },
      ],
    });
    if (oldCompany) {
      return res.status(400).send("Company already exists");
    }

    const company = await new Company({
      companyOwner: req.user.id,
      ...req.body,
    });
    await company.save();
    return res.status(200).json(company);
  } catch (error) {
    return res.status(500).json(error);
  }
});

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

router.delete("/delete/:id", verifyBearerToken, async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      companyOwner: req.user.id,
    });
    await company.deleteOne();
    return res.status(200).json("Delete Successful");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

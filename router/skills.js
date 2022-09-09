const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Company = require("../models/Company");
const User = require("../models/User");
const Skills = require("../models/Skills");
const mongoose = require("mongoose");

router.get("/list", async (req, res) => {
  try {
    const query = req.query.query || "";
    const limit = parseInt(req.query.limit) || 10;
    const skill = await Skills.find({
      name: { $regex: query, $options: "i" },
    }).limit(limit);
    return res.status(200).json(skill);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

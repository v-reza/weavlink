const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Company = require("../models/Company");
const User = require("../models/User");
const Skills = require("../models/Skills");
const mongoose = require("mongoose");
const MySkills = require("../models/MySkills");
const UserSkills = require("../models/UserSkills");

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

router.get("/mySkills/:id", async (req, res) => {
  try {
    const userSkills = await UserSkills.aggregate([
      {
        $match: {
          userId: req.params.id,
        },
      },
      {
        $lookup: {
          from: "myskills",
          localField: "skills",
          foreignField: "_id",
          as: "skills",
        },
      },
    ]);
    return res.status(200).json(userSkills[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", verifyBearerToken, async (req, res) => {
  try {
    const { name } = req.body;
    const mySkills = await MySkills.create({
      skill: name,
    })
    const userSkills = await UserSkills.findOne({
      userId: req.user.users._id,
    });
    if (!userSkills) {
      await UserSkills.create({
        userId: req.user.users._id,
        skills: [mySkills._id],
      });
    }
    await userSkills.updateOne({
      $push: {
        skills: mySkills._id,
      },
    });
    return res.status(200).json("Skill added successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Company = require("../models/Company");
const User = require("../models/User");
const Skills = require("../models/Skills");
const mongoose = require("mongoose");
const MySkills = require("../models/MySkills");
const UserSkills = require("../models/UserSkills");
const Educations = require("../models/Education");
const MyEducations = require("../models/MyEducation");
const UserEducations = require("../models/UserEducation");

router.get("/list", async (req, res) => {
  try {
    const query = req.query.query || "";
    const limit = parseInt(req.query.limit) || 10;
    const education = await Educations.find({
      name: { $regex: query, $options: "i" },
    }).limit(limit);
    return res.status(200).json(education);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", verifyBearerToken, async (req, res) => {
  try {
    const {
      education,
      degree,
      fieldOfStudy,
      startYears,
      endYears,
      startDate,
      endDate,
      grade,
      activities,
      description,
    } = req.body;
    const myEducations = await MyEducations.create({
      education,
      degree,
      fieldOfStudy,
      startYears,
      endYears,
      startDate,
      endDate,
      grade,
      activities,
      description,
    });
    const userEducations = await UserEducations.findOne({
      userId: req.user.users._id,
    });
    if (!userEducations) {
      await UserEducations.create({
        userId: req.user.users._id,
        education: [myEducations._id],
      });
    } else {
      await UserEducations.findOneAndUpdate(
        {
          userId: req.user.users._id,
        },
        {
          $push: {
            education: myEducations._id,
          },
        }
      );
    }
    return res.status(200).json(myEducations);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/myEducations/:id", async (req, res) => {
  try {
    const userEducations = await UserEducations.aggregate([
      {
        $match: {
          userId: req.params.id,
        },
      },
      {
        $lookup: {
          from: "myeducations",
          localField: "education",
          foreignField: "_id",
          as: "education",
        },
      },
    ]);
    return res.status(200).json(userEducations[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

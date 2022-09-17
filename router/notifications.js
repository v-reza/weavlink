const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Company = require("../models/Company");
const User = require("../models/User");
const Skills = require("../models/Skills");
const mongoose = require("mongoose");
const Notifications = require("../models/Notifications");

router.get("/", verifyBearerToken, async (req, res) => {
  try {
    const notifications = await Notifications.aggregate([
      {
        $match: {
          userId: req.user.users._id,
        },
      },
      {
        $addFields: {
          currentUserVisited: {
            $toObjectId: "$currentUserVisited",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "currentUserVisited",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $unwind: "$users",
      }
    ]);
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", verifyBearerToken, async (req, res) => {
  try {
    const notifications = await Notifications.create({
      currentUserVisited: req.user.users._id,
      ...req.body,
    });
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", verifyBearerToken, async(req, res) => {
  try {
    const notifications = await Notifications.findOne({
      _id: req.params.id,
      userId: req.user.users._id,
    })
    if (!notifications) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }
    await notifications.deleteOne();
    return res.status(200).json("Notification deleted");
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router;

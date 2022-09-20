const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const User = require("../models/User");
const Company = require("../models/Company");
const mongoose = require("mongoose");
const UserProfile = require("../models/UserProfile");

router.get("/", async (req, res) => {
  try {
    const data = [];
    const users = await User.find().select([
      "-password",
      "-__v",
      "-createdAt",
      "-updatedAt",
      "-email",
    ]);
    users.map((user) => {
      data.push(user);
    });
    const company = await Company.find().select([
      "-password",
      "-__v",
      "-createdAt",
      "-updatedAt",
      "-email",
    ]);
    company.map((company) => {
      data.push({
        _id: company._id,
        firstname: company.companyName.split(" ")[0],
        lastname: company.companyName.split(" ")[1]
          ? company.companyName.split(" ")[1]
          : "",
      });
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/search/userSearch", async(req, res) => {
  try {
    const users = await User.find().select([
      "-password",
      "-__v",
      "-createdAt",
      "-updatedAt",
      "-email",
    ]);
    return res.json(users)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get("/mentions/listUsersMentions", async (req, res) => {
  try {
    const data = [];
    const users = await User.find().select([
      "-password",
      "-__v",
      "-createdAt",
      "-updatedAt",
      "-email",
    ]);
    users.map((user) => {
      data.push({
        id: user._id,
        display: user.firstname + " " + user.lastname,
        link: "https://weavlink.com/" + user.username ? user.username : "",
        avatar: user.profilePicture ? user.profilePicture : "/avatar.png",
      });
    });
    const company = await Company.find().select([
      "-password",
      "-__v",
      "-createdAt",
      "-updatedAt",
      "-email",
    ]);
    company.map((company) => {
      data.push({
        id: company._id,
        display:
          company.companyName.split(" ").length > 1
            ? company.companyName.split(" ")[0] +
              " " +
              company.companyName.split(" ")[1]
            : company.companyName,
        link:
          "https://weavlink.com/" + company.companyName
            ? company.companyName
            : "",
        avatar: company.companyLogo ? company.companyLogo : "/avatar.png",
      });
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

/**
 * Follow User
 */
router.put("/:id/follow", verifyBearerToken, async (req, res) => {
  if (req.user.users._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      console.log(user)
      const currentUser = await User.findById(req.user.users._id);
      if (!user.followers.includes(req.user.users._id)) {
        await user.updateOne({ $push: { followers: req.user.users._id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("your allready follow this user");
      }
    } catch (error) {
      // console.log(error)
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cant follow yourself");
  }
});

/**
 * Unfollow User
 */
router.put("/:id/unfollow", verifyBearerToken, async (req, res) => {
  if (req.user.users._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.users._id);
      if (user.followers.includes(req.user.users._id)) {
        await user.updateOne({ $pull: { followers: req.user.users._id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("your dont follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cant unfollow yourself");
  }
});

router.get("/listFriends/notFollow", verifyBearerToken, async (req, res) => {
  try {
    // const user = await User.find({
    //   _id: { $ne: req.user.users._id },
    //   followers: { $ne: req.user.users._id },
    // }).select(["-password", "-__v", "-createdAt", "-updatedAt", "-email"]);
    const userProfile = await UserProfile.aggregate([
      // {
      //   $match: {
      //     _id: { $ne: req.user.users._id },
      //     followers: { $ne: req.user.users._id },
      //   },
      // },
      {
        $match: {
          userId: { $ne: req.user.users._id },
        },
      },
      {
        $addFields: {
          userId: {
            $toObjectId: "$userId",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          "user.followers": { $ne: req.user.users._id },
        },
      },
      {
        $limit: 3,
      },
      {
        $unwind: "$user",
      },
    ]);

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(403).json(error);
  }
});

module.exports = router;

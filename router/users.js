const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const User = require("../models/User");
const Company = require("../models/Company");

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
      const currentUser = await User.findById(req.user.users._id);
      if (!user.followers.includes(req.user.users._id)) {
        await user.updateOne({ $push: { followers: req.user.users._id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("your allready follow this user");
      }
    } catch (error) {
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

module.exports = router;

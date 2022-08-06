const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");

router.get("/:id", async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.params.id });
    res.status(200).json(userProfile);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/", verifyBearerToken, async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({
      userId: req.user.id,
    });
    await userProfile.updateOne({
      $set: {
        headLine: req.body.headLine,
        country: req.body.country,
        city: req.body.city,
        about: req.body.about,
      },
    });
    const user = await User.findById(req.user.id);
    await user.updateOne({
      $set: {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
      },
    });

    const userUpdated = await User.findById(req.user.id);
    res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

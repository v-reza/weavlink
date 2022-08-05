const router = require("express").Router();
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const UserSkills = require("../models/UserSkills");
const Experience = require("../models/Experience");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).send("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    const userProfile = new UserProfile({
      userId: user._id,
    });
    await userProfile.save();
    const userSkills = new UserSkills({
      userId: user._id,
    });
    await userSkills.save();
    const experience = new Experience({
      userId: user._id,
    });
    await experience.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });

    const { password, ...userDocs } = user._doc;

    return res.status(201).json({
      user: userDocs,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { phone: email }],
    });
    if (!user) {
      return res.status(400).json("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });

    const { password: pwd, ...userDocs } = user._doc;

    return res.status(200).json({
      user: userDocs,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/google-login", async (req, res) => {
  try {
    const { email } = req.body;
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      const token = jwt.sign({ id: oldUser._id }, process.env.JWT_TOKEN, {
        expiresIn: "2h",
      });
      const { password, ...userDocs } = oldUser._doc;

      if (!oldUser.password) {
        return res.status(200).json({
          statusCode: 404,
          message: "User does not have password",
          user: userDocs,
        });
      }

      return res.status(200).json({
        user: userDocs,
        token: token,
      });
    }

    const user = new User({
      ...req.body,
      password: null,
    });
    await user.save();
    const userProfile = new UserProfile({
      userId: user._id,
    });
    await userProfile.save();
    const userSkills = new UserSkills({
      userId: user._id,
    });
    await userSkills.save();
    const experience = new Experience({
      userId: user._id,
    });
    await experience.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });

    const { password, ...userDocs } = user._doc;

    return res.status(201).json({
      statusCode: 404,
      user: userDocs,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/google-set-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({
        statusCode: 404,
        message: "User does not exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.updateOne({ password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });
    const { password, ...userDocs } = user._doc;
    return res.status(200).json({
      user: userDocs,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/deleteall", async (req, res) => {
  try {
    await User.deleteMany({});
    return res.status(200).json("All users deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

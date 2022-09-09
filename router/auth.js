const router = require("express").Router();
const User = require("../models/User");
const Company = require("../models/Company");
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
    const updateUsername = await User.findById(user._id);
    await updateUsername.updateOne({
      username: (
        user.firstname.replaceAll(" ", "-") +
        user.lastname.replaceAll(" ", "-") +
        "-" +
        user._id
      ).toLowerCase(),
    });

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

    const { password: pwd, ...userDocs } = user._doc;

    const token = jwt.sign({ users: userDocs }, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      user: userDocs,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/login-remember", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(400).json("User does not exist");
    }

    const { password: pwd, ...userDocs } = user._doc;

    const token = jwt.sign({ users: userDocs }, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });
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
      const { password, ...userDocs } = oldUser._doc;

      const token = jwt.sign({ users: userDocs }, process.env.JWT_TOKEN, {
        expiresIn: "2h",
      });

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
    const updateUsername = await User.findById(user._id);
    await updateUsername.updateOne({
      username: (
        user.firstname.replaceAll(" ", "-") +
        user.lastname.replaceAll(" ", "-") +
        "-" +
        user._id
      ).toLowerCase(),
    });

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
    const { password, ...userDocs } = user._doc;
    const token = jwt.sign({ users: userDocs }, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });
    return res.status(200).json({
      user: userDocs,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

/* Auth Company */
router.post("/register-company", async (req, res) => {
  try {
    const oldUser = await Company.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).send("Company already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const company = new Company({
      ...req.body,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: company._id, isCompany: true },
      process.env.JWT_TOKEN,
      {
        expiresIn: "2h",
      }
    );

    const { password, ...companyDocs } = company._doc;

    await company.save();
    return res.status(201).json({
      user: companyDocs,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/company-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email: req.body.email });
    if (!company) {
      return res.status(400).json("Company does not exist");
    }
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json("Invalid password");
    }
    const token = jwt.sign(
      { id: company._id, isCompany: true },
      process.env.JWT_TOKEN,
      {
        expiresIn: "2h",
      }
    );
    return res.status(200).json({
      user: company,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  } 
});

module.exports = router;

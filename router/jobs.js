const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Job = require("../models/Job");

router.post("/", verifyBearerToken, async (req, res) => {
  try {
    if (!req.user.isCompany) {
      return res.status(401).json({
        code: 401,
        message: "You are not authorized to do this action",
      });
    }
    const job = await new Job({
      companyId: req.user.id,
      ...req.body,
    });
    await job.save();
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/", verifyBearerToken, async (req, res) => {
  try {
    if (!req.user.isCompany) {
      return res.status(401).json({
        code: 401,
        message: "You are not authorized to do this action",
      });
    }
    const jobs = await Job.find({ companyId: req.user.id });
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", verifyBearerToken, async (req, res) => {
  try {
    if (!req.user.isCompany) {
      return res.status(401).json({
        code: 401,
        message: "You are not authorized to do this action",
      });
    }
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        code: 404,
        message: "Job not found",
      });
    }
    if (job.companyId !== req.user.id) {
      return res.status(401).json({
        code: 401,
        message: "You are not authorized to do this action",
      });
    }
    await Job.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      code: 200,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/:id/publish", verifyBearerToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        code: 404,
        message: "Job not found",
      });
    }
    if (job.companyId !== req.user.id) {
      return res.status(401).json({
        code: 401,
        message: "You are not authorized to do this action",
      });
    }
    await job.updateOne({
      $set: {
        isActive: true,
        hiddenSalary: req.body.hiddenSalary || false,
      },
    });

    return res.status(200).json("Successfully published");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/joball", async (req, res) => {
  const job = await Job.deleteMany();
  return res.status(200).json("Success deleted");
});

module.exports = router;

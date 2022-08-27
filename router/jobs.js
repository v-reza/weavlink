const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Job = require("../models/Job");
const Applicant = require("../models/Applicants");
const mongoose = require("mongoose");

router.post("/", verifyBearerToken, async (req, res) => {
  try {
    const job = await new Job({
      companyId: req.body.companyId,
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
    const jobs = await Job.find({ companyId: req.user.users._id });
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
    if (job.companyId !== req.user.users._id) {
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
    if (job.companyId !== req.user.users._id) {
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

    const jobAfterUpdate = await Job.findById(req.params.id);

    return res.status(200).json(jobAfterUpdate);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/:id/draft", verifyBearerToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        code: 404,
        message: "Job not found",
      });
    }
    if (job.companyId !== req.user.users._id) {
      return res.status(401).json({
        code: 401,
        message: "You are not authorized to do this action",
      });
    }
    await job.updateOne({
      $set: {
        isActive: false,
      },
    });
    const jobAfterUpdate = await Job.findById(req.params.id);
    return res.status(200).json(jobAfterUpdate);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/listjobs", async (req, res) => {
  try {
    const jobs = await Job.aggregate([
      {
        $addFields: {
          companyId: { $toObjectId: "$companyId" },
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $unset: ["company.password"],
      },
      {
        $match: {
          isActive: true,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/detailjob/:id", async (req, res) => {
  try {
    const jobs = await Job.aggregate([
      {
        $addFields: {
          companyId: { $toObjectId: "$companyId" },
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $unset: ["company.password"],
      },
      {
        $lookup: {
          from: "applicants",
          localField: "jobApplications",
          foreignField: "_id",
          as: "applicants",
        },
      },
      // {
      //   $unwind: {
      //     path: "$applicants",
      //     preserveNullAndEmptyArrays: true,
      //   }
      // },
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },
    ]);
    return res.status(200).json(jobs[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/checkMyJob/:id", async (req, res) => {
  try {
    const jobs = await Job.aggregate([
      {
        $addFields: {
          companyId: { $toObjectId: "$companyId" },
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $unset: ["company.password"],
      },
      {
        $lookup: {
          from: "applicants",
          localField: "jobApplications",
          foreignField: "_id",
          as: "applicants",
        },
      },
      // {
      //   $unwind: {
      //     path: "$applicants",
      //     preserveNullAndEmptyArrays: true,
      //   }
      // },
      {
        $match: {
          companyId: mongoose.Types.ObjectId(req.params.id),
        },
      },
    ]);
    return res.status(200).json(jobs[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/jobApply", verifyBearerToken, async (req, res) => {
  try {
    const { jobId } = req.body;
    const applicant = await Applicant.findOne({
      jobId: jobId,
      userId: req.user.users._id,
    });
    if (applicant) {
      return res.status(400).json({
        code: 400,
        message: "You have already applied for this job",
      });
    }
    const newApplicant = await Applicant.create({
      jobId: jobId,
      userId: req.user.users._id,
      ...req.body,
    });

    const job = await Job.findById(jobId);
    await job.updateOne({
      $push: {
        jobApplications: newApplicant._id,
      },
    });
    return res.status(200).json("Success Applied");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

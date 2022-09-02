const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comments");
const ReplyComment = require("../models/ReplyComments");
const mongoose = require("mongoose");
const verifyBearerToken = require("../helper/verifyBearerToken");

router.get("/:commentId/reply", async (req, res) => {
  try {
    const limits = parseInt(req.query.limit) || 5;

    const comment = await Comment.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.commentId),
        },
      },
      {
        $lookup: {
          from: "replycomments",
          localField: "reply",
          foreignField: "_id",
          as: "reply",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    result = comment;
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post(
  "/reply/comments/:commentId",
  verifyBearerToken,
  async (req, res) => {
    try {
      const replyComments = await new ReplyComment({
        userId: req.user.users._id,
        text: req.body.text,
      });
      await replyComments.save();

      const comment = await Comment.findById(req.params.commentId);
      await comment.updateOne({ $push: { reply: replyComments._id } });
      res.status(201).json("Success Reply Comment");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

/* Delete Reply Comments */
router.delete(
  "/:commentId/reply/:replyId",
  verifyBearerToken,
  async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      await comment.updateOne({ $pull: { reply: req.params.replyId } });
      await ReplyComment.deleteOne({
        _id: req.params.replyId,
        userId: req.user.users._id,
      });
      res.status(200).json("Success Delete Reply Comment");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

module.exports = router;

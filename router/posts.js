const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comments");
const mongoose = require("mongoose");
const verifyBearerToken = require("../helper/verifyBearerToken");
const ReplyComments = require("../models/ReplyComments");

/* Get Timeline */
router.get("/timeline", async (req, res) => {
  try {
    const limits = parseInt(req.query.limit) || 5;

    let result = [];

    const post = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "comments",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: limits,
      },
    ]);
    result = post;
    const postLength = await Post.find({}).countDocuments();

    res.status(200).json({
      result: result,
      length: postLength,
      hasMore: result.length === postLength ? false : true,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

/* New Post */
router.post("/newpost", verifyBearerToken, async (req, res) => {
  try {
    // const lastId = await Post.findOne({}, {}, { sort: { createdAt: -1 } });
    const post = new Post({
      userId: req.user.users._id,
      // lastId: lastId.lastId + 1,
      ...req.body,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

/* Delete Post */
router.delete("/delete/:id", verifyBearerToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.user.users._id,
    });
    post.comments.map(async (comment) => {
      await Comment.deleteOne({ _id: comment });
    });

    await post.deleteOne();
    res.status(200).json("Post Deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
});

/* Like Post */
router.put("/:id/like", verifyBearerToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.users._id)) {
      await post.updateOne({ $push: { likes: req.user.users._id } });
      return res.status(200).json({
        status: 200,
        message: "liked",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.user.users._id } });
      return res.status(200).json({
        status: 200,
        message: "unliked",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

/* Comment Post */
router.post("/:postId/comment", verifyBearerToken, async (req, res) => {
  try {
    const comment = await new Comment({
      userId: req.user.users._id,
      text: req.body.text,
    });
    await comment.save();

    // const lastComments = await Post.findOne({}, {}, { sort: { createdAt: -1 } });
    const post = await Post.findById(req.params.postId);
    await post.updateOne({ $push: { comments: comment._id } });
    await post.updateOne({ $inc: { commentsTotal: 1 } });
    res.status(201).json("Success Comment");
  } catch (error) {
    return res.status(500).json(error);
  }
});

/* Delete Comment Post */
router.delete(
  "/:postId/deleteComment/:commentId",
  verifyBearerToken,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      await post.updateOne({ $pull: { comments: req.params.commentId } });
      await post.updateOne({ $inc: { commentsTotal: -1 } });
      const comment = await Comment.findOne({
        _id: req.params.commentId,
        userId: req.user.users._id,
      });
      comment.reply.map(async (reply) => {
        await ReplyComments.deleteOne({ _id: reply });
      });
      await comment.deleteOne();
      // await Comment.deleteOne({
      //   _id: req.params.commentId,
      //   userId: req.user.users._id,
      // });
      res.status(200).json("Success Delete Comment");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

module.exports = router;

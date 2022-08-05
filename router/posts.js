const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comments");
const mongoose = require("mongoose");
const verifyBearerToken = require("../helper/verifyBearerToken");

/* Get Timeline */
router.get("/timeline", async (req, res) => {
  try {
    const post = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "comments",
        },
      },
    ]);
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

/* New Post */
router.post("/newpost", verifyBearerToken, async (req, res) => {
  try {
    const post = new Post({
      userId: req.user.id,
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
      userId: req.user.id,
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
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
    }
    res.status(200).json("Success Liked / Unliked");
  } catch (error) {
    return res.status(500).json(error);
  }
});

/* Comment Post */
router.post("/:postId/comment", verifyBearerToken, async (req, res) => {
  try {
    const comment = await new Comment({
      userId: req.user.id,
      text: req.body.text,
    });
    await comment.save();

    const post = await Post.findById(req.params.postId);
    await post.updateOne({ $push: { comments: comment._id } });
    res.status(201).json("Success Comment");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

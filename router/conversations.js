const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const Conversation = require("../models/Conversation");

/**
 * New Conversation
 */
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    if (!req.body.senderId || !req.body.receiverId) {
      return res.status(404).json("request error");
    }

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Get Conversation of user
 */
router.get("/", verifyBearerToken, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $in: [req.user.users._id],
      },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * get conversation includes to userId
 */
router.get("/find/:secondUserId", verifyBearerToken, async (req, res) => {
  try {
    const members = [req.user.userId, req.params.secondUserId];
    const reverseMembers = [req.params.secondUserId, req.user.userId];
    const conversation = await Conversation.findOne({
      $or: [{ members: members }, { members: reverseMembers }],
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;

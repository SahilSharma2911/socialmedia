const router = require("express").Router();
const Comment = require("../models/Comment")

//add
router.post("/", async (req, res) => {
    const newComment = new Comment(req.body);

    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get
router.get("/:conversationId", async (req, res) => {
    try {
      const comments = await Comment.find({
        conversationId: req.params.conversationId,
      });

      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
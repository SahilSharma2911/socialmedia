const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch {
        res.status(500).json(err);
    }
})

//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//like a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//comment a post
router.put("/:id/comment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Push the new comment into the comments array of the post
        await post.updateOne({ $push: { comments: req.body.userId } });

        res.status(200).json("The comment has been commented");
    } catch (err) {
        res.status(500).json(err);
    }
});


//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline post
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);

        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const userPosts = await Post.find({ userId: currentUser._id });

        const friendPosts = await Promise.all(
            currentUser.followings.map(async (friendId) => {
                try {
                    const posts = await Post.find({ userId: friendId });
                    return posts;
                } catch (err) {
                    console.error(`Error fetching posts for friend ${friendId}: ${err}`);
                    return [];
                }
            })
        );

        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
        console.error(`Server error: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//get users all post
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({userId : user._id});
        res.status(200).json(posts);
    } catch (err) {
        console.error(`Server error: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
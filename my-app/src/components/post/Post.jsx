import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { FiMoreVertical } from "react-icons/fi";
import axios from "axios";
import { format, render, cancel, register } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../comment/Comment";
// import { Users } from '../../dummyData'

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const [commentCount, setCommentCount] = useState(post.comments.length);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUsers();
  }, [post.userId]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const addComment = (newComment) => {
    post.comments.push(newComment);
    setCommentCount(post.comments.length);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <FiMoreVertical />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="img" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={toggleComments}>
              {post.comments.length} Comments
            </span>
          </div>
        </div>
        {showComments && <Comment postId={post._id} addComment={addComment} />}
      </div>
    </div>
  );
};

export default Post;

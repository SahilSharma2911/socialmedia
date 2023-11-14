import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillRightCircle } from "react-icons/ai";
import { format, render, cancel, register } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

import "./comment.css";

const Comment = ({ postId, addComment }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8800/api/comment/${postId}`
          );
          const sortedComments = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setComments(sortedComments);
        } catch (error) {
          console.error("Error:", error);
        }
      };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    const fetchUser = async (comment) => {
      try {
        const response = await axios.get(`http://localhost:8800/api/users`, {
          params: { username: comment.sender },
        });

        setUsers((prevUsers) => ({
          ...prevUsers,
          [comment.sender]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (comments.length > 0) {
      comments.forEach((comment) => {
        fetchUser(comment);
      });
    }
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/api/comment", {
        conversationId: postId,
        sender: user.username,
        text: commentText,
      });

      setComments([...comments, response.data]);
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }

    try {
      axios.put("/posts/" + postId + "/comment", { userId: user._id });
    } catch (err) {}

    addComment();
  };

  return (
    <div className="commentSec">
      <div className="inputBar">
        <input
          type="text"
          placeholder="Add a comment"
          className="inputBarText"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <AiFillRightCircle className="inputBarIcon" onClick={handleSubmit} />
      </div>
      <div className="details">
        {comments.map((comment) => (
          <div key={comment._id} className="userDetails">
            <div>
              {users[comment.sender] && (
                <div className="userDetailItem">
                  <img
                    src={
                      users[comment.sender].profilePicture
                        ? PF + users[comment.sender].profilePicture
                        : PF + "/person/noAvatar.png"
                    }
                    alt=""
                    className="postProfileImg2"
                  />
                  <span className="userDetailItemText">
                    {users[comment.sender].username} :
                    <span className="userDetailItemTextComment">
                      {comment.text}
                    </span>
                  </span>
                </div>
              )}
            </div>
            <div>
              <span className="commenTime">{format(comment.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;

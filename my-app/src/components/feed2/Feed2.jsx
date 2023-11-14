import React, { useEffect, useState } from 'react'
import "./feed.css"
import Share from '../share/Share'
import Post from '../post/Post'
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Topbar from '../topbar/Topbar';

const Feed2 = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
      const source = axios.CancelToken.source();
  
      const fetchPosts = async () => {
        const res = username ? await axios.get("/posts/profile/" + username) : await axios.get("/posts/timeline/" + user._id);
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      };
  
      fetchPosts();
    }, [username, user._id]);
  
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <div className='feed'>
        {/* {windowWidth < 850 && <Topbar />} */}
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share />}
          {posts.map(p => (
            <Post key={p._id} post={p} />
          ))}
  
        </div>
      </div>
    )
}

export default Feed2

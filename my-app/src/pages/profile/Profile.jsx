import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useParams } from "react-router";
import Feed2 from "../../components/feed2/Feed2";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  const username = useParams().username;

  const [showTopbarInFeed, setShowTopbarInFeed] = useState(false); 

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };

    fetchUsers();
  }, [username]);

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
    <>
      {windowWidth > 850 && <Topbar />}
      <div className="profile">
        {windowWidth > 900 && <Sidebar />}
        <div className="profileRight">
          {windowWidth < 850 && <Topbar />}
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
            {windowWidth < 900 && <Rightbar user={user} />}
          </div>
          <div className="profileRightBottom">
            <Feed2 username={username}/>
            {windowWidth >= 900 && <Rightbar user={user} />}
          </div>
        </div>
      </div>
    </>
  );
}

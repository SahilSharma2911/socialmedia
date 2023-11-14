import React, { useContext, useState, useEffect } from "react";
import "./topbar.css";
import axios from "axios";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { BsFillPersonFill, BsFillChatFill } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SideMenu from "../sidemenu/Sidebar";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { dispatch } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/users/all");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  const handleLogout = () => {
    // Dispatch an action to clear the user state
    dispatch({ type: "LOGOUT" });

    // Remove the "user" item from local storage
    localStorage.removeItem("user");

    // Reload the page
    window.location.reload();
  };

  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  return (
    <>
      <div className={`topbarContainer`}>
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">ST Social</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <AiOutlineSearch className="searchIcon" />
            <input
              placeholder="Search for friends"
              type="text"
              className="searchInput"
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="userPopup">
              {query &&
                filteredUsers.map((user) => (
                  <div key={user._id} className="userPopupItem">
                    <Link to={`/profile/${user.username}`}>
                      <div className="flex">
                      <div><img
                        src={
                          user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "/person/noAvatar.png"
                        }
                        alt=""
                        className="postProfileImg"
                      /></div>
                      <div className="items-center"> <span className="postUsername items-center">{user.username}</span></div>
                      </div>
                      


                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <BsFillPersonFill />
              <span className="topbarIconBadge">0</span>
            </div>
            <Link to="/messenger">
              <div className="topbarIconItem">
                <BsFillChatFill style={{ color: "white" }} />
                <span className="topbarIconBadge">0</span>
              </div>
            </Link>
            <div className="topbarIconItem">
              <IoMdNotifications />
              <span className="topbarIconBadge">0</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
          <FiLogOut onClick={handleLogout} style={{ cursor: "pointer" }} />
        </div>
        <div className="topbarEnd">
          <HiMenu onClick={toggleSideMenu} />
        </div>
      </div>
      <SideMenu show={showSideMenu} handleLogout={handleLogout} />

    </>
  );
};

export default Topbar;

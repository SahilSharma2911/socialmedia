import React, { useContext, useState, useEffect } from "react";
import "./sidebar.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { BsFillPersonFill, BsFillChatFill } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;


const SideMenu = ({ show, handleLogout }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className={`sideMenu ${show ? "show" : ""}`}>
            <div className="sideMenuContent">
                <div className="">
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
                </div>
                <div className="topbarIconItem">
                    <BsFillPersonFill style={{ color: "white" }} />
                    <span className="topbarIconBadge">0</span>
                </div>
                <Link to="/messenger">
                    <div className="topbarIconItem">
                        <BsFillChatFill style={{ color: "white" }} />
                        <span className="topbarIconBadge">0</span>
                    </div>
                </Link>
                <div className="topbarIconItem">
                    <IoMdNotifications style={{ color: "white" }} />
                    <span className="topbarIconBadge">0</span>
                </div>
                <div className=""><FiLogOut onClick={handleLogout} /></div>
                

            </div>
        </div>
    );
};

export default SideMenu;

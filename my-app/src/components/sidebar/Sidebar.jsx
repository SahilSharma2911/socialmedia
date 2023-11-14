import React from 'react'
import "./sidebar.css"
import { MdRssFeed } from "react-icons/md"
import { BsFillChatSquareDotsFill, BsFillBookmarkFill, BsFillBagFill } from "react-icons/bs"
import { AiFillPlayCircle, AiFillQuestionCircle, AiFillCalendar } from "react-icons/ai"
import { HiUserGroup } from "react-icons/hi"
import { SiMicrosoftacademic } from "react-icons/si"
import { Users } from "../../dummyData"
import CloseFriend from '../closeFriend/CloseFriend'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <MdRssFeed className="sidebarIcon" />
                        <span className='sidebarListItemText'>Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsFillChatSquareDotsFill className="sidebarIcon" />
                        <span className='sidebarListItemText'>Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <AiFillPlayCircle className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <HiUserGroup className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsFillBookmarkFill className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <AiFillQuestionCircle className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsFillBagFill className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <AiFillCalendar className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <SiMicrosoftacademic className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                   
                </ul>
            </div>
        </div>
    )
}

export default Sidebar

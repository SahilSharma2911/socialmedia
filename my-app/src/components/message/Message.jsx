import React, { useContext, useEffect, useRef, useState } from 'react'
import "./message.css"
import { format } from "timeago.js"
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";

export default function Message({ message, own, conversation }) {
    const { user } = useContext(AuthContext);
    const [fuser, setFUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== user._id);

        const getUser = async () => {
            try {
                const res = await axios("/users?userId=" + friendId);
                setFUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [user, conversation]);

    const imgSrc = own ? (user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png") : (fuser?.profilePicture ? PF + fuser.profilePicture : PF + "person/noAvatar.png");

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg'  src={imgSrc} alt="" />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageBottom">{format(message?.createdAt)}</div>
        </div>
    )
}

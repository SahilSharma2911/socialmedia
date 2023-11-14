import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./rightbar.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Users } from '../../dummyData'
import Online from "../online/Online"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";




const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([]);

  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(false);
  // console.log(currentUser?.followings)
  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?._id))
  },[currentUser,user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();

  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className='birthdayImg' />
          <span className='birthdayText'>
            <b>Aman</b> and <b>3 others friends</b> have a birthday today
          </span>
        </div>
        <img src="assets/ad.png" alt="" className='rightbarAd' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
      <div className="followbtn">
      {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </button>
        )}
      </div>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            {friends?.map((friend) => (
              <Link
                key={friend?._id} // Add this line to provide a unique key
                to={"/profile/" + friend?.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowingUser">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}

      </div>

    </div>
  )
}

export default Rightbar

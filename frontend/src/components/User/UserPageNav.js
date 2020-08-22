import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/userPage/userPageNav.css';
import { AuthContext } from '../../providers/AuthContext';

const UserPageNav = ({ userId }) => {

    const { currentUser } = useContext(AuthContext);

    const displayFriendRequests = () => {
        if(currentUser.id === userId) {
            return (
                <NavLink exact to={`/user/${userId}/friendRequests`}>
                    Friend Requests
                </NavLink>
            )
        } else {
            return null;
        }
    }

    return (
        <nav className="up-nav">
            <NavLink exact to={`/user/${userId}`}>Trips</NavLink>
            <NavLink exact to={`/user/${userId}/about`}>About</NavLink>
            <NavLink exact to={`/user/${userId}/friends`}>Friends</NavLink>
            {displayFriendRequests()}
        </nav>
    )
}

export default UserPageNav;
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import '../../css/userPage/userPageNav.css';

const UserPageNav = ({ userId }) => {

    const { currentUser } = useContext(AuthContext);

    const displayFriendRequests = () => {
        if(currentUser.id === userId) {
            return (
                <NavLink exact to={`/user/${userId}/friendRequests`}>
                    REQUESTS
                </NavLink>
            )
        } else {
            return null;
        }
    }

    return (
        <nav className="up-nav">
            <NavLink exact to={`/user/${userId}`}>TRIPS</NavLink>
            <NavLink exact to={`/user/${userId}/friends`}>FRIENDS</NavLink>
            <NavLink exact to={`/user/${userId}/about`}>ABOUT</NavLink>
            {displayFriendRequests()}
        </nav>
    )
}

export default UserPageNav;
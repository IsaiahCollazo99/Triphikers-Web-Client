import React from 'react';
import { NavLink } from 'react-router-dom';

const UserPageNav = ( userId ) => {
    return (
        <nav className="up-nav">
            <NavLink exact to={`/user/${userId}/trips`}>Trips</NavLink>
            <NavLink exact to={`/user/${userId}/about`}>About</NavLink>
        </nav>
    )
}

export default UserPageNav;
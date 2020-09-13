import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/detailedTripPage/detailedTripNav.css';

const DetailedTripNav = ({ trip = {} }) => {
    
    return (
        <nav className="dt-nav">
            <NavLink exact to={`/trips/${trip.id}`}>TRAVELERS</NavLink>
            <NavLink exact to={`/trips/${trip.id}/requests`}>REQUESTS</NavLink>
        </nav>
    )
}

export default DetailedTripNav;
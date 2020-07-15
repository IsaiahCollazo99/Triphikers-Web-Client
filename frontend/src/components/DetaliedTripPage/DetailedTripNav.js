import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/detailedTripPage/detailedTripNav.css';

const DetailedTripNav = ({ trip = {} }) => {
    const displayRequests = () => {
        // When Sign In is working
        // Check If the current user is the trip planner
        // return the requests Nav Link if they are
        // If not return null
    }
    
    return (
        <nav className="dt-nav">
            <NavLink exact to={`/trips/${trip.id}`}>Trip</NavLink>
            <NavLink exact to={`/trips/${trip.id}/travelers`}>Travelers</NavLink>
            <NavLink exact to={`/trips/${trip.id}/requests`}>Requests</NavLink>
        </nav>
    )
}

export default DetailedTripNav;
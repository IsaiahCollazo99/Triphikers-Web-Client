import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/detailedTripPage/detailedTripNav.css';
import { AuthContext } from '../../providers/AuthContext';

const DetailedTripNav = ({ trip = {} }) => {
    const { currentUser } = useContext(AuthContext);

    const displayRequests = () => {
        if(currentUser.id === trip.planner_id) {
            return <NavLink exact to={`/trips/${trip.id}/requests`}>Requests</NavLink>
        } else {
            return null;
        }
    }
    
    return (
        <nav className="dt-nav">
            <NavLink exact to={`/trips/${trip.id}`}>Trip</NavLink>
            <NavLink exact to={`/trips/${trip.id}/travelers`}>Travelers</NavLink>
            {displayRequests()}
        </nav>
    )
}

export default DetailedTripNav;
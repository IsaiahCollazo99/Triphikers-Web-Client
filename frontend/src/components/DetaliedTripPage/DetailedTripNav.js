import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import '../../css/detailedTripPage/detailedTripNav.css';

const DetailedTripNav = ({ trip = {} }) => {
    const { currentUser } = useContext(AuthContext);

    const displayRequests = () => {
        if(currentUser.id === trip.planner_id) {
            return <NavLink exact to={`/trips/${trip.id}/requests`}>REQUESTS</NavLink>
        } else {
            return null;
        }
    }
    
    return (
        <nav className="dt-nav">
            <NavLink exact to={`/trips/${trip.id}`}>TRIP</NavLink>
            <NavLink exact to={`/trips/${trip.id}/travelers`}>TRAVELERS</NavLink>
            {displayRequests()}
        </nav>
    )
}

export default DetailedTripNav;
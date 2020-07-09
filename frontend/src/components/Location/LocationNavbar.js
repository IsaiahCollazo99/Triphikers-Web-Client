import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/locations/LocationNavbar.css";

const LocationNavbar = ({id}) => {

    return(
        <nav className="locationNavbarContainer">
            <NavLink className="Links" to={`/location/${id}/hotspots`}>Hotspots</NavLink>
            <NavLink className="Links" to={`/location/${id}/attractions`}>Attractions</NavLink>
            <NavLink className="Links" to={`/location/${id}/reviews`}>Reviews</NavLink>
        </nav>
    )
}

export default LocationNavbar;
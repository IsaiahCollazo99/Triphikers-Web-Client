import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/locations/LocationNavbar.css";

const LocationNavbar = ({info}) => {

    return(
        <nav className="locationNavbarContainer">
            <NavLink className="Links" to={`/location/${info.country}/${info.city}/hotspots`}>Hotspots</NavLink>
            <NavLink className="Links" to={`/location/${info.country}/${info.city}/attractions`}>Attractions</NavLink>
            <NavLink className="Links" to={`/location/${info.country}/${info.city}/reviews`}>Reviews</NavLink>
        </nav>
    )
}

export default LocationNavbar;
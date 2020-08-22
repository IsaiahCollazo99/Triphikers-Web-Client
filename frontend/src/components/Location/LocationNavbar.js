import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/locations/LocationNavbar.css";

const LocationNavbar = ({ city, country }) => {

    return(
        <nav className="locationNavbarContainer">
            <NavLink className="Links" to={`/location/${country}/${city}/hotspots`}>Hotspots</NavLink>
            <NavLink className="Links" to={`/location/${country}/${city}/attractions`}>Attractions</NavLink>
            <NavLink className="Links" to={`/location/${country}/${city}/reviews`}>Reviews</NavLink>
        </nav>
    )
}

export default LocationNavbar;
import React from "react";
import { NavLink } from "react-router-dom";

const LocationNavbar = () => {

    return(
        <nav className="locationNavbarContainer">
            <NavLink className="Links" to={"/location/hotspots"}>Hotspots</NavLink>
            <NavLink className="Links" to={"/location/attractions"}>Attractions</NavLink>
            <NavLink className="Links" to={"/location/reviews"}>Reviews</NavLink>
        </nav>
    )
}

export default LocationNavbar;
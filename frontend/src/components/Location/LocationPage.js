import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import LocationAttractions from "./LocationAttractions";
import LocationNavbar from "./LocationNavbar";
import LocationHotspots from "./LocationHotspots";
import LocationInfo from "./LocationInfo";
import "../../css/locations/LocationPage.css";


const LocationPage = () => {
    const location = useLocation();
    let info = location.state;
    const [city, setCity] = useState([]);
    const [coord, setCoord] = useState([]);
    const [country, setCountry] = useState([]);

    useEffect(() => {
        if(info !== null) {
            setCity(info.city);
            setCoord(info.coordinates);
            setCountry(info.country);
        }
    }, [info])

    return(
        <div className="locationContainer">
            <div className="locationLeftSide">
                <LocationInfo city={city} coord={coord} country={country}/>
            </div>
            {/* <div className="locationNavbar">
                <LocationNavbar city={city} country={country}/>
                <Switch>
                    <Route exact path={`/location/${country}/${city}/hotspots`}>
                        <LocationHotspots city={city} coord={coord} country={country}/>
                    </Route>
                    <Route exact path={`/location/${country}/${city}/attractions`}>
                        <LocationAttractions city={city} coord={coord} country={country}/>
                    </Route>
                </Switch>
            </div> */}
        </div>
    )
}

export default LocationPage;
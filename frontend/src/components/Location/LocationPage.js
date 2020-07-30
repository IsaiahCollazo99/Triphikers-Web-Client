import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// import axios from "axios";
import LocationAttractions from "./LocationAttractions";
import LocationNavbar from "./LocationNavbar";
import LocationHotspots from "./LocationHotspots";
import LocationReviews from "./LocationReviews";
import LocationInfo from "./LocationInfo";


const LocationPage = () => {
    const location = useLocation();
    let info = location.state;
    const [city, setCity] = useState([]);
    const [coord, setCoord] = useState([]);
    const [country, setCountry] = useState([]);

    useEffect(() => {
        setCity(info.city);
        setCoord(info.coordinates);
        setCountry(info.country);
    }, [info])

    return(
        <div className="container">
            <LocationInfo city={city} coord={coord} country={country}/>
            <div className="locationNavbar">
                <LocationNavbar city={city} country={country}/>
                <Switch>
                    <Route exact path={`/location/${country}/${city}/hotspots`}>
                        <LocationHotspots city={city} coord={coord} country={country}/>
                    </Route>
                    <Route exact path={`/location/${country}/${city}/attractions`}>
                        <LocationAttractions info={info}/>
                    </Route>
                    <Route exact path={`/location/${country}/${city}/reviews`}>
                        <LocationReviews info={info}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default LocationPage;
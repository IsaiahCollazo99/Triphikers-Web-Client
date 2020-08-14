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
    debugger
    console.log(info)
    const [city, setCity] = useState([]);
    const [cityTitle, setCityTitle] = useState([]);
    const [coord, setCoord] = useState([]);
    const [country, setCountry] = useState([]);

    const getCityTitle = (str) => {
        let title = str.split(",")[0];
        setCityTitle(title);
    }

    useEffect(() => {
        if(info !== null) {
            getCityTitle(info.city);
            setCity(info.city);
            setCoord(info.coordinates);
            setCountry(info.country);
        }
        //all gets reset when switching the navbar
    }, [info])

    return(
        <div className="container">
            <LocationInfo city={city} coord={coord} country={country} title={cityTitle}/>
            <div className="locationNavbar">
                <LocationNavbar city={city} country={country}/>
                <Switch>
                    <Route exact path={`/location/${country}/${city}/hotspots`}>
                        <LocationHotspots city={city} coord={coord} country={country}/>
                    </Route>
                    <Route exact path={`/location/${country}/${city}/attractions`}>
                        <LocationAttractions city={city} coord={coord} country={country}/>
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
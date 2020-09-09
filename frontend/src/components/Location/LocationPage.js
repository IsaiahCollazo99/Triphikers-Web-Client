import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import LocationAttractions from "./LocationAttractions";
import LocationNavbar from "./LocationNavbar";
import LocationHotspots from "./LocationHotspots";
import LocationInfo from "./LocationInfo";
import "../../css/locations/LocationPage.css";
import { createClient } from 'pexels';

const LocationPage = () => {
    const location = useLocation();
    let info = location.state;
    const [city, setCity] = useState([]);
    const [coord, setCoord] = useState([]);
    const [country, setCountry] = useState([]);
    const [imageRef, setImageRef] = useState([]);
    const client = createClient(`563492ad6f9170000100000153f28b06267f4b548fc99fbb457455db`);

    let sectionStyle = {
        backgroundImage: `url(${ imageRef })`
      };

    const getPhoto = (city) => {
        const query = `${city} skyline`;
        client.photos.search({ query, per_page: 1 }).then(photos => setImageRef(photos.photos[0].src.landscape));
        }

    useEffect(() => {
        if(info !== null) {
            setCity(info.city);
            setCoord(info.coordinates);
            setCountry(info.country);
            getPhoto(info.city);
        }
    }, [info])

    return(
        <div className="locationContainer" style={sectionStyle}>
            <div className="locationLeftSide">
                <LocationInfo city={city} coord={coord} country={country}/>
            </div>
            <div className="locationRightSide">
                <Route exact path={`/location/${country}/${city}/hotspots`}>
                    <LocationHotspots city={city} coord={coord} country={country}/>
                </Route>
            </div>
            {/* <div className="locationNavbar">
                <LocationNavbar city={city} country={country}/>
                <Switch>
                    <Route exact path={`/location/${country}/${city}/attractions`}>
                        <LocationAttractions city={city} coord={coord} country={country}/>
                    </Route>
                </Switch>
            </div> */}
        </div>
    )
}

export default LocationPage;
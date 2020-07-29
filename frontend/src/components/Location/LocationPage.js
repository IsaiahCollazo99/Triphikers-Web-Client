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
    // const [locationInfo, setLocationInfo] = useState([]);
    
    // const fetchLocationData = async (id) => {
    //     try {
    //         let res = await axios.get(`http://localhost:3001/api/locations/${id}`)
    //         setLocationInfo(res.data.location)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchLocationData();
    // }, [])

    return(
        <div className="container">
            <LocationInfo info={info}/>
            <div className="locationNavbar">
                <LocationNavbar info={info}/>
                <Switch>
                    <Route exact path={`/location/:country/:city/hotspots`}>
                        <LocationHotspots info={info}/>
                    </Route>
                    <Route exact path={`/location/:country/:city/attractions`}>
                        <LocationAttractions info={info}/>
                    </Route>
                    <Route exact path={`/location/:country/:city/reviews`}>
                        <LocationReviews info={info}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default LocationPage;
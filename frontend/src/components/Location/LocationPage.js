import React, { useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import axios from "axios";
import LocationAttractions from "./LocationAttractions";
import LocationNavbar from "./LocationNavbar";
import LocationHotspots from "./LocationHotspots";
import LocationReviews from "./LocationReviews";
import LocationInfo from "./LocationInfo";

const LocationPage = () => {
    const { locationId } = useParams();
    const [locationInfo, setLocationInfo] = useState([]);
    
    const fetchLocationData = async (id) => {
        try {
            let res = await axios.get(`http://localhost:3001/api/locations/${id}`)
            setLocationInfo(res.data.location)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLocationData(locationId);
    }, [])

    return(
        <div className="container">
            <LocationInfo info={locationInfo}/>
            {/* <div className="locationNavbar">
                <LocationNavbar/>
                <Switch>
                    <Route exact path={"/location/:id/hotspots"} component={LocationHotspots}/>
                    <Route exact path={"/location/:id/attractions"} component={LocationAttractions}/>
                    <Route exact path={"/location/:id/reviews"} component={LocationReviews}/>
                </Switch>
            </div> */}
        </div>
    )
}

export default LocationPage;
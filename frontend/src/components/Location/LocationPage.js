import React from "react";
import LocationAttractions from "./LocationAttractions";
import LocationNavbar from "./LocationNavbar";
import LocationHotspots from "./LocationHotspots";
import LocationReviews from "./LocationReviews";
import { Route, Switch } from "react-router-dom";

const LocationPage = () => {
    return(
        <div className="container">
        Locations Page
            <div className="locationNavbar">
                <LocationNavbar/>
                <Switch>
                    <Route exact path={"/location/hotspots"} component={LocationHotspots}/>
                    <Route exact path={"/location/attractions"} component={LocationAttractions}/>
                    <Route exact path={"/location/reviews"} component={LocationReviews}/>
                </Switch>
            </div>
            
        </div>
    )
}

export default LocationPage;
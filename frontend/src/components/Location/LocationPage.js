import React from "react";
import LocationAttractions from "./LocationAttractions";
import LocationNavbar from "./LocationNavbar";
import LocationHotspots from "./LocationHotspots";
import LocationReviews from "./LocationReviews";
import { Route, Switch, useParams } from "react-router-dom";
import LocationInfo from "./LocationInfo";

const LocationPage = () => {
    const { locationId } = useParams();
    debugger
    return(
        <div className="container">
            Locations Page
            {/* <LocationInfo id={locationId}/> */}
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
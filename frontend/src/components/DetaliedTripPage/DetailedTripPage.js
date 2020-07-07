import React, { useEffect, useState } from 'react';
import { useParams, Route, Switch } from 'react-router-dom';
import { getTripById } from '../../util/apiCalls/getRequests';
import DetailedTripNav from './DetailedTripNav';
import DetailedTripInfo from './DetailedTripInfo';
import DetailedTripRequests from './DetailedTripRequests';
import DetailedTripTravelers from './DetailedTripTravelers';

const DetailedTripPage = () => {
    const { id } = useParams();
    const [ trip, setTrip ] = useState({});

    const getTripCall = async () => {
        try {
            const tripById = await getTripById(id);
            setTrip(tripById.trip);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getTripCall();
    }, [])

    return (
        <div className="detailedTripContainer">
            <header></header>
            <DetailedTripNav trip={trip}/>
            <Switch>
                <Route exact path={"/trips/:tripId/"}>
                    <DetailedTripInfo />
                </Route>

                <Route exact path={"/trips/:tripId/requests"}>
                    <DetailedTripRequests />
                </Route>

                <Route exact path={"/trips/:tripId/travelers"}>
                    <DetailedTripTravelers />
                </Route>
            </Switch>
        </div>
    )
}

export default DetailedTripPage;
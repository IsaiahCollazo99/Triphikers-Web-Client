import React, { useEffect, useState } from 'react';
import { useParams, Route, Switch } from 'react-router-dom';
import { getTripById } from '../../util/apiCalls/getRequests';
import DetailedTripNav from './DetailedTripNav';
import DetailedTripInfo from './DetailedTripInfo';
import DetailedTripRequests from './DetailedTripRequests';
import DetailedTripTravelers from './DetailedTripTravelers';
import '../../css/detailedTripPage/detailedTripPage.css';

const DetailedTripPage = () => {
    const { id } = useParams();
    const [ trip, setTrip ] = useState({});

    const getTripCall = async () => {
        try {
            const data = await getTripById(id);
            setTrip(data.trip);
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
                    <DetailedTripInfo trip={trip} />
                </Route>

                <Route exact path={"/trips/:tripId/requests"}>
                    <DetailedTripRequests trip={trip} />
                </Route>

                <Route exact path={"/trips/:tripId/travelers"}>
                    <DetailedTripTravelers trip={trip} />
                </Route>
            </Switch>
        </div>
    )
}

export default DetailedTripPage;
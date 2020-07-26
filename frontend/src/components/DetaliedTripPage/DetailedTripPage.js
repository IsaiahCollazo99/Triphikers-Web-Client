import React, { useEffect, useState, useContext } from 'react';
import { useParams, Route, Switch } from 'react-router-dom';
import { getTripById, getTripRequests } from '../../util/apiCalls/getRequests';
import DetailedTripNav from './DetailedTripNav';
import DetailedTripInfo from './DetailedTripInfo';
import DetailedTripRequests from './DetailedTripRequests';
import DetailedTripTravelers from './DetailedTripTravelers';
import '../../css/detailedTripPage/detailedTripPage.css';
import { AuthContext } from '../../providers/AuthContext';
import { ProtectedUserRoute } from '../../util/routesUtil';

const DetailedTripPage = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [ trip, setTrip ] = useState({});
    const [ requests, setRequests ] = useState([]);

    const getTripCall = async () => {
        try {
            const data = await getTripById(id);
            setTrip(data.trip);
        } catch (error) {
            console.log(error);
        }
    }

    const getRequestsCall = async () => {
        const data = await getTripRequests(trip.id)
        if(data.requests) {
            setRequests(data.requests);
        } else {
            setRequests([]);
        }
    }

    const refreshFuncs = {
        getRequestsCall,
        getTripCall
    }

    useEffect(() => {
        getTripCall();
    }, [])

    return (
        <div className="detailedTripContainer">
            <header className="dt-header">
                <section className="dt-user">
                    <img src={trip.profile_picture} alt={trip.full_name} />
                    <div className="dt-userInteraction">
                        {/* The user's rating goes in the span */}
                        <p>{trip.full_name}<span></span></p> 
                        <section>
                            {/* Social Media Here */}
                        </section>

                    </div>
                </section>

                <section className="dt-userInfo">
                    <p><span>Age: </span>{trip.age}</p>
                    <p><span>Country of Origin: </span>{trip.country_of_origin}</p>
                    <p><span>Gender: </span>{trip.gender}</p>
                </section>

                <section className="dt-bio">
                    <span>Bio: </span>
                    <p>{trip.bio}</p>
                </section>
            </header>
            <DetailedTripNav trip={trip}/>
            <Switch>
                <Route exact path={"/trips/:tripId/"}>
                    <DetailedTripInfo trip={trip} {...refreshFuncs} requests={requests}/>
                </Route>

                
                <ProtectedUserRoute exact path={"/trips/:tripId/requests"} trip={trip}>
                    <DetailedTripRequests trip={trip} requests={requests} />
                </ProtectedUserRoute>

                <Route exact path={"/trips/:tripId/travelers"}>
                    <DetailedTripTravelers trip={trip} />
                </Route>
            </Switch>
        </div>
    )
}

export default DetailedTripPage;
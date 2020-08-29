import React, { useEffect, useState } from 'react';
import { useParams, Route, Switch, Link } from 'react-router-dom';
import { getTripById, getTripRequests, getTripTravelers } from '../../util/apiCalls/getRequests';
import DetailedTripNav from './DetailedTripNav';
import DetailedTripInfo from './DetailedTripInfo';
import DetailedTripRequests from './DetailedTripRequests';
import DetailedTripTravelers from './DetailedTripTravelers';
import '../../css/detailedTripPage/detailedTripPage.css';
import { ProtectedUserRoute } from '../../util/routesUtil';

const DetailedTripPage = () => {
    const { id } = useParams();
    const [ trip, setTrip ] = useState({});
    const [ requests, setRequests ] = useState([]);
    const [ travelers, setTravelers ] = useState([]);

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

    const getTravelersCall = async () => {
        const data = await getTripTravelers(trip.id);
        if(data.travelers) {
            setTravelers(data.travelers);
        } else {
            setTravelers([]);
        }
    }

    const refreshFuncs = {
        getRequestsCall,
        getTravelersCall,
        getTripCall
    }

    useEffect(() => {
        getTripCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(trip.full_name) {
        return (
            <div className="detailedTripContainer">
                <header className="dt-header">
                    <section className="dt-user">
                        <img src={trip.profile_picture} alt={trip.full_name} />
                        <div className="dt-userInteraction">
                            <Link to={`/user/${trip.planner_id}`}>{trip.full_name}<span></span></Link> 
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
                        <DetailedTripInfo trip={trip} {...refreshFuncs} requests={requests} travelers={travelers}/>
                    </Route>
    
                    <Route exact path={"/trips/:tripId/travelers"}>
                        <DetailedTripTravelers trip={trip} travelers={travelers}/>
                    </Route>
                    
                    <ProtectedUserRoute exact path={"/trips/:tripId/requests"} trip={trip}>
                        <DetailedTripRequests trip={trip} />
                    </ProtectedUserRoute>
    
                </Switch>
            </div>
        )
    } else {
        return (
            <p className="error">No Trip Found</p>
        )
    }
    
}

export default DetailedTripPage;
import React, { useState, useContext, useEffect } from 'react';
import '../../css/detailedTripPage/detailedTripInfo.css';
import { deleteTrip, deleteTripRequest } from '../../util/apiCalls/deleteRequests';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import { createTripRequest } from '../../util/apiCalls/postRequests';
import { getTripRequests, getTripTravelers } from '../../util/apiCalls/getRequests';
import { Button } from '@material-ui/core';

const DetailedTripInfo = ({ trip = {}, getTripCall }) => {
    const [ response, setResponse ] = useState(null)
    const [ requests, setRequests ] = useState([]);
    const [ travelers, setTravelers ] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();

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

    useEffect(() => {
        getTravelersCall();
        getRequestsCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteTripCall = async () => {
        await deleteTrip(trip.id);
        history.push("/trips");
    }

    const deleteReqCall = async () => {
        try {
            await deleteTripRequest(trip.id, currentUser.id);
            getRequestsCall();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with your delete request.</p>)
            console.log(error);
        }
    }

    const requestCall = async () => {
        try {
            await createTripRequest(trip.id, currentUser.id)
            getRequestsCall();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with your request to join.</p>)
            console.log(error);
        }
    }

    const isUserRequestExisting = () => {
        let userRequestExisting = false;
        for(let request of requests) {
            if(request.requester_id === currentUser.id) {
                userRequestExisting = true;
                break;
            }
        }
        return userRequestExisting;
    }

    const isUserTraveler = () => {
        let userTraveler = false;
        for(let traveler of travelers) {
            if(traveler.traveler_id === currentUser.id) {
                userTraveler = true;
                break;
            }
        }
        return userTraveler;
    }

    const displayRequestButton = () => {
        if(isUserTraveler()) {
            return null;
        } else if(isUserRequestExisting()) {
            return (
                <Button 
                    onClick={deleteReqCall}
                    color="primary"
                    variant="contained" 
                    disableElevation
                >
                    <span className="requested">
                        Requested
                    </span>
                </Button>
            )
        } else {
            return (
                <Button 
                    onClick={requestCall}
                    color="primary"
                    variant="contained" 
                    disableElevation
                >Request</Button>
            )
        }
    }
    
    const displayExpired = () => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        const dateToTime = new Date(trip.date_to).getTime();
        if(currentTime > dateToTime || trip.is_completed) {
            return null
        } else if(currentUser.id === trip.planner_id) {
            return (
                <>
                <Button 
                    onClick={deleteTripCall} 
                    color="primary"
                    variant="contained" 
                    disableElevation
                >Delete</Button>
                </>
            )
        } else {
            return (
                <>
                {displayRequestButton()}
                </>
            )
        }
    }

    const getDisplayDate = ( date ) => {
        if(Number(trip.id) <= 4 && window.location.hostname === "localhost") return date;
        const splitDate = date.split("-");
        let year = splitDate[0];
        let month = splitDate[1];
        let day = splitDate[2];
        
        return month + "/" + day + "/" + year;
    }
    
    return (
        <section className="dt-info">
            {response}
            <header>
                <section className="dt-hi">
                    <h2>{trip.trip_title}</h2>
                    <p><span>Destination: </span>{trip.destination}</p>
                    <p className="dti-dates">
                        <span>From </span>{getDisplayDate(trip.date_from)}
                        <span> To </span>{getDisplayDate(trip.date_to)}
                    </p>
                </section>

                <section className="dt-buttons">
                    {displayExpired()}
                </section>
            </header>

            <article>
                <p>{trip.description}</p>
            </article>

            <main>
                <p><span>Group Type: </span>{trip.group_type}</p>
                <p><span>Language: </span>{trip.language}</p>
                <p><span>Accommodation: </span>{trip.accommodation}</p>
                <p><span>Budget: </span>{trip.budget}</p>
                <p><span>Itinerary: </span>{trip.itinerary}</p>
                <p><span>Split Costs: </span>{trip.split_costs}</p>
                <p><span>Trip Type: </span>{trip.trip_type}</p>
            </main>
        </section>
    )
}

export default DetailedTripInfo;
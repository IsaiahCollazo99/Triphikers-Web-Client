import React, { useContext, useState, useEffect } from 'react';
import '../../css/general/tripCard.css';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import { getTripRequests, getTripTravelers } from '../../util/apiCalls/getRequests';
import { createTripRequest } from '../../util/apiCalls/postRequests';
import { deleteTripRequest, deleteTrip } from '../../util/apiCalls/deleteRequests';
import { completeTrip } from '../../util/apiCalls/patchRequests';

const TripCard = ({ trip, refresh }) => {
    const [ requests, setRequests ] = useState([]);
    const [ travelers, setTravelers ] = useState([]);
    const [ response, setResponse ] = useState(null);
    
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();

    const getTravelersCall = async () => {
        const data = await getTripTravelers(trip.id);
        if(data.travelers) {
            setTravelers(data.travelers);
        } else {
            setTravelers([]);
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

    useEffect(() => {
        getRequestsCall()
        getTravelersCall();
    }, [])
    
    const redirect = (e) => {
        if(e.target.nodeName !== "BUTTON") {
            history.push("/trips/" + trip.id);
        }
    }

    const deleteTripCall = async ( ) => {
        try {
            const deleteResponse = await deleteTrip(trip.id);
            setResponse(deleteResponse);
            refresh();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with the delete request.</p>)
            console.log(error);
        }
    }

    const completeTripCall = async ( ) => {
        try {
            const completeTripResponse = await completeTrip(trip.id);
            setResponse(completeTripResponse);
            refresh();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with the complete request.</p>)
            console.log(error);
        }
    }

    const deleteReqCall = async () => {
        try {
            const deleteReqResponse = await deleteTripRequest(trip.id, currentUser.id);
            setResponse(deleteReqResponse);
            getRequestsCall();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with your delete request.</p>)
            console.log(error);
        }
    }

    const requestCall = async () => {
        try {
            const requestResponse = await createTripRequest(trip.id, currentUser.id)
            setResponse(requestResponse);
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
                <button className="tc-requested tc-btn" onClick={deleteReqCall}>
                    <span>Requested</span>
                </button>
            )
        } else {
            return (
                <button className="tc-req tc-btn" onClick={requestCall}>Request</button>
            )
        }
    }

    const displayExpired = () => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        const dateToTime = new Date(trip.date_to).getTime();
        if(currentTime > dateToTime || trip.is_completed) {
            return (
                <>
                <p className="error">EXPIRED</p>
                </>
            )
        } else {
            if(currentUser) {
                if(currentUser.id === trip.planner_id) {
                    return (
                        <>
                        <button onClick={completeTripCall} className="tc-com tc-btn">Complete</button>
                        <button onClick={deleteTripCall} className="tc-del tc-btn">Delete</button>
                        </>
                    )
                } else {
                    return (
                        <>
                        {displayRequestButton()}
                        </>
                    )
    
                }
            } else {
                return (
                    <button className="tc-req tc-btn">Request</button>
                )
            }
        }
    }

    const displayUserInfo = () => {
        if(window.location.pathname === "/") {
            return null
        } else {
            return (
                <aside>
                    <img src={trip.profile_picture} alt={trip.full_name}/>
                    <div className="tc-userInfo">
                        <p>{trip.full_name}</p>
                        <p>{trip.country_of_origin}</p>
                        <p>{trip.age}</p>
                        <p>{trip.gender}</p>
                    </div>
                </aside>
            )
        }
    }
    
    return (
        <>
        {response}
        <article className="tripCard" onClick={redirect}>
            {displayUserInfo()}
            
            <header>
                <div className="tripCardInfo">
                    <p className="tripCardTitle">{trip.trip_title}</p>
                    <p><span>Destination: </span>{trip.destination}</p>
                    <p>
                        <span>From:</span> {trip.date_from}
                        <span> To:</span> {trip.date_to}
                    </p>
                </div>
                
                <div className="tripCardButtons">
                    {displayExpired()}
                </div>
            </header>

            <section>
                <p className="tc-tl"><span>Budget: </span>${trip.budget}</p>
                <p className="tc-tr"><span>Trip Type: </span>{trip.trip_type}</p>
                <p className="tc-bl"><span>Split Costs: </span>{trip.split_costs}</p>
                <p className="tc-br"><span>Group Type: </span>{trip.group_type}</p>
            </section>
        </article>
        </>
    )
}

export default TripCard;
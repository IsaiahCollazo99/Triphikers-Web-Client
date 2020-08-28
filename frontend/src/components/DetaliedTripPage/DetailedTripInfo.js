import React, { useState, useEffect, useContext } from 'react';
import '../../css/detailedTripPage/detailedTripInfo.css';
import { deleteTrip, deleteTripRequest } from '../../util/apiCalls/deleteRequests';
import { useHistory } from 'react-router-dom';
import { completeTrip } from '../../util/apiCalls/patchRequests';
import { AuthContext } from '../../providers/AuthContext';
import { createTripRequest } from '../../util/apiCalls/postRequests';

const DetailedTripInfo = ({ trip = {}, getTripCall, getRequestsCall, requests, travelers }) => {
    const [ response, setResponse ] = useState(null)
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();

    const deleteTripCall = async () => {
        await deleteTrip(trip.id);
        history.push("/trips");
    }

    const completeTripCall = async () => {
        await completeTrip(trip.id);
        getTripCall();
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
    }

    const isUserTraveler = () => {
        let userTraveler = false;
        for(let traveler of travelers) {
            if(traveler.traveler_id === currentUser.id) {
                userTraveler = true;
                break;
            }
        }
    }

    const displayRequestButton = () => {
        if(isUserTraveler) {
            return null;
        } else if(isUserRequestExisting()) {
            return (
                <button className="tc-requested tc-btn" onClick={deleteReqCall}><span>Requested</span></button>
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
                <button onClick={deleteTripCall} className="dt-del">Delete</button>
                </>
            )
        } else {
            if(currentUser.id === trip.planner_id) {
                return (
                    <>
                    <button onClick={completeTripCall} className="dt-com">Complete</button>
                    <button onClick={deleteTripCall} className="dt-del">Delete</button>
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
    }
    
    return (
        <section className="dt-info">
            <header>
                <section className="dt-hi">
                    <p className="dt-title"><span>Title: </span>{trip.trip_title}</p>
                    <p><span>Destination: </span>{trip.destination}</p>
                    <div className="dt-dates">
                        <p><span>Date From: </span>{trip.date_from}</p>
                        <p><span>Date To: </span>{trip.date_to}</p>
                    </div>
                </section>

                <section className="dt-buttons">
                    {displayExpired()}
                </section>
            </header>

            <article>
                <span>Description: </span>
                <p>{trip.description}</p>
            </article>

            <main>
                <p><span>Group Type: </span>{trip.group_type}</p>
                <p className="dt-span2"><span>Language: </span>{trip.language}</p>
                <p><span>Accommodation: </span>{trip.accommodation}</p>

                <section className="dt-il">
                    <p><span>Planner's Budget: </span>{trip.budget}</p>
                    <p><span>Itinerary: </span>{trip.itinerary}</p>
                </section>

                <section className="dt-ir"> 
                    <p><span>Split Costs: </span>{trip.split_costs}</p>
                    <p><span>Trip Type: </span>{trip.trip_type}</p>
                </section>
            </main>
        </section>
    )
}

export default DetailedTripInfo;
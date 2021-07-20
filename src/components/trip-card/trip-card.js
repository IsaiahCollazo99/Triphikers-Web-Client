import { Button } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { AuthContext } from '../../providers/auth-context';
import { deleteTripRequest, deleteTrip } from '../../util/api-calls/delete-requests';
import { getTripRequests, getTripTravelers } from '../../util/api-calls/get-requests';
import { createTripRequest } from '../../util/api-calls/post-requests';
import './trip-card.css';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const redirect = (e) => {
        const isAnchorClicked = e.target.nodeName === "A";
        const isButtonClicked = e.target.nodeName === "BUTTON";
        const isButtonLabelClicked = e.target.className === "MuiButton-label";
        if(!isButtonClicked && !isAnchorClicked && !isButtonLabelClicked) {
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
        if(isUserTraveler() || !currentUser) {
            return null;
        } else if(isUserRequestExisting()) {
            return (
                <Button 
                    className="tc-requested" 
                    onClick={deleteReqCall} 
                    color="primary" 
                    variant="contained" 
                >
                    <span>Requested</span>
                </Button>
            )
        } else {
            return (
                <Button 
                    className="tc-req" 
                    onClick={requestCall}  
                    color="primary" 
                    variant="contained" 
                >
                    Request
                </Button>
            )
        }
    }

    const displayExpired = () => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        const dateToTime = new Date(trip.date_to).getTime();
        const currentUserIsOwner = currentUser.id === trip.planner_id;

        if(currentTime > dateToTime || trip.is_completed) {
            return (
                <>
                <p className="error">EXPIRED</p>
                </>
            )
        } else {
            if(currentUser && currentUserIsOwner) {
                return (
                    <>
                    <Button 
                        onClick={deleteTripCall}  
                        color="primary" 
                        variant="contained" 

                    >
                        Delete
                    </Button>
                    </>
                )
            } else if(currentUser && !currentUserIsOwner) {
                return (
                    <>
                    {displayRequestButton()}
                    </>
                )
    
            } else {
                return null;
            }
        }
    }

    const displayUserInfo = () => {
        if(currentUser) {
            return (
                <aside>
                    <img src={trip.profile_picture} alt={trip.full_name}/>
                    <div className="tc-userInfo">
                        <Link to={`/user/${trip.planner_id}`}>{trip.full_name}</Link>
                        <p style={{marginTop: '5px', marginBottom: '5px'}}>{trip.age}</p>
                        <p style={{marginBottom: 0}}>{trip.gender}</p>
                    </div>
                </aside>
            )
        } else {
            return null
        }
    }

    const getDisplayDate = ( date ) => {
        if((Number(trip.id) <= 4 || Number(trip.id) >= 7)&& window.location.hostname === "localhost") return date;
        const splitDate = date.split("-");
        let year = splitDate[0];
        let month = splitDate[1];
        let day = splitDate[2];
        
        return month + "/" + day + "/" + year;
    }
    
    return (
        <>
        {response}
        <article className="tripCard" onClick={redirect}>
            {displayUserInfo()}
            
            <header>
                <section className="tripCardInfo">
                    <h4 className="tripCardTitle">{trip.trip_title}</h4>
                    <p><span>Destination: </span>{trip.destination}</p>
                    <p>
                        <span>From:</span> {getDisplayDate(trip.date_from)}
                        <span> To:</span> {getDisplayDate(trip.date_to)}
                    </p>
                </section>
                
                <section className="tripCardButtons">
                    {displayExpired()}
                </section>
            </header>

            <section className="tc-details">
                <section>
                    <p><span>Budget: </span>{trip.budget}</p>
                    <p><span>Split Costs: </span>{trip.split_costs}</p>
                </section>
                
                <section>
                    <p><span>Trip Type: </span>{trip.trip_type}</p> 
                    <p><span>Group Type: </span>{trip.group_type}</p>
                </section>
            </section>
        </article>
        </>
    )
}

export default TripCard;
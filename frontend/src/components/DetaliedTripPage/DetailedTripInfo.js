import React, { useState, useEffect } from 'react';
import '../../css/detailedTripPage/detailedTripInfo.css';
import { deleteTrip } from '../../util/apiCalls/deleteRequests';
import { useHistory } from 'react-router-dom';
import { completeTrip } from '../../util/apiCalls/patchRequests';
import { getTripById } from '../../util/apiCalls/getRequests';

const DetailedTripInfo = ({ trip = {}, getTripCall }) => {
    const history = useHistory();

    const deleteTripCall = async () => {
        await deleteTrip(trip.id);
        history.push("/trips");
    }

    const completeTripCall = async () => {
        await completeTrip(trip.id);
        getTripCall();
    }

    const displayExpired = () => {
        const currentDate = new Date();
        if(currentDate.getTime() > new Date(trip.date_to).getTime() || trip.is_completed) {
            return (
                <p className="error">EXPIRED</p>
            )
        } else {
            return (
                <>
                    <button className="dt-req">Request</button>
                    <button onClick={completeTripCall} className="dt-com">Complete</button>
                </>
            )
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
                    <button onClick={deleteTripCall} className="dt-del">Delete</button>
                </section>
            </header>

            <article>
                <span>Description: </span>
                <p>{trip.description}</p>
            </article>

            <main>
                <p><span>Group Type: </span>{trip.group_type}</p>
                <p><span>Language: </span>{trip.language}</p>
                <p><span>Before Trip Meetup: </span>{trip.before_trip_meetup}</p>
                <p><span>Accommodation: </span>{trip.accommodation}</p>
                <p><span>Planner's Budget: </span>{trip.budget}</p>
                <p><span>Split Costs: </span>{trip.split_costs}</p>
                <div className="dt-ib">
                    <p><span>Itinerary: </span>{trip.itinerary}</p>
                    <p><span>Trip Type: </span>{trip.trip_type}</p>
                </div>
            </main>
        </section>
    )
}

export default DetailedTripInfo;
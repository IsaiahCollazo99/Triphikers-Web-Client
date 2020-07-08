import React from 'react';
import '../../css/detailedTripPage/detailedTripInfo.css';

const DetailedTripInfo = ({ trip = {} }) => {
    return (
        <section className="dt-info">
            <header>
                <section className="dt-hi">
                    <p>{trip.trip_title}</p>
                    <p>{trip.destination}</p>
                    <div className="dt-dates">
                        <p><span>Date From: </span>{trip.date_from}</p>
                        <p><span>Date To: </span>{trip.date_to}</p>
                    </div>
                </section>

                <section className="dt-buttons">
                    <button>Request</button>
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
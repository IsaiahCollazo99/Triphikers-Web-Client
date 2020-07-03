import React from 'react';

const TripCard = ({ trip }) => {
    return (
        <div className="tripCard">
            <aside>
                <img src={trip.profile_picture} />
                <p>{trip.full_name}</p>
                <p>{trip.country_of_origin}</p>
                <p>{trip.age}</p>
                <p>{trip.gender}</p>
            </aside>

            <header>
                <p>{trip.trip_name}</p>
                <p>{trip.destination}</p>
                <p><span>From:</span> {trip.date_from} <span>To:</span> {trip.date_to}</p>
            </header>

            <section>
                <p className="tc-tl">{trip.budget}</p>
                <p className="tc-tr">{trip.trip_type}</p>
                <p className="tc-bl">{trip.split_costs}</p>
                <p className="tc-br">{trip.group_type}</p>
            </section>
        </div>
    )
}

export default TripCard;
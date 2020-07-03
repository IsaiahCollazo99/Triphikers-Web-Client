import React from 'react';
import '../../css/general/tripCard.css';

const TripCard = ({ trip }) => {
    return (
        <div className="tripCard">
            <aside>
                <img src={trip.profile_picture} alt={trip.full_name}/>
                <p>{trip.full_name}</p>
                <p>{trip.country_of_origin}</p>
                <p>{trip.age}</p>
                <p>{trip.gender}</p>
            </aside>

            <header>
                <div className="tripCardInfo">
                    <p>{trip.trip_name}</p>
                    <p>{trip.destination}</p>
                    <p>
                        <span>From:</span> {trip.date_from}
                        <span> To:</span> {trip.date_to}
                    </p>
                </div>

                <div className="tripCardButtons">
                    <button>Request</button>
                    <button>Details</button>
                </div>
            </header>

            <section>
                <p className="tc-tl"><span>Budget: </span>{trip.budget}</p>
                <p className="tc-tr"><span>Trip Type: </span>{trip.trip_type}</p>
                <p className="tc-bl"><span>Split Costs: </span>{trip.split_costs}</p>
                <p className="tc-br"><span>Group Type: </span>{trip.group_type}</p>
            </section>
        </div>
    )
}

export default TripCard;
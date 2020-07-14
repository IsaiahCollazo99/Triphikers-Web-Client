import React from 'react';
import '../../css/general/tripCard.css';
import { useHistory } from 'react-router-dom';
import { completeTrip } from '../../util/apiCalls/patchRequests';

const TripCard = ({ trip, deleteTripCall }) => {
    const history = useHistory();
    
    const redirect = () => {
        history.push("/trips/" + trip.id);
    }

    const handleDeleteClick = () => {
        deleteTripCall(trip.id);
    }

    const completeTripCall = async () => {
        let res = await completeTrip(trip.id);
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
                    <button>Request</button>
                    <button onClick={completeTripCall}>Complete</button>
                </>
            )
        }
    }
    
    return (
        <div className="tripCard" onClick={redirect}>
            <aside>
                <img src={trip.profile_picture} alt={trip.full_name}/>
                <div className="tc-userInfo">
                    <p>{trip.full_name}</p>
                    <p>{trip.country_of_origin}</p>
                    <p>{trip.age}</p>
                    <p>{trip.gender}</p>
                </div>
            </aside>

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
                    <button onClick={handleDeleteClick}>Delete</button>
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
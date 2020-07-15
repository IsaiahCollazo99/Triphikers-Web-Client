import React, { useContext } from 'react';
import '../../css/general/tripCard.css';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';

const TripCard = ({ trip, deleteTripCall, completeTripCall }) => {
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();
    
    const redirect = (e) => {
        if(e.target.nodeName !== "BUTTON") {
            history.push("/trips/" + trip.id);
        }
    }

    const handleDeleteClick = () => {
        deleteTripCall(trip.id);
    }

    const handleCompleteClick = () => {
        completeTripCall(trip.id);
    }

    const displayExpired = () => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        const dateToTime = new Date(trip.date_to).getTime();
        if(currentTime > dateToTime || trip.is_completed) {
            return (
                <p className="error">EXPIRED</p>
            )
        } else {
            if(currentUser.id === trip.planner_id) {
                return (
                    <>
                    <button onClick={handleCompleteClick} className="tc-com tc-btn">Complete</button>
                    <button onClick={handleDeleteClick} className="tc-del tc-btn">Delete</button>
                    </>
                )
            } else {
                return (
                    <button className="tc-req tc-btn">Request</button>
                )

            }
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
import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../../util/apiCalls/getRequests';
import { deleteTrip } from '../../util/apiCalls/deleteRequests';
import TripCard from '../General/TripCard';
import '../../css/tripsPage/tripsPage.css';
import { completeTrip } from '../../util/apiCalls/patchRequests';
import TripsPageFilter from './TripsPageFilter';
import { useHistory } from 'react-router-dom';

const TripsPage = () => {
    const [ trips, setTrips ] = useState([]);
    const [ filteredTrips, setFilteredTrips ] = useState([]);
    const [ response, setResponse ] = useState(null);

    const history = useHistory();

    const redirect = () => {
        history.push("/trips/create");
    }

    const completeTripCall = async ( id ) => {
        try {
            const completeTripResponse = await completeTrip(id);
            setResponse(completeTripResponse);
            getTripsCall();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with the complete request.</p>)
            console.log(error);
        }
    }

    const deleteTripCall = async ( id ) => {
        try {
            const deleteResponse = await deleteTrip(id);
            setResponse(deleteResponse);
            getTripsCall();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with the delete request.</p>)
            console.log(error);
        }
    }
    
    const getTripsCall = async () => {
        try {
            const { trips: allTrips } = await getAllTrips();
            if(!allTrips.length) {
                setResponse(<p className="error">No Trips Found</p>)
            } else {
                setTrips(allTrips);
            }
        } catch (error) {
            setTrips([]);
            if(error.response) {
                const { response: { data: { error: errorText }}} = error;
                setResponse(<p className="error">{errorText}</p>)
            }
            console.log(error);
        }
    }

    const filterTrips = ( filter ) => {
        if(filter) {
            let filterResult = trips.filter(trip => {
                const { destination } = trip;
                return destination.toLowerCase() === filter.toLowerCase();
            })
            setFilteredTrips(filterResult);
        } else {
            setFilteredTrips([]);
        }
    }
    
    useEffect(() => {
        getTripsCall();
    }, [])

    const isTripExpired = ( trip ) => {
        const currentDate = new Date();
        const tripDateTo = new Date(trip.date_to);
        const currentTime = currentDate.getTime();
        const dateToTime = tripDateTo.getTime();
        return currentTime > dateToTime;
    }

    const getTripsList = ( tripsArr ) => {
        const validTrips = [];
        const expiredTrips = [];
        tripsArr.forEach(trip => {
            if(trip.is_completed || isTripExpired(trip)) {
                expiredTrips.push(
                    <TripCard trip={trip} deleteTripCall={deleteTripCall} completeTripCall={completeTripCall} key={trip.id} />
                )
            } else {
                validTrips.push(
                    <TripCard trip={trip} deleteTripCall={deleteTripCall} completeTripCall={completeTripCall} key={trip.id} />
                )
            }
        })

        return [...validTrips, ...expiredTrips]
    }

    let tripsList;
    if(filteredTrips.length) {
        tripsList = getTripsList(filteredTrips);
    } else if(trips.length) {
        tripsList = getTripsList(trips);
    }
    
    return (
        <div className="tripsPage">
            <button onClick={redirect} className="tp-createTrip">CREATE A TRIP</button>
            <TripsPageFilter filterTrips={filterTrips}/>
            <div className="tripsPageFeed">
                {response}
                {tripsList}
            </div>
        </div>
    )
}

export default TripsPage;
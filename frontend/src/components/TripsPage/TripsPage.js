import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../../util/apiCalls/getRequests';
import TripCard from '../General/TripCard';
import '../../css/tripsPage/tripsPage.css';
import TripsPageFilter from './TripsPageFilter';
import { useHistory } from 'react-router-dom';
import { FaSync } from 'react-icons/fa';

const TripsPage = () => {
    const [ trips, setTrips ] = useState([]);
    const [ filteredTrips, setFilteredTrips ] = useState([]);
    const [ response, setResponse ] = useState(null);

    const history = useHistory();

    const redirect = () => {
        history.push("/trips/create");
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
                return destination.toLowerCase().includes(filter.toLowerCase()); 
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
        tripsArr.forEach(trip => {
            if(!trip.is_completed && !isTripExpired(trip)) {
                validTrips.push(
                    <TripCard trip={trip} refresh={getTripsCall} key={trip.id} />
                )
            }
        })

        return validTrips
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
            <section className="tp-feedManager">
                <TripsPageFilter filterTrips={filterTrips}/>
                <FaSync onClick={getTripsCall} className="tp-refresh" />
            </section>
            <section className="tripsPageFeed">
                {response}
                {tripsList}
            </section>
        </div>
    )
}

export default TripsPage;
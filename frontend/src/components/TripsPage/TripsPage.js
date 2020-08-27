import React, { useEffect, useState, useContext } from 'react';
import { getAllTrips, getUserById } from '../../util/apiCalls/getRequests';
import TripCard from '../General/TripCard';
import '../../css/tripsPage/tripsPage.css';
import TripsPageFilter from './TripsPageFilter';
import { useHistory } from 'react-router-dom';
import { FaSync } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthContext';

const TripsPage = () => {
    const [ trips, setTrips ] = useState([]);
    const [ filteredTrips, setFilteredTrips ] = useState([]);
    const [ response, setResponse ] = useState(null);
    const [ user, setUser ] = useState({});
    const { currentUser } = useContext(AuthContext);

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

    const getCurrentUser = async () => {
        try {
            let data = await getUserById(currentUser.id);
            while(!data) {
                data = await getUserById(currentUser.id);
            }
            setUser(data.user);
        } catch ( error ) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getTripsCall();
        getCurrentUser();
    }, [])

    const isTripExpired = ( trip ) => {
        const currentDate = new Date();
        const tripDateTo = new Date(trip.date_to);
        const currentTime = currentDate.getTime();
        const dateToTime = tripDateTo.getTime();
        return currentTime > dateToTime;
    }

    const isUserMale = () => user.gender === "Male";
    const isUserFemale = () => user.gender === "Female";
    const isUserNonBinary = () => user.gender === "Non-Binary";

    const isValidGroupType = ( trip ) => {
        if(isUserMale()) {
            return trip.group_type !== "Only Women" && trip.group_type !== "Only Non-Binary";
        } else if(isUserFemale()) {
            return trip.group_type !== "Only Men" && trip.group_type !== "Only Non-Binary";
        } else if(isUserNonBinary()) {
            return trip.group_type !== "Only Men" && trip.group_type !== "Only Women";
        }
    }

    const isValidTrip = ( trip ) => {
        return !trip.is_completed && !isTripExpired(trip) && isValidGroupType(trip)
    }

    const getTripsList = ( tripsArr ) => {
        const validTrips = [];
        tripsArr.forEach(trip => {
            if(isValidTrip(trip)) {
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
                <FaSync onClick={getTripsCall} className="tp-refresh" title="Refresh trips"/>
            </section>
            <section className="tripsPageFeed">
                {response}
                {tripsList}
            </section>
        </div>
    )
}

export default TripsPage;
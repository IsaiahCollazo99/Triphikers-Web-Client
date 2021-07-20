import React, { useState, useEffect } from 'react';
import TripCard from '../custom-components/trip-card';
import { getAllTrips } from '../../util/apiCalls/getRequests';
import { useHistory } from 'react-router-dom';
import '../../css/landingPage/landingPageCarousel.css';

const LandingPageLatest = () => {
    const [ trips, setTrips ] = useState([]);
    const [ carouselPage, setCarouselPage ] = useState(0);
    const history = useHistory();

    const isInvalid = ( trip ) => {
        const dateToTime = new Date(trip.date_to).getTime();
        const currentTime = new Date().getTime();
        return dateToTime < currentTime || trip.is_completed;
    }

    const getValidTrips = ( tripSet ) => {
        let validTrips = [];

        tripSet.forEach(trip => {
            if(!isInvalid(trip)) {
                validTrips.push(trip);
            }
        })

        return validTrips;
    }

    const getTripsCall = async () => {
        let data = await getAllTrips();
        const { trips: allTrips } = data;

        setTrips(getValidTrips(allTrips));
    }

    const handlePrevTrip = () => {
        if(carouselPage > 0) {
            setCarouselPage(carouselPage - 1);
        } else {
            setCarouselPage(trips.length - 1);
        }
    }

    const handleNextTrip = () => {
        if(carouselPage < trips.length - 1) {
            setCarouselPage(carouselPage + 1);
        } else {
            setCarouselPage(0);
        }
    }

    useEffect(() => {
        getTripsCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirect = () => {
        history.push("/signUp");
    }

    const displayedTrip = () => {
        if(trips.length) {
            return (
                <TripCard trip={trips[carouselPage]} deleteTripCall={redirect} completeTripCall={redirect}/>
            )
        }
        
    }
    
    return (
        <section className="lp-carousel">
            <button onClick={handlePrevTrip} className="lp-carouselBtn">{"<"}</button>
            {displayedTrip()}
            <button onClick={handleNextTrip} className="lp-carouselBtn">{">"}</button>
        </section>
    )
}

export default LandingPageLatest;
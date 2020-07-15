import React, { useState, useEffect } from 'react';
import TripCard from '../General/TripCard';
import { getAllTrips } from '../../util/apiCalls/getRequests';
import { useHistory } from 'react-router-dom';
import '../../css/landingPage/landingPageCarousel.css';

const LandingPageLatest = () => {
    const [ trips, setTrips ] = useState([]);
    const [ carouselPage, setCarouselPage ] = useState(0);
    const history = useHistory();

    const getTripsCall = async () => {
        let data = await getAllTrips();
        const { trips: allTrips } = data;
        setTrips(allTrips.slice(0, 4));
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
        <section className="lp-latestTrips">
            <h1>LATEST TRIPS</h1>
            <div className="lp-carousel">
                <button onClick={handlePrevTrip} className="lp-carouselBtn">{"<"}</button>
                {displayedTrip()}
                <button onClick={handleNextTrip} className="lp-carouselBtn">{">"}</button>
            </div>
        </section>
    )
}

export default LandingPageLatest;
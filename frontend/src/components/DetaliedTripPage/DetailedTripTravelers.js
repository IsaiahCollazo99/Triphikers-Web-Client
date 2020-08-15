import React, { useState, useEffect } from 'react';
import { getTripTravelers } from '../../util/apiCalls/getRequests';
import '../../css/detailedTripPage/detailedTripTravelers.css';

const DetailedTripTravelers = ({ trip = {} }) => {
    const [ travelers, setTravelers ] = useState([]);
    
    const getTravelersCall = async () => {
        try {
            const data = await getTripTravelers(trip.id);
            if(data.travelers) {
                setTravelers(data.travelers);
            } else {
                setTravelers([]);
            }
        } catch ( error ) {
            setTravelers([]);
            console.log(error);
        }
    }

    useEffect(() => {
        getTravelersCall();
    }, [])

    const travelersList = travelers.map((user) => {
        return (
            <article className="travelersCard" key={user.id}>
                <section className="tc-info">
                    <img src={user.profile_picture} alt={user.full_name} />
                    <p>{user.full_name}</p>
                </section>
            </article>
        )
    })

    return (
        <section className="dt-travelers">
            {travelersList}
        </section>
    )
}

export default DetailedTripTravelers;
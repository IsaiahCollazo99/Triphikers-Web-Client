import React, { useEffect, useState } from 'react';
import { useParams, Route, Switch, Link } from 'react-router-dom';
import { getTripById } from '../../util/apiCalls/getRequests';
import { ProtectedUserRoute } from '../../util/routesUtil';
import DetailedTripNav from './DetailedTripNav';
import DetailedTripInfo from './DetailedTripInfo';
import DetailedTripRequests from './DetailedTripRequests';
import DetailedTripTravelers from './DetailedTripTravelers';
import FacebookLogo from '../../images/f_logo_RGB-Blue_1024.png';
import InstagramLogo from '../../images/glyph-logo_May2016.png';
import TwitterLogo from '../../images/Twitter_Social_Icon_Circle_Color.png'
import '../../css/detailedTripPage/detailedTripPage.css';

const DetailedTripPage = () => {
    const { id } = useParams();
    const [ trip, setTrip ] = useState({});

    const getTripCall = async () => {
        try {
            const data = await getTripById(id);
            setTrip(data.trip);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTripCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const displaySocialMedia = () => {
        const {
            facebook_link,
            twitter_username,
            instagram_username
        } = trip;

        const facebookLink = facebook_link ? (
            <a href={`https://www.${facebook_link}`} target="_blank" rel="noopener noreferrer">
                <img src={FacebookLogo} alt="facebook" />
            </a>
        ) : null;

        const instagramLink = instagram_username ? (
            <a href={`https://www.${instagram_username}`} target="_blank" rel="noopener noreferrer">
                <img src={InstagramLogo} alt="instagram" />
            </a>
        ) : null;

        const twitterLink = twitter_username ? (
            <a href={`https://www.${twitter_username}`} target="_blank" rel="noopener noreferrer">
                <img src={TwitterLogo} alt="instagram" />
            </a>
        ) : null;

        return (
            <>
                {facebookLink}
                {instagramLink}
                {twitterLink}
            </>
        )
    }

    if(trip.full_name) {
        return (
            <div className="detailedTripContainer">
                <aside className="dt-header">
                    <section className="dt-user">
                        <img src={trip.profile_picture} alt={trip.full_name} />
                        <div className="dt-userInteraction">
                            <Link to={`/user/${trip.planner_id}`}>{trip.full_name}<span></span></Link> 
                            <section className="dt-socialMedia">
                                {displaySocialMedia()}
                            </section>
    
                        </div>
                    </section>
    
                    <section className="dt-userInfo">
                        <p><span>Age: </span>{trip.age}</p>
                        <p><span>Country: </span>{trip.country_of_origin}</p>
                        <p><span>Gender: </span>{trip.gender}</p>
                    </section>
                </aside>

                <main>
                    <DetailedTripNav trip={trip}/>
                    <Switch>
                        <Route exact path={"/trips/:tripId/"}>
                            <DetailedTripInfo trip={trip} getTripCall={getTripCall} />
                        </Route>
        
                        <Route exact path={"/trips/:tripId/travelers"}>
                            <DetailedTripTravelers trip={trip} />
                        </Route>
                        
                        <ProtectedUserRoute exact path={"/trips/:tripId/requests"} trip={trip}>
                            <DetailedTripRequests trip={trip} />
                        </ProtectedUserRoute>
        
                    </Switch>
                </main>
            </div>
        )
    } else {
        return (
            <p className="error">No Trip Found</p>
        )
    }
    
}

export default DetailedTripPage;
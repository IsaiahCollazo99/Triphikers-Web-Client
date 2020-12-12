import React, { useEffect, useState, useContext } from 'react';
import { useParams, Route, Switch, Link } from 'react-router-dom';
import { getTripById } from '../../util/apiCalls/getRequests';
import { ProtectedUserRoute } from '../../util/routesUtil';
import { createClient } from 'pexels';
import DetailedTripNav from './DetailedTripNav';
import DetailedTripInfo from './DetailedTripInfo';
import DetailedTripRequests from './DetailedTripRequests';
import DetailedTripTravelers from './DetailedTripTravelers';
import FacebookLogo from '../../images/f_logo_RGB-Blue_1024.png';
import InstagramLogo from '../../images/glyph-logo_May2016.png';
import TwitterLogo from '../../images/Twitter_Social_Icon_Circle_Color.png';
import horizon from '../../images/horizon.jpg';
import '../../css/detailedTripPage/detailedTripPage.css';
import { AuthContext } from '../../providers/AuthContext';

const DetailedTripPage = () => {
    const client = createClient(`563492ad6f9170000100000153f28b06267f4b548fc99fbb457455db`);
    const { id } = useParams();
    const [ trip, setTrip ] = useState({});
    const [ imageRef, setImageRef ] = useState("");
    const { currentUser } = useContext(AuthContext);

    const getPhoto = async () => {
        const { destination } = trip;
        if(destination) {
            const query = destination.split(",")[0];
            const { photos } = await client.photos.search({ query, per_page: 1 });
            if(photos[0]) {
                setImageRef(photos[0].src.landscape);
            } else {
                setImageRef(horizon);
            }
        }
    }

    useEffect(() => {
        getPhoto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip])

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

    const displayNav = () => {
        if(currentUser.id === trip.planner_id) {
            return (
                <>
                <DetailedTripNav trip={trip}/>
                <Switch>
                        <Route exact path={"/trips/:tripId"}>
                            <DetailedTripTravelers trip={trip} />
                        </Route>
                        
                        <ProtectedUserRoute exact path={"/trips/:tripId/requests"} trip={trip}>
                            <DetailedTripRequests trip={trip} />
                        </ProtectedUserRoute>
        
                    </Switch>
                </>
            )
        } else {
            return (
                <>
                <DetailedTripTravelers trip={trip} />
                </>
            )
        }
    }

    if(trip.full_name) {
        return (
            <>
            <a href={imageRef} target="_blank" rel="noopener noreferrer" className="dt-coverContainer">
                <img src={imageRef} alt={trip.destination} className="dt-coverImg" />
            </a>
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
                        <p>{trip.age}</p>
                        <p>{trip.country_of_origin}</p>
                        <p>{trip.gender}</p>
                    </section>
                </aside>

                <DetailedTripInfo trip={trip} getTripCall={getTripCall} />

                {displayNav()}
            </div>
            </>
        )
    } else {
        return (
            <p className="error">No Trip Found</p>
        )
    }
    
}

export default DetailedTripPage;
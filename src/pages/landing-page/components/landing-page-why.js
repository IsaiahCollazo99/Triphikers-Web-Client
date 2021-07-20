import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import LandingPageFooter from './landing-page-footer';
import friendsSelfie from "../../../images/friendsSelfieCar.jpg";
import './landing-page-why.css';

const useStyles = makeStyles((theme) => ({
    margin: {
    margin: theme.spacing(1),
    },
}));

const LandingPageWhy = ({ redirect }) => {
    const classes = useStyles();
    return (
        <div className="lp-why-container">
            <section className="lp-why"> 
                <h1>WHY TRIPHIKERS IS THE BEST PLACE TO FIND TRAVEL PARTNERS?</h1>
                <section>
                    <img src={friendsSelfie} alt="Friends Selfie" />
                    <article>
                        <p>
                            Triphikers is the place to go to find like-minded travelers to share lasting memories with. You can find people in a city you are currently in or that you're 
                            planning to travel to. Browse through trips posted by other users so you can find your perfect partner. 
                        </p>

                        <p>
                            We pride ourselves on our safety while not forcing you to pay a premium price to have access to all of our features. Making the search for your travel buddy 
                            that much easier. Allowing you to find your partner as quickly and smoothly as possible is our goal.
                        </p>
                    </article>
                </section>
                <Button onClick={redirect} variant="contained" color="primary" className={classes.margin} style={{maxWidth: '100%', maxHeight: '10%', minWidth: '25%', minHeight: '5%'}}> Join </Button>
            </section> 
            <LandingPageFooter className="landingPageFooter"/>
        </div>
    )
}

export default LandingPageWhy
import React from 'react';
import '../../css/landingPage/landingPageAbout.css';
import LandingPageSearch from './LandingPageSearch';
import worldIcon from "../../images/icons/around-the-globe-icon.png";
import peopleIcon from "../../images/icons/people-icon.png";
import selfieIcon from "../../images/icons/selfie-icon.png";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
    margin: theme.spacing(1),
    },
}));


const LandingPageAbout = ({ redirect }) => {
    const classes = useStyles();
    return (
        <section className="lp-about">
            <div className="leftContainer">
                <div className="searchCard">
                    <div className="searchCardTitle">
                        <h1>TRAVEL PARTNERS</h1>
                        <h1>FOR LIFE</h1>
                        <h1>FOR FREE</h1>
                    </div>
                    <LandingPageSearch redirect={redirect}/>
                    <Button onClick={redirect} variant="contained" color="primary" className={classes.margin} style={{maxWidth: '200%', maxHeight: '10%', minWidth: '50%', minHeight: '5%'}}> Create Your Trip </Button>
                </div>
            </div>
            <div className="rightContainer">
                <div className="landingPageCard">
                    <img src={worldIcon} alt="icon" className="landingPageIcon"/>
                    <h2 className="landingPageCardTitle">Travel The World</h2>
                    <p className="landingPageCardInfo">Indulge in new cultures, explore new cities, and experience adventure.</p>
                </div>
                <div className="landingPageCard">
                    <img src={peopleIcon} alt="icon" className="landingPageIcon"/>
                    <h2 className="landingPageCardTitle">Travel Together</h2>
                    <p className="landingPageCardInfo">Vacation with friends, venture with new buddies, or tour with locals.</p>
                </div>
                <div className="landingPageCard">
                    <img src={selfieIcon} alt="icon" className="landingPageIcon"/>
                    <h2 className="landingPageCardTitle">Travel & Share</h2>
                    <p className="landingPageCardInfo">Organize trips, choose your interests, and share photos with the Triphikers community.</p>
                </div>
            </div>
		</section>
    )
}

export default LandingPageAbout;
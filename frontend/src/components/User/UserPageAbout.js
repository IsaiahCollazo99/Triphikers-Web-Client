import React from 'react';
import FacebookLogo from '../../images/f_logo_RGB-Blue_1024.png';
import InstagramLogo from '../../images/glyph-logo_May2016.png';
import TwitterLogo from '../../images/Twitter_Social_Icon_Circle_Color.png'
import '../../css/userPage/userPageAbout.css'

const UserPageAbout = ({ user }) => {

    const displaySocialMedia = () => {
        const {
            facebook_link,
            twitter_username,
            instagram_username
        } = user;

        const facebookLink = facebook_link ? (
            <a href={`https://www.${facebook_link}`} target="_blank">
                <img src={FacebookLogo} alt="facebook" />
            </a>
        ) : null;

        const instagramLink = instagram_username ? (
            <a href={`https://www.${instagram_username}`} target="_blank">
                <img src={InstagramLogo} alt="instagram" />
            </a>
        ) : null;

        const twitterLink = twitter_username ? (
            <a href={`https://www.${twitter_username}`} target="_blank">
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

    return (
        <section className="up-about">
            <section className="up-aboutList">
                <section className="up-socialMedia">
                    {displaySocialMedia()}
                </section>
                <p><span>Language: </span>{user.language}</p>
            </section>
        </section>

    )
}

export default UserPageAbout;


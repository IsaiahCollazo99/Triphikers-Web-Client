import React from 'react';

const UserPageEdit = () => {
    return (
        <section className="up-edit">
            <header>
                <section className="up-coverImage">
                </section>

                <section className="up-user">
                    <img src={profileUser.profile_picture} alt="profile_picture" />
                    <div className="up-userInteraction">
                        {/* rating goes in the span */}
                        <p>{profileUser.full_name}<span></span></p>
                        <section>
                            {/* Social Media goes here */}
                        </section>
                    </div>
                </section>

                <section className="up-userInfo">
                    <p><span>Age: </span>{profileUser.age}</p>
                    <p><span>Country of Origin: </span>{profileUser.country_of_origin}</p>
                    <p><span>Gender: </span>{profileUser.gender}</p>
                </section>

                <section className="up-bio">
                    <span>Bio: </span>
                    <p>{profileUser.bio}</p>
                </section>
            </header>
        </section>
    )
}

export default UserPageEdit;
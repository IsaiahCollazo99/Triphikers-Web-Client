import React from 'react';

const UserSocialEdit = ( props ) => {
    const {
        facebook,
        instagram,
        twitter,
    } = props;
    
    return (
        <section className="upe-socialMedia">
            <label htmlFor="facebook">
                <p>Facebook Link: </p>

                <span>Facebook.com/</span>
                <input
                    type="text"
                    placeholder="Facebook Username"
                    {...facebook}
                />
            </label>

            <label htmlFor="instagram">
                <p>Instagram Username: </p>

                <span>Instagram.com/</span>
                <input
                    type="text"
                    placeholder="Instagram Username"
                    {...instagram}
                />
            </label>

            <label>
                <p>Twitter Username: </p>

                <span>Twitter.com/</span>
                <input type="text" placeholder="Twitter Username" {...twitter} />
            </label>
        </section>
    )
}

export default UserSocialEdit;
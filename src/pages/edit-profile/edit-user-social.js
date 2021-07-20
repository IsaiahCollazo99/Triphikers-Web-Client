import { InputAdornment } from '@material-ui/core';
import React from 'react';

import CustomTextField from '../custom-components/custom-text-field/custom-text-field';

const UserSocialEdit = ( props ) => {
    const {
        facebook,
        instagram,
        twitter,
    } = props;
    
    return (
        <section className="upe-socialMedia">
            <h2>Social Media</h2>
            <CustomTextField 
                label="Facebook"
                type="text"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">Facebook.com/</InputAdornment>
                }}
                placeholder="Enter your Facebook Username"
                style={{width: '30%'}}
                {...facebook}
            />

            <CustomTextField 
                label="Instagram"
                type="text"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">Instagram.com/</InputAdornment>
                }}
                placeholder="Enter your Instagram Username"
                style={{width: '30%'}}
                {...instagram}
            />
            
            <CustomTextField 
                label="Twitter"
                type="text"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">Twitter.com/</InputAdornment>
                }}
                placeholder="Enter your Twitter Username"
                style={{width: '30%'}}
                {...twitter}
            />
        </section>
    )
}

export default UserSocialEdit;
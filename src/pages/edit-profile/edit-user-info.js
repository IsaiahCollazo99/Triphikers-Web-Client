import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import CustomTextField from '../custom-components/custom-text-field/custom-text-field';

const UserInfoEdit = ( props ) => {
    const { 
        handleFileSelect,
        firstName,
        lastName,
        country,
        gender,
        bio,
        imagePreview
    } = props;
    const [ countries, setCountries ] = useState([]);

    const getCountries = async () => {
		let res = await axios.get("https://restcountries.eu/rest/v2/all");
		setCountries(res.data);
    }
    
    useEffect(() => {
        getCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const countryOptions = countries.map(country => {
		return <option value={country.name} key={country.alpha2Code}>{country.name}</option>
    })
    
    const displayPreview = imagePreview ? <img src={imagePreview} alt="new Profile" /> : null;

    return (
        <section className="upe-user" style={{height: imagePreview ? '100vh' : '70vh'}}>
            <h2>Personal Info</h2>
            <section className="upe-pfpContainer">
                <b>Preview: </b>
                {displayPreview}

                <label htmlFor="upe-pfp" className="pfpLabel">
                    <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                        <CloudUploadIcon />
                    </span>
                    Upload a Profile Picture
                </label>

                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="pfp"
                    id="upe-pfp"
                    onChange={handleFileSelect}
                />
            </section>

            <CustomTextField 
                label="First Name"
                type="text"
                variant="outlined"
                InputLabelProps={{
                    shrink: true
                }}
                placeholder="Enter your First Name"
                style={{width: '30%'}}
                {...firstName}
            />
            
            <CustomTextField 
                label="Last Name"
                type="text"
                variant="outlined"
                InputLabelProps={{
                    shrink: true
                }}
                placeholder="Enter your Last Name"
                style={{width: '30%'}}
                {...lastName}
            />

            <CustomTextField 
                label="Country of Origin"
                select
                variant="outlined"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{width: '30%'}}
                {...country}
            >
                <option disabled value="">
                    Select a country
                </option>
                {countryOptions}
            </CustomTextField>

            <CustomTextField
                label="Gender"
                select
                variant="outlined"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{width: '30%'}}
                {...gender}
            >
                <option disabled value="">
                    Select a gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
            </CustomTextField>

            <CustomTextField 
				multiline
				label="Bio"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
				}}
				placeholder="Enter your Bio"
				rows={4}
                style={{width: '30%'}}
				{...bio}
			/>
        </section>
    )
}

export default UserInfoEdit;
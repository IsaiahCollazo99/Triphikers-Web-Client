import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CustomTextField from '../General/CustomTextField';

const UserInfoEdit = ( props ) => {
    const { 
        handleFileSelect,
        firstName,
        lastName,
        country,
        gender
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

    return (
        <section className="upe-user">
            <h2>Personal Info</h2>
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
        </section>
    )
}

export default UserInfoEdit;
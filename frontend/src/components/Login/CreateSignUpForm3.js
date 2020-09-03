import React, { useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import axios from "axios";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CustomTextField from '../General/CustomTextField';
import LanguageSelect from "../General/LanguageSelect";

const CreateSignUpForm3 = (props) => {
	const { 
		language, 
		country, 
		setProfilePicture,
		handlePageChange, 
		handleSubmit 
	} = props;

	const [ countries, setCountries ] = useState([]);
	const [ imagePreview, setImagePreview ] = useState(null);

	const handleFileSelect = ( e ) => {
		setProfilePicture(e.target.files[0]);
		setImagePreview(URL.createObjectURL(e.target.files[0]));
	}

	const getCountries = async () => {
		let res = await axios.get("https://restcountries.eu/rest/v2/all");
		setCountries(res.data);
	}

	useEffect(() => {
		getCountries()
	}, []);

	const countryOptions = countries.map(country => {
		return <option value={country.name} key={country.alpha2Code}>{country.name}</option>
	});

	const displayPreview = imagePreview ? <img src={imagePreview} alt="new Profile" /> : null;

	return (
		<>
		<header>
			<h1>CREATE AN ACCOUNT</h1>
			<h3>3/3</h3>
		</header>

		<form onSubmit={handleSubmit}>
			<CustomTextField 
				label="Language"
				select
				variant="outlined"
				SelectProps={{
					native: true,
				}}
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				required
				{...language}
			>
				<LanguageSelect />	
			</CustomTextField>

			<CustomTextField 
				label="Country"
				select
				variant="outlined"
				SelectProps={{
					native: true,
				}}
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				required
				{...country}
			>
				<option value="" disabled>Select a County</option>
				{countryOptions}
			</CustomTextField>

			<section className="suf3-pfpContainer">
                <label htmlFor="suf3-pfp" className="pfpLabel">
                    <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                        <CloudUploadIcon />
                    </span>
                    Upload a Profile Picture
                </label>

                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="pfp"
                    id="suf3-pfp"
                    onChange={handleFileSelect}
                />
                <b>Preview: </b>
                {displayPreview}
            </section>

			<div className="buttons">
				<Button 
					onClick={() => handlePageChange(2)} 
					type="button" 
					color="primary"
					variant="outlined"
				>
					BACK
				</Button>
				<Button 
					type="submit"
					color="primary"
					variant="contained"
				>
					SIGN UP
				</Button>
			</div>
		</form>
		</>
	);
};

export default CreateSignUpForm3;

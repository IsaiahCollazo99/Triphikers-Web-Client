import React, { useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import axios from "axios";
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

	const handleFileSelect = ( e ) => {
		setProfilePicture(e.target.files[0]);
	}

	const getCountries = async () => {
		let res = await axios.get("https://restcountries.eu/rest/v2/all");
		setCountries(res.data);
	}

	useEffect(() => {
		getCountries()
	}, [])

	const countryOptions = countries.map(country => {
		return <option value={country.name} key={country.alpha2Code}>{country.name}</option>

	})

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

			<label htmlFor="profilePic">Profile Picture : </label>
			<input type="file" name="profilePic" accept=".png, .jpg, .jpeg" onChange={handleFileSelect} required />

			<div className="buttons">
				<button onClick={() => handlePageChange(2)} type="button" className="backButton">
					BACK
				</button>
				<input type="submit" value="SIGN UP" />
			</div>
		</form>
		</>
	);
};

export default CreateSignUpForm3;

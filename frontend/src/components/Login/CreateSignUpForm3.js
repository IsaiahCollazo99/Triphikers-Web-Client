import React, { useEffect, useState } from "react";
import axios from "axios";
import LanguageSelect from "../General/LanguageSelect";

const CreateSignUpForm3 = (props) => {
	const { 
		bio, 
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
			<label htmlFor="bio">Bio : (OPTIONAL)</label>
			<textarea col="10" row="5" {...bio} name="bio" maxLength={120}/>

			<label htmlFor="language">Language : </label>
			<LanguageSelect input={language} className="su-language" />

			<label htmlFor="country">Country : </label>
			<select {...country} name="country" required>
				<option value="" disabled>Select a County</option>
				{countryOptions}
			</select>

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

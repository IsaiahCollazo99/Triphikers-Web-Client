import React, { useState } from "react";


const CreateSignUpForm2 = (props) => {
	const { firstName, lastName, birthday, gender, handlePageChange, user } = props;
	const [ error, setError ] = useState(null);
	
	const isValidAge = () => {
		const today = new Date();
		const userBirthday = new Date(birthday.value);
		const currentYearBirthday = new Date(
			today.getFullYear(), 
			userBirthday.getMonth(), 
			userBirthday.getDate()
		);
	
		if(today >= currentYearBirthday) {
			return (today.getFullYear() - userBirthday.getFullYear()) >= 18;
		} else {
			return (today.getFullYear() - userBirthday.getFullYear() - 1) >= 18;
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(isValidAge()) {
			handlePageChange(3)
		} else {
			setError(<p className="error">Must be 18 years or older to sign up.</p>)
		}
	}

	const displayBackButton = () => {
		if(!user) {
			return (
				<button onClick={()=> handlePageChange(1)} type="button">
					BACK
				</button>
			)
		} else {
			return null;
		}
	}

	const yyyy = new Date().getFullYear(); 

	let mm = new Date().getMonth() + 1;
	if(mm < 10) mm = "0" + mm;

	let dd = new Date().getDate();
	if(dd < 10) dd = "0" + dd;

	const today = `${yyyy}-${mm}-${dd}`;

	return (
		<>
		<header>
			<h1>CREATE AN ACCOUNT</h1>
			<h3>2/3</h3>
		</header>

		<form onSubmit={handleSubmit}>
			{error}

			<label htmlFor="firstName">First Name : </label>
			<input type="text" name="firstName" autoComplete="on" placeholder="First Name" {...firstName} required />

			<label htmlFor="lastName">Last Name : </label>
			<input type="text" {...lastName} name="lastName" autoComplete="on" placeholder="Last Name"  required />

			<label htmlFor="birthday">Birthday : </label>
			<input type="date" name="birthday" {...birthday} max={today} min={"1900-01-01"} autoComplete="on"  required />

			<label htmlFor="gender">Gender : </label>
			<select {...gender} name="gender" required>
				<option disabled value="">Select your Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="Non-Binary">Non-Binary</option>
			</select>

			<div className="buttons">
				{displayBackButton()}
				<input type="submit" value="NEXT PAGE" />
			</div>
		</form>
		</>
	);
};

export default CreateSignUpForm2;

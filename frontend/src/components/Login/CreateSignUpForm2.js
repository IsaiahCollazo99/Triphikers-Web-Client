import React, { useState } from "react";
import { getUserByUsername } from "../../util/apiCalls/getRequests";
import { Button } from '@material-ui/core';
import CustomTextField from '../General/CustomTextField';


const CreateSignUpForm2 = (props) => {
	const { firstName, lastName, birthday, gender, handlePageChange,
	username, setUsername } = props;
	const [ isValidUsername, setIsValidUsername ] = useState(true);
	const [ usernameExists, setUsernameExists ] = useState(false);
	const [ helperText, setHelperText ] = useState({
		username: "Must include alpha-numeric characters or . _ - only",
		birthday: ""
	})
	
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

	const isUsernameExisting = async () => {
		try {
			const data = await getUserByUsername(username);
			data.user ? setUsernameExists(true) : setUsernameExists(false);
			return data.user;
		} catch ( error ) {
			console.log(error);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(await isUsernameExisting()) {
			setHelperText({...helperText, username: "User with that username exists"});
		} else if(isValidAge() && isValidUsername) {
			handlePageChange(3)
		} else {
			if(!isValidAge()) {
				setHelperText({...helperText, birthday: "Must be 18 years or older to sign up."});
			}
		}
	}

	const onInputChange = ( e ) => {
		const inputValue = e.target.value;
		const pattern = "[^a-zA-Z0-9._-]";

		if(inputValue.match(pattern)) {
			setIsValidUsername(false);
			setHelperText({...helperText, 
				username: "Username contains invalid characters (a-z, 0-9, . _ - only)"});
		} else {
			setIsValidUsername(true);
			setHelperText({...helperText, 
				username: "Must include alpha-numeric characters or . _ - only"});
		}
		setUsername(inputValue);
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

		<form onSubmit={handleSubmit} className="signUp2" style={{height: '80%'}}>

			<CustomTextField 
				label="First Name"
				type="text"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				placeholder="Enter your First Name"
				required
				{...firstName}
			/>

			<CustomTextField 
				label="Last Name"
				type="text"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				placeholder="Enter your Last Name"
				required
				{...lastName}
			/>

			<CustomTextField
				label="Birthday"
				type="date"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				InputProps={{
					max: today,
					min: "1900-01-01",
				}}
				helperText={helperText.birthday}
				error={helperText.birthday ? true : false}
				required
				{...birthday}
			/>

			<CustomTextField
				label="Username"
				type="text"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				helperText={helperText.username}
				error={!isValidUsername || usernameExists}
				placeholder="Enter your Username"
				required
				value={username}
				onChange={onInputChange}
			/>

			<CustomTextField
				label="Gender"
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
				{...gender}
			>
				<option disabled value="">Select your Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="Non-Binary">Non-Binary</option>
			</CustomTextField>

			<section className="buttons">
				<Button 
					onClick={()=> handlePageChange(1)} 
					type="button" 
					variant="outlined"
					color="primary"
				>
					BACK
				</Button>
				<Button 
					type="submit" 
					variant="contained"
					color="primary"
				>
					NEXT PAGE
				</Button>
			</section>
		</form>
		</>
	);
};

export default CreateSignUpForm2;

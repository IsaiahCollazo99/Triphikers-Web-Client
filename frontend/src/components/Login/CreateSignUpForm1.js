import React, { useState } from "react";
import { getUserByEmail } from "../../util/apiCalls/getRequests";
import { IconButton, InputAdornment, Button } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import CustomTextField from '../General/CustomTextField';
import '../../css/signUpIn/signUp1.css';

const CreateSignUpForm1 = (props) => {
	const { email, password, confirmPassword, handlePageChange } = props;
	const [ error, setError ] = useState(null);
	const [ showPassword, setShowPassword ] = useState(false);
	const [ showConfirm, setShowConfirm ] = useState(false);
	const [ errors, setErrors ] = useState({ password: false, email: false });

	const isEmailExisting = async () => {
		try {
			const data = await getUserByEmail(email.value);
			return data.user;
		} catch ( error ) {
			console.log(error);
		}
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		if(password.value !== confirmPassword.value) {
			setError(<p className="error">The passwords don't match</p>);
			setErrors({ ...errors, password: true });
		} else if(await isEmailExisting()) {
			setError(<p className="error">A user with that email exists.</p>);
			setErrors({ password: false, email: true });
		} else {
			setErrors({ password: false, email: false });
			handlePageChange(2);
		}
	}

	const handleShowConfirm = () => {
		setShowConfirm((prevState) => !prevState);
	}

	const handleShowPassword = () => {
		setShowPassword((prevState) => !prevState);
	}

	const handleMouseDownPassword = ( e ) => {
		e.preventDefault();
	  };
	
	return (
		<>
		<header>
			<h1>CREATE AN ACCOUNT</h1>
			<h3>1/3</h3>
		</header>

		<form onSubmit={handleSubmit} className="signUp1">
			{error}

			<CustomTextField 
				label="Email"
				type="email"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				placeholder="Enter your Email Address"
				required
				error={errors.email}
				{...email}

			/>

			<CustomTextField 
				label="Password"
				type={showPassword ? "text" : "password"}
				variant="outlined"
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={handleShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
				placeholder="Enter your Password"
				required
				error={errors.password}
				{...password}
				
			/>

			<CustomTextField 
				label="Confirm Password"
				type={showConfirm ? "text" : "password"}
				variant="outlined"
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={handleShowConfirm}
								onMouseDown={handleMouseDownPassword}
							>
								{showConfirm ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
				placeholder="Confirm your Password"
				required
				error={errors.password}
				{...confirmPassword}

			/>

			<Button 
				type="submit"
				variant="contained"
				color="primary"
				style={{width: 'fit-content', alignSelf: 'center'}}
			>Next Page</Button>
		</form>
		</>
	);
};
export default CreateSignUpForm1;

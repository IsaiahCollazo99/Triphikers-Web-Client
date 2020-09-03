import React, { useState } from "react";
import { getUserByEmail } from "../../util/apiCalls/getRequests";
import { IconButton, InputAdornment, Button } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import CustomTextField from '../General/CustomTextField';

const CreateSignUpForm1 = (props) => {
	const { email, password, confirmPassword, handlePageChange } = props;
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
			setErrors({ ...errors, password: true });
		} else if(await isEmailExisting()) {
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
			<CustomTextField 
				label="Email"
				type="email"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
					required: false,
				}}
				helperText="A user with that email exists."
				FormHelperTextProps={{
					style: {
						display: errors.email ? "inherit" : "none"
					}
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
				helperText="Password do not match."
				FormHelperTextProps={{
					style: {
						display: errors.password ? "inherit" : "none"
					}
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

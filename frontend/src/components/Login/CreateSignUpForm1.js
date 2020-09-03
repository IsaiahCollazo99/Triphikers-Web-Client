import React, { useState } from "react";
import { getUserByEmail } from "../../util/apiCalls/getRequests";
import { IconButton, InputAdornment, Button } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import CustomTextField from '../General/CustomTextField';

const CreateSignUpForm1 = (props) => {
	const { email, password, confirmPassword, handlePageChange } = props;
	const [ showPassword, setShowPassword ] = useState(false);
	const [ showConfirm, setShowConfirm ] = useState(false);
	const [ errorsState, setErrorsState ] = useState({ password: false, email: false });
	const [ errors, setErrors ] = useState({ password: null, email: null });

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
			setErrorsState({ ...errorsState, password: true });
			setErrors({ ...errors, password: "Passwords do not match"});
		} else if(password.value.length <= 5) {
			setErrorsState({ ...errorsState, password: true});
			setErrors({ ...errors, password: "Password must be 6 characters or longer"});
		} else if(await isEmailExisting()) {
			setErrorsState({ password: false, email: true });
			setErrors({ password: null, email: "A user with that email exists."});
		} else {
			setErrorsState({ password: false, email: false });
			setErrors({ password: null, email: null });
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
				helperText={errors.email}
				FormHelperTextProps={{
					style: {
						display: errorsState.email ? "inherit" : "none"
					}
				}}
				placeholder="Enter your Email Address"
				required
				error={errorsState.email}
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
				helperText={errors.password}
				FormHelperTextProps={{
					style: {
						display: errorsState.password ? "inherit" : "none"
					}
				}}
				placeholder="Enter your Password"
				required
				error={errorsState.password}
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
				error={errorsState.password}
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

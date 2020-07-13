import React from "react";


const CreateSignUpForm2 = (props) => {
	const { firstName, lastName, birthday, gender, handlePageChange, user } = props;

	const handleSubmit = (e) => {
		e.preventDefault();
		handlePageChange(3)
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
	return (
		<>
		<header>
			<h1>CREATE AN ACCOUNT</h1>
			<h3>2/3</h3>
		</header>

		<form onSubmit={handleSubmit}>
			<label htmlFor="firstName">First Name : </label>
			<input type="text" name="firstName" {...firstName} required />

			<label htmlFor="lastName">Last Name : </label>
			<input type="text" {...lastName} name="lastName" required />

			<label htmlFor="birthday">Birthday : </label>
			<input type="date" name="birthday" {...birthday} required />

			<label htmlFor="gender">Gender : </label>
			<input type="text" name="gender" {...gender} required />

			<div className="buttons">
				{displayBackButton()}
				<input type="submit" value="NEXT PAGE" />
			</div>
		</form>
		</>
	);
};

export default CreateSignUpForm2;

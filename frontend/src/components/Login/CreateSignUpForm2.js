import React from "react";


const CreateSignUpForm2 = (props) => {
	const { firstName, lastName, birthday, gender, handlePageChange } = props;
	const handleSubmit = (e) => {
		e.preventDefault();
		handlePageChange(3)
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
			<input type="date" name="birthday" {...birthday} />

			<label htmlFor="gender">Gender : </label>
			<input type="text" name="gender" {...gender} />

			<div className="buttons">
				<button onClick={()=> handlePageChange(1)}>
					BACK
				</button>
				<input type="submit" value="NEXT PAGE" />
			</div>
		</form>
		</>
	);
};

export default CreateSignUpForm2;

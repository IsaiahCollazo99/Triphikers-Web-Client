import React from "react";


const CreateSignUpForm2 = (props) => {
	const { firstName, lastName, birthday, gender, handlePageChange } = props;
	const handleSubmit = (e) => {
		e.preventDefault();
		handlePageChange(3)
	}
	return (
		<>
			<div>
				<h1>CREATE AN ACCOUNT 2 / 3</h1>
			</div>
			<form className="signUpPage1" onSubmit={handleSubmit}>
				<div>
					<label>First Name : </label>
					<input type="text" name="firstName" {...firstName} required />
				</div>
				<div>
					<label>Last Name : </label>
					<input type="text" {...lastName} name="lastName" required />
				</div>
				<div>
					<label>Birthday : </label>
					<input type="date" name="birthday" {...birthday} />
				</div>
				<div>
					<label>Gender : </label>
					<input type="text" name="gender" {...gender} />
				</div>
				<div>
					<button className="backBtn" onClick={()=>{handlePageChange(1)}}>
					back
					</button>
					<button className="continueBtn" type="submit">
					continue
					</button>
				</div>
			</form>
		</>
	);
};

export default CreateSignUpForm2;

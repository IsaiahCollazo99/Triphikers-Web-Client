import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateSignUpForm2 = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	return (
		<div>
			<div>
				<h1>CREATE AN ACCOUNT 2 / 3</h1>
			</div>
			<div>
				<label>First Name : </label>
				<input
					 value={firstName}
					onChange={(e) => setFirstName(e.currentTarget.value)}
				/>
			</div>
			<div>
				<label>Last Name : </label>
				<input
					value={lastName}
					onChange={(e) => setLastName(e.currentTarget.value)}
				/>
			</div>
			<div>
				<label>Birthday : </label>
				<input value={age} onChange={(e) => setAge(e.currentTarget.value)} />
			</div>
			<div>
				<label>Gender : </label>
				<input
					value={gender}
					onChange={(e) => setGender(e.currentTarget.value)}
				/>
			</div>
			<button className="backBtn">
				<Link to="/signUp1">back</Link>
			</button>
			<button className="continueBtn">
				<Link to ="/signUp3">continue</Link>
			</button>
		</div>
	);
};

export default CreateSignUpForm2;

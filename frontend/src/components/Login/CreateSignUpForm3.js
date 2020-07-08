import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateSignUpForm3 = () => {
	const [bio, setBio] = useState("");
	const [languages, setLanguages] = useState("");
	const [country, setCountry] = useState("");
  
	return (
		<div>
			<div>
				<h1>CREATE AN ACCOUNT 3 / 3</h1>
			</div>
			<div>
				<label>Bio : </label>
				<input
					// value={Bio}
					onChange={(e) => setBio(e.currentTarget.value)}
				/>
			</div>
			<div>
				<label>Languages : </label>
				<input
					// value={languages}
					onChange={(e) => setLanguages(e.currentTarget.value)}
				/>
			</div>
			<div>
				<label>Country : </label>
				<input value={country} onChange={(e) => setCountry(e.currentTarget.value)} />
			</div>
			<button className="backBtn">
				<Link to="/signUp2">back</Link>
			</button>
      <button className="signUp">
        <Link to="/userProfile">
            Sign Up
        </Link>
     </button>
		</div>
	);
};

export default CreateSignUpForm3;

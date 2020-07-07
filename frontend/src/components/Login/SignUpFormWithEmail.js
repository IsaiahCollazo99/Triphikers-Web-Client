import React, { useState } from "react";
// import { FaSpinner } from 'react-icons/fa';
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
const SignUpFormWithEmail = () => {
	const [error, setError] = useState(null);
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const history = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();
		// setLoading(true);
		try {
			// let res = await SignUpFormWithEmail(email, password)
			// await Axios.post(`${API}/api/users`)
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<form className="signUpWithEmail" onSubmit={handleSubmit}>
			<h1>
				CREATE AN ACCOUNT <span>1 / 3</span>
			</h1>

			{error ? <div className="error">{error}</div> : null}
			<section>
				<label className="formLabel">Email: </label>
			</section>
			<section>
				<input
					type="email"
					{...email}
					name="email"
					autoComplete="on"
					// className={emailClass} required
				/>
			</section>
			<section>
				<label className="formLabel">Password </label>
			</section>
			<section>
				<input
					type="password"
					// {...password}
					name="password"
					autoComplete="on"
					required
				/>
			</section>
			<section>
				<label className="formLabel">Confirm password: </label>
			</section>
			<section>
				<input
					type="confirmPassword"
					// {...confirmPassword}
					name="password"
					autoComplete="on"
					required
				/>
				<button type="submit">
					<Link to="/createAccount2/3">Continue</Link>
				</button>
			</section>
		</form>
	);
};
export default SignUpFormWithEmail;

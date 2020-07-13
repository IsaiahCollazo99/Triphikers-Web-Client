import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useInput } from "../../util/customHooks";
import CreateSignUpForm1 from "./CreateSignUpForm1";
import CreateSignUpForm2 from "./CreateSignUpForm2";
import CreateSignUpForm3 from "./CreateSignUpForm3";
import { createUser } from "../../util/apiCalls/usersRequests";
import { Login } from "../../util/apiCalls/usersRequests";

const CreateSignUpContainer = () => {
	const [error, setError] = useState(null);
	const history = useHistory();
	const [page, setPage] = useState(1);
	const email = useInput("");
	const password = useInput("");
	const confirmPassword = useInput("");
	const firstName = useInput("");
	const lastName = useInput("");
	const birthday = useInput("");
	const gender = useInput("");
	const bio = useInput("");
	const language = useInput("");
	const country = useInput("");

	const handlePageChange = (toPage) => {
		setPage(toPage);
	};

	const pageOne = {
		email,
		password,
		confirmPassword,
	};

	const pageTwo = {
		firstName,
		lastName,
		birthday,
		gender,
	};
	const pageThree = {
		bio,
		language,
		country,
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// await createUser({ ...pageOne, ...pageTwo, ...pageThree });
		console.log(email, password);

		try {
			debugger;
			// let res = await signUp(email, password);
			// await axios.post(`${API}/api/users`, {
			// 	id: res.user.uid,
			// 	email: email,

			// });
			history.push("/");

			debugger;
		} catch (error) {
			setError(error.message);
		}

		history.push("/trips");
	};

	const getFormDisplay = () => {
		if (page === 1) {
			return (
				<CreateSignUpForm1 {...pageOne} handlePageChange={handlePageChange} />
			);
		} else if (page === 2) {
			return (
				<CreateSignUpForm2 {...pageTwo} handlePageChange={handlePageChange} />
			);
		} else if (page === 3) {
			return (
				<CreateSignUpForm3 {...pageThree} handlePageChange={handlePageChange} handleSubmit={handleSubmit} />
			);
		}
	};
	return (
		<div className="createSignUpContainer">
			{getFormDisplay()}
		</div>
	);
};

export default CreateSignUpContainer;

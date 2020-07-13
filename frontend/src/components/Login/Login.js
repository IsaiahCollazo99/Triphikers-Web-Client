import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LandingPageNav from "../LandingPage/LandingPageNav"
// import { login } from "../../util/firebaseFunctions";




export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const history = useHistory();


	const handleSignIn = async (e) => {
		e.preventDefault();
		
		try {
			// await login(email, password);
      history.push("/user");
      console.log(email, password)
		} catch (error) {
			debugger;
			setError(error.message);
		}
	};
  return (
   <>
       {/* <div>
				<LandingPageNav/>
       </div>  */}
    <div className="logInFormDiv">
			
				{error ? <p className="error">{error.message}</p> : null}
		
				
      <form onSubmit={handleSignIn} className="signIn">
        <label>Email :
						<input
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
							required
							className="emailInput"
          />
        </label>
        <label>Password :
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
							autoComplete="on"
							required
							className="password"
          />
          </label>
						<button type="submit" className="login">
							Log in
						</button>
			</form>			
			</div>
			</>
       
	);
}

import React, {useState} from "react";
import { Link }from "react-router-dom"


const SignUpForm2 = () => {
  
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  
  return (
    <div>

      <div>
        <h1>CREATE AN ACCOUNT 2/3</h1>
      </div>
      <div>
      <label>First Name : </label>
    	<input
							// value={fist_name}
							onChange={(e) => setFirstName(e.currentTarget.value)}
						/>
      </div>
      <div>
        <label>Last Name : </label>
    	<input
							// value={last_name}
							onChange={(e) => setLastName(e.currentTarget.value)}
						/>
      </div>
      <div>
        <label>Birthday : </label>
        <select>
          <option>Month </option>
          <option>January </option>
          <option>February </option>
          <option>March </option>
          <option>April </option>
          <option>May </option>
          <option>Jun </option>
          <option>July </option>
          <option>August </option>
          <option>September </option>
          <option>October </option>
          <option>November </option>
          <option>December </option> 
        </select>

        <select>
          <option>Day </option>
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
        </select>
      </div>
      <div>
        <label>Gender : </label>
    	
      </div>
      <button className="backBtn">
          <Link to="/signUp_email">
            back
					</Link>
      </button>
      <button className="continueBtn">
          <Link  path="/signUpForm3">
            continue
					</Link>
      </button>
     
      </div>

   
  )
}

export default SignUpForm2;







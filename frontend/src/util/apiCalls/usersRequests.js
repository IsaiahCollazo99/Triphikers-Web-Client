import axios from "axios";
import { apiURL } from "../../util/apiURL";



const API = apiURL();
export const createUser = async (userObj) => {
  const {
    firstName: { value: firstName },
    lastName: { value: lastName },
    country: { value: country },
    age: { value: age },
    gender: { value: gender}
  } = userObj
  const fullName = firstName + lastName;
  const res = await axios.get(API + "/api/users", {
    fullName, country, age, gender
  })
}
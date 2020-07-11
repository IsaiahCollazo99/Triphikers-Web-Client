import axios from "axios";
import { apiURL } from "../../util/apiURL";
const userFullName = (firstName, LastName) => {
  return fullName  = firstName + LastName
}

const API = apiUrl();
export const createUser = async (userObj) => {
  const {
    firstName: { value: firstName },
    lastName: { value: lastName },
    country: { value: country },
    age: { value: age },
    gender: { value: gender}
  } = userObj
  const res = await axios.get(API + /api/users, {
    firstName, lastName, country, age, gender
  })
}
import axios from 'axios'
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const getAllTrips = async () => {
    try {
        let res = await axios.get(API + "/api/trips");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getTripById = async (id) => {
    
    try {
        let res = await axios.get(API + `/api/trips/${id}`);
        return res.data;
        debugger
    } catch (error) {
        throw error;
    }
}

export const getUserById = async ( id ) => {
    try {
        let res = await axios.get(API + `/api/users/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, data) => {
    try {
        let res = await axios.patch(API + "/api/users/" + id, data)
        debugger
        return(res.data.user)
    } catch(error) {
        console.log(error);
    }
}


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

export const getTripById = async ( id ) => {
    try {
        let res = await axios.get(API + `/api/trips/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getTripRequests = async ( id ) => {
    try {
        let res = await axios.get(API + `/api/trips/${id}/requests`);
        return res.data;
    } catch ( error ) {
        console.log(error);
        throw error;
    }
}
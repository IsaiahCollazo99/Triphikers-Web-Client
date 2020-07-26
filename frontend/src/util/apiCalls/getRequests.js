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

export const getUserById = async ( id ) => {
    try {
        let res = await axios.get(API + `/api/users/${id}`);
        return res.data;
        debugger
    } catch (error) {
        throw error;
    }
}

export const aboutUserById = async ( id ) => {
    try {
        let res = await axios.get(API + `/api/users/${id}/about`);
        return res.data;
        debugger
    } catch (error) {
        throw error;
    }
}
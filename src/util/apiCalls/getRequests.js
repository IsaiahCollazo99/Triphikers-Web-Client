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
    } catch (error) {
        throw error;
    }
}

export const getUserById = async ( id ) => {
    try {
        let res = await axios.get(API + `/api/users/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const getUserTrips = async ( id ) => {
    try {
        const res = await axios.get(API + `/api/users/${id}/trips`);
        return res.data;
    } catch ( error ) {
        console.log(error);
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

export const updateUser = async (id, data) => {
    try {
        let res = await axios.patch(API + "/api/users/" + id, data)
        return(res.data.user)
    } catch(error) {
        console.log(error);
    }
}

export const getTripTravelers = async ( id ) => {
    try {
        let res = await axios.get(API + `/api/trips/${id}/travelers`);
        return res.data;
    } catch ( error ) {
        console.log(error);
        throw error;
    }
}

export const getUserFriendRequests = async ( id ) => {
    try { 
        const res = await axios.get(API + `/api/users/${id}/friendRequests`);
        return res.data;
    } catch ( error ) {
        throw error;
    }
}

export const getUserFriends = async ( id ) => {
    try {  
        const res = await axios.get(API + `/api/users/${id}/friends`);
        return res.data;
    } catch ( error ) {
        console.log(error);
        throw error;
    }
}

export const getUserByEmail = async ( email ) => {
    try {
        const res = await axios.get(API + `/api/users/email/${email}`);
        return res.data;
    } catch ( error ) {
        console.log(error);
        throw error;
    }
}

export const getUserByUsername = async ( username ) => {
    try {
        const res = await axios.get(API + `/api/users/username/${username}`);
        return res.data;
    } catch ( error ) {
        console.log(error);
        throw error;
    }
}

export const getMarkers = async ( ) => {
    try {
        const res = await axios.get(API + `/api/hotspots`);
        return res.data;
    } catch ( error ) {
        console.log(error);
        throw error;
    }
}

import React from 'react';
import axios from 'axios'
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const completeTrip = async ( id ) => {
    try {
        await axios.patch(API + `/api/trips/${id}`);
        return <p className="success">Trip successfully completed</p>
    } catch (error) {
        throw error;
    }
}

export const updateUser = async ( id, userData ) => { 
    try {
        await axios.patch(API + `/api/users/${id}`, userData);
        return <p className="success">Succesfully updated profile</p>
    } catch ( error ) {
        throw error;
    }
}
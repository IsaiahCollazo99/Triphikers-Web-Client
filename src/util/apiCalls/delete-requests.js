import React from 'react';
import axios from 'axios'
import { apiURL } from '../api-url';

const API = apiURL();

export const deleteTrip = async ( id ) => {
    try {
        await axios.delete(API + `/api/trips/${id}`);
        return <p className="success">Trip successfully deleted</p>
    } catch ( error ) {
        throw error;
    }
}

export const deleteTripRequest = async ( id, requester_id ) => {
    try {
        await axios.delete(API + `/api/trips/${id}/requests?requester_id=${requester_id}`);
        return <p className="success">Request successfully denied</p>
    } catch ( error ) {
        throw error;
    }
}

export const deleteFriendRequest = async ( requester_id, requested_id ) => {
    try {
        await axios.delete(API + `/api/users/${requested_id}/friendRequests?requester_id=${requester_id}`);
    } catch ( error ) {
        throw error;
    }
}

export const removeFriend = async ( currentUserId, friend_id ) => {
    try {
        await axios.delete(API + `/api/users/${currentUserId}/friends?friend_id=${friend_id}`);
    } catch ( error ) {
        throw error;
    }
}
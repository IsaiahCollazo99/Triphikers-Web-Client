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
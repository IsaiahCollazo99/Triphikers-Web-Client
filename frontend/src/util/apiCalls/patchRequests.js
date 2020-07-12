import axios from 'axios'
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const completeTrip = async ( id ) => {
    try {
        let res = await axios.patch(API + `/api/trips/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}
import axios from 'axios'
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const createTrip = async ( tripObj ) => {
    const {
        destination: { value: destination },
        dateFrom: { value: date_from },
        dateTo: { value: date_to },
        groupType: { value: group_type },
        language: { value: language },
        meetup: { value: before_trip_meetup },
        tripType: { value: trip_type },
        title: { value: trip_title },
        accommodation: { value: accommodation },
        budget: { value: budget },
        split: { value: split_costs },
        itinerary: { value: itinerary },
        description: { value: description }
    } = tripObj;

    const res = await axios.post(API + "/api/trips", {
        destination, date_from, date_to, group_type, language, before_trip_meetup, trip_type, 
        trip_title, accommodation, budget, split_costs, itinerary, description
    })
}
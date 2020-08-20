import React from 'react';
import axios from 'axios'
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const createTrip = async ( tripObj, user ) => {
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

    const planner_id = user.id;

    const res = await axios.post(API + "/api/trips", {
        destination, date_from, date_to, group_type, language, before_trip_meetup, trip_type, 
        trip_title, accommodation, budget, split_costs, itinerary, description, planner_id
    })
}

const getUserAge = ( birthday ) => {
    const today = new Date();
    const userBirthday = new Date(birthday);
    const currentYearBirthday = new Date(
        today.getFullYear(), 
        userBirthday.getMonth(), 
        userBirthday.getDate()
    );

    if(today >= currentYearBirthday) {
        return today.getFullYear() - userBirthday.getFullYear();
    } else {
        return today.getFullYear() - userBirthday.getFullYear() - 1;
    }
}

export const createUser = async (userObj) => {
    debugger
    try {
        const {
            userEmail: email,
            firstName: { value: first_name },
            lastName: { value: last_name },
            birthday: { value: birthday },
            gender: { value: gender},
            bio: { value: bio },
            language: { value: language },
            country: { value: country_of_origin },
            url: profile_picture,
            id
          } = userObj
      
          const full_name = first_name + " " + last_name;
      
          const age = getUserAge(birthday);
      
          const res = await axios.post(API + "/api/users", {
              id,
              full_name,
              first_name,
              last_name,
              email,
              age,
              profile_picture,
              gender,
              bio,
              country_of_origin,
              language,

          })
    } catch (error) {
        console.log(error);
    }
    
  }

  export const createTripRequest = async ( tripId, requester_id ) => {
      try {
        const res = await axios.post(API + `/api/trips/${tripId}/requests`, {requester_id});
        return <p className="success">Request successfuly sent</p>
      } catch ( error ) {
          throw error;
      }
  }

  export const approveTraveler = async ( tripId, traveler_id ) => {
      console.log(tripId, traveler_id);
      try {
        const res = await axios.post(API + `/api/trips/${tripId}/travelers`, {traveler_id});
        return <p className="success">Successfuly approved request</p>
      } catch ( error ) {
        throw error;
      }
  }
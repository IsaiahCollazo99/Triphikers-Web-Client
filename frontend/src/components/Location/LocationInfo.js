import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationInfo = ({id}) => {
    const [locationInfo, setLocationInfo] = useState([]);
    let apiKey ="AIzaSyCpINhVI_CTjIc8xOastGFa5-dHpE-oIgg";
    let locationId = id
    debugger

    const fetchLocationData = async () => {
        try {
            let res = axios.get(`http://localhost:3001/api/locations/${id}`)
            setLocationInfo(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLocationData();
    }, [id])

    return(
        <div>

        </div>
    )
}

export default LocationInfo;
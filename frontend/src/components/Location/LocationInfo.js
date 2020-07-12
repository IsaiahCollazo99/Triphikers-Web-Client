import React, { useState, useEffect } from "react";
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from "axios";
import "../../css/locations/LocationInfo.css";
let apiKey ="AIzaSyCpINhVI_CTjIc8xOastGFa5-dHpE-oIgg";

const LocationInfo = ({info}) => {
    const [currency, setCurrency] = useState([])
    //is information coming from backend, will have to change the child info

    const getAllInfo = async (info) => {
        try {
            let currency = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=USD,GBP`);
            setCurrency(currency.data.rates)
            //currency doesnt exist in location db, needs to be dry coded
        } catch (error) {
            console.log(error)
        }
    }

    const currencyPrint = (exchange) => {
        for (const [key, value] of Object.entries(exchange)) {
            //need to print both currencies
            return(
                <div className="values">
                    <p>{key} : {value} </p>
                </div>
            )
          }
    }

    useEffect(() => {
        getAllInfo(info);
    }, [info])

    return(
        <div className="locationInfoContainer">
            <div className="locationImageContainer">
                <img className="cityImage" src={info.image} alt="location"/>
                <div className="overlay">
                    <div className="locationName">{info.location_name}</div>
                </div>
            </div>
            <div className="details">
                {/* <div className="map">
                    <Map google={info.google} zoom={14}/>
                </div> */}
                <p className="locationPageText">{info.location_name}</p>
                <p className="locationPageText">Currency Exchange</p>
                    {currencyPrint(currency)}
            </div>
            <div className="emergencyServices">
                <p className="locationPageText">Emergency Services</p>
                <p className="locationPageText">{info.emergency_services}</p>
            </div>
        </div>
    )
}

export default LocationInfo;

// export default GoogleApiWrapper({
//     apiKey: (apiKey)
//   })(LocationInfo)
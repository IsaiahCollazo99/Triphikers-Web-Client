import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from "axios";
import "../../css/locations/LocationInfo.css";
let apiKey ="AIzaSyCpINhVI_CTjIc8xOastGFa5-dHpE-oIgg";

const LocationInfo = ({info}) => {
    const [currency, setCurrency] = useState([])
    // const [coordinates, setCoordinates] = useState({})
    // const [lat, setLat] = useState({});
    // const [lng, setLng] = useState({});
    // coordinates = { lat:70, lng: -73}
    //is information coming from backend, will have to change the child info

    const getAllInfo = async (info) => {
        try {
            let currency = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=USD,GBP`);
            setCurrency(currency.data.rates);
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

    const getMap = (lat, lng) => {
        if(lat !== undefined){
            let object = {
                lat: lat,
                lng: lng
            }
            return(
                <Map google={window.google} zoom={6} style={{width: '20%', height: '20%'}} initialCenter={object}/>
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
                <div className="map">
                    {getMap(info.lat, info.lng)}
                    {/* <Map google={window.google} zoom={14} style={{width: '20%', height: '20%'}} initialCenter={getMap}/> */}
                </div>
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

export default GoogleApiWrapper({
    apiKey: (apiKey)
  })(LocationInfo)
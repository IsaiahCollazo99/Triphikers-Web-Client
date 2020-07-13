import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/locations/LocationInfo.css";
import InfoMap from "../helper/maps/InfoMap";
// let apiKey ="AIzaSyCpINhVI_CTjIc8xOastGFa5-dHpE-oIgg";

const LocationInfo = ({info}) => {
    const [currency, setCurrency] = useState([])
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
        let array = [];
        for (let key in exchange) {
            const value = exchange[key];
            array.push(
                <div className="values" key={key}>
                    <p>{key} : {value} </p>
                </div>
            )
          }
          return array
    }

    const getMap = (lat, lng) => {
        if(lat !== undefined){
            let coordinates = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
            return(
                <InfoMap location={coordinates}/>
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
                <div className="detailsMap">
                    {getMap(info.lat, info.lng)}
                </div>
                <div className="detailsText">
                    <p className="locationPageText">{info.location_name}</p>
                    <p className="locationPageText">Currency Exchange</p>
                        {currencyPrint(currency)}
                </div>
            </div>
            <div className="emergencyServices">
                <p className="locationPageText">Emergency Services</p>
                <p className="locationPageText">{info.emergency_services}</p>
            </div>
        </div>
    )
}

export default LocationInfo;
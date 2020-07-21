import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/locations/LocationInfo.css";
const LocationInfo = ({info}) => {
    const [currency, setCurrency] = useState([]);
    const [travelAdv, setTravelAdv] = useState([]);
    //is information coming from backend, will have to change the child info

    const getAllInfo = async (info) => {
        let countryCode = "US";
        //country code has been hard-coded for now
        try {
            let currency = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=USD,GBP`);
            let travelAdvisory = await axios.get(`https://www.travel-advisory.info/api?countrycode=${countryCode}`);
            setCurrency(currency.data.rates);
            setTravelAdv(travelAdvisory.data.data[countryCode]);
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

    const advisoryPrint = (country) => {
        let info = country.advisory;
        debugger
        if(info !== undefined){
            return (
                <div>
                        <h1>Travel Advisory</h1>
                        <h2>{country.name}</h2>
                        <p><b>Continent:</b> {country.continent}</p>
                        <p><b>Local Situation Rating:</b> {info.score}</p>
                        <p onClick={()=>window.open(info.source)}>Click here for Advisory Information</p>
                        <p>Information was updated on {info.updated}</p>
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
                <div className="detailsAdvisory">
                    {advisoryPrint(travelAdv)}
                </div>
                <div className="detailsCurrency">
                    <h1 className="locationPageText">Currency Exchange</h1>
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

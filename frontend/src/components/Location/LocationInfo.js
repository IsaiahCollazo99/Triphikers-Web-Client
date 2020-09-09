import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/locations/LocationInfo.css";
import { createClient } from 'pexels';

// const {
//     REACT_APP_PEXELSAPIKEY
// } = process.env;
//not working and must do for weather API as well
let weatherkey = '18d629f0d66c4d5e831121754202907';

const LocationInfo = ({ city, coord, country }) => {
    const client = createClient(`563492ad6f9170000100000153f28b06267f4b548fc99fbb457455db`);
    // const [currency, setCurrency] = useState([]);
    const [travelAdv, setTravelAdv] = useState([]);
    const [imageRef, setImageRef] = useState([]);
    const [weather, setWeather] = useState([]);
    const [currentTime, setCurrentTime] = useState([]);
    
    const getAllInfo = async (city, coord, country) => {
        if(city.length > 0){
            try {
                // let currency = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=USD,GBP`);
                let travelAdvisory = await axios.get(`https://www.travel-advisory.info/api?countrycode=${country}`);
                let weather = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${weatherkey}&q=${coord.lat},${coord.lng}&days=7`);
                // setCurrency(currency.data.rates);
                setTravelAdv(travelAdvisory.data.data[country]);
                setWeather(weather.data.forecast.forecastday);
                setCurrentTime(weather.data.location.localtime);
                getPhoto();
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getPhoto = () => {
    const query = `${city} skyline`;
    debugger
    client.photos.search({ query, per_page: 1 }).then(photos => setImageRef(photos.photos[0].src.landscape));
    }

    // const currencyPrint = (exchange) => {
    //     let array = [];
    //     for (let key in exchange) {
    //         const value = exchange[key];
    //         array.push(
    //             <div className="values" key={key}>
    //                 <p>{key} : {value} </p>
    //             </div>
    //         )
    //       }
    //       return array
    // }

    const advisoryPrint = (country) => {
        let info = country.advisory;
        if(info !== undefined){
            return (
                <div>
                    <h1 className="locationTitle">Travel Advisory</h1>
                    <section className="li-labels">
                        <div className="locationTravelAd">
                            <label className="locationTitle"> Continent: </label>
                            <p>{country.continent}</p>
                        </div>
                        <div className="locationTravelAd">
                            <label className="locationTitle"> Local Situation Rating: </label>
                            <p> {info.score}</p>
                        </div>
                    </section>
                    <p className="linkAdv" onClick={()=>window.open(info.source)}>Click here for Advisory Information</p>
                    <p className="locationTravelAdNotice">Information was updated on {info.updated}</p>
                </div>
            )
        }
    }

    const printForecast = weather.map((each, index) => {
        let daySelected = each.date
        let dayOfWeek = new Date(daySelected).toLocaleString('en-us', {weekday:'long'})
        return(
        <div key={index} className="dayWeather">
            <p>{dayOfWeek}</p>
            <div className="weatherInfo">
                <img src={each.day.condition.icon} alt="weather condition" />
                <p> {each.day.avgtemp_f}°F <br/> {each.day.avgtemp_c}°C</p>
            </div>
            <p>{each.day.condition.text}</p>
        </div>
        )
    })

    const convertTime = (time) => {
        var date = new Date(time);
        return date.toString()
    }

    useEffect(() => {
        getAllInfo(city, coord, country);
    }, [city])
    
    return(
        <div className="locationInfoContainer">
            <h1 className="locationTitle">{city}</h1>
            <div className="locationInfoCard">
                {advisoryPrint(travelAdv)}
            </div>
            <div className="locationInfoCard">
                <h1 className="locationTitle">Weather Forecast</h1>
                <div className="weatherForecast">
                    {printForecast}
                </div>
            </div>
            <div className="locationInfoCard">
                <label className="locationTitle">Local Time: </label>
                <p>{convertTime(currentTime)}</p>
            </div> 
                {/* <div className="detailsCurrency">
                    <h1 className="locationPageText">Currency Exchange</h1>
                        {currencyPrint(currency)}
                </div> */}
            {/* <div className="emergencyServices">
                <p className="locationPageText">Emergency Services</p>
                <p className="locationPageText">{info.emergency_services}</p>
            </div> */}
        </div>
    )
}

export default LocationInfo;

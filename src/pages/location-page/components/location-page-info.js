import axios from "axios";
import React, { useState, useEffect } from "react";

import countryToCurrency from "../../../util/json/country-to-currency.json";
import "./location-page-info.css";

let weatherkey = '18d629f0d66c4d5e831121754202907';
let currencykey = 'cccf995117e0e3e8e23f';

const LocationInfo = ({ city, coord, country }) => {
    const [travelAdv, setTravelAdv] = useState([]);
    const [weather, setWeather] = useState([]);
    const [currentTime, setCurrentTime] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [exCountry, setExCountry] = useState([]);
    const [convertNum, setConvertNum] = useState([]);

    
    const getAllInfo = async (city, coord, country) => {
        if(city.length > 0){
            try {
                let currencyCode;
                for(let cCode in countryToCurrency){
                    if(cCode === country){
                        currencyCode = countryToCurrency[cCode]
                        setExCountry(countryToCurrency[cCode])
                    }
                }
                let exParam = `USD_${currencyCode}`
                let travelAdvisory = await axios.get(`https://www.travel-advisory.info/api?countrycode=${country}`);
                let weather = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherkey}&q=${coord.lat},${coord.lng}&days=7`);
                let currencyex = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_${currencyCode},${currencyCode}_USD&compact=ultra&apiKey=${currencykey}`)
                setTravelAdv(travelAdvisory.data.data[country]);
                setWeather(weather.data.forecast.forecastday);
                setCurrentTime(weather.data.location.localtime);
                setCurrency(currencyex.data[exParam]);
            } catch (error) {
                console.log(error)
            }
        }
    }

    const advisoryPrint = (country) => {
        let info = country.advisory;
        if(info !== undefined){
            return (
                <div>
                    <section className="li-labels">
                        <div className="locationTravelAd">
                            <label className="locationAdExtra"> Continent: </label>
                            <p>{country.continent}</p>
                        </div>
                        <div className="locationTravelAd">
                            <label className="locationAdExtra"> Local Situation Rating: </label>
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
        </div>
        )
    })

    const convertTime = (time) => {
        var date = new Date(time);
        return date.toString()
    }

    const currencyExchange = (rate) => {
        return (
            <div>
                <p>1 USD = {rate} {exCountry}</p>
                <form>
                    <p>USD: <input type="number" onChange={(e) => setConvertNum(e.target.value)}/></p>
                    <p>{exCountry}: {convertNum * rate}</p>
                </form>
            </div>
        )
    }

    useEffect(() => {
        getAllInfo(city, coord, country);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city])
    
    return(
        <div className="locationInfoContainer">
            <div className="locationInfoCardTitle">
                <h1 className="locationTitle">{city}</h1>
            </div>
            <div className="locationInfoScroll">
                <div className="locationInfoCard">
                    <h1 className="locationTitle">Local Time</h1>
                    <p>{convertTime(currentTime)}</p>
                </div> 
                <div className="locationInfoCard">
                    <h1 className="locationTitle">Weather</h1>
                    <div className="weatherForecast">
                        {printForecast}
                    </div>
                </div>
                <div className="locationInfoCard">
                    <h1 className="locationTitle">Advisory</h1>
                    {advisoryPrint(travelAdv)}
                </div>
                <div className="locationInfoCard">
                    <h1 className="locationTitle">Currency</h1>
                    {currencyExchange(currency)}
                </div>
            </div>
        </div>
    )
}

export default LocationInfo;

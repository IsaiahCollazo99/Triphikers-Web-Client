import React, { useState, useEffect} from "react";
// import { createClient } from 'pexels';
// import PopulateLocationSelect from "../helper/populateLocationSelect";
import axios from "axios";
// import { useLoadScript } from '@react-google-maps/api';
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
// require("dotenv").config()

// const {
//     REACT_APP_GOOGLEAPIKEY
// } = process.env;
// const libraries = ["places"];
// const client = createClient('563492ad6f9170000100000153f28b06267f4b548fc99fbb457455db');

const LocationReviews = (id) => {
    return(
        <div>
            
        </div>
    )
}

export default LocationReviews;

//code for SearchBar in case it gets lost
// const [allCountries, setAllCountries] = useState([]);
// const [selectedCountry, setSelectedCountry] = useState('');
// const [city, setCity] = useState([]);
// const [coord, setCoord] = useState([]);
// const [imageRef, setImageRef] = useState([]);
// // const [query, setQuery] = useState([]);

// const {isLoaded, loadError} = useLoadScript({
//     googleMapsApiKey: REACT_APP_GOOGLEAPIKEY,
//     libraries,
// });

// const getPhoto = () => {
//     const query = city;
//     client.photos.search({ query, per_page: 1 }).then(photos => setImageRef(photos.photos[0].src.original));
// }

// const fetchFilters = async () => {
//     try {
//         let countries = await axios.get(`https://restcountries.eu/rest/v2/all`);
//         setAllCountries(countries.data);
//     } catch (error) {
//         console.log(error);
//     }
// }

// const filterCity = (e) => {
//     e.preventDefault();
//     setSelectedCountry(e.target.value);
// }

// const Search = ({ setCity, setCoord, selectedCountry}) => {
//     const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
//         requestOptions: {
//             types: ['(cities)'],
//             componentRestrictions: {country: selectedCountry}
//         }
//     })
//     return(
//         <div className="search">
//             <Combobox onSelect={async (address) => {
//                 setValue(address, false);
//                 clearSuggestions();
//                     try {
//                         const res = await getGeocode({address});
//                         const { lat, lng } = await getLatLng(res[0]);
//                         // let getPlaceID = await axios.get(`http://localhost:3001/api/maps/${address}`);
//                         // let placeID = (getPlaceID.data.placeID.candidates[1].photos[0].photo_reference);
//                         // let images = await axios.get(`http://localhost:3001/api/place/${placeID}`);
//                         // setImageRef(images.data.placeID);
//                         setCity(address);
//                         setCoord({ lat, lng });
//                     } catch(error) {
//                         console.log(error)
//                     }
//                 }}>
//                 <ComboboxInput className="searchInput" value={value} onChange={(e)=>{setValue(e.target.value)
//                 }} disabled={!ready} placeholder="Search A City"/>
//                 <ComboboxPopover>
//                     <ComboboxList>
//                         {status === "OK" && data.map(({description }, index) => <ComboboxOption key={index} value={description} className="searchResults"/>)}
//                     </ComboboxList>
//                 </ComboboxPopover>
//             </Combobox>
//         </div>
//     )
// }

// useEffect(() => {
//     fetchFilters();
//     if(city.length > 0) {
//         getPhoto();
//     }
// }, [city]);

// if(loadError) return "Error loading maps";
// if(!isLoaded) return "Loading maps";

// return (
//     <div>
//         Reviews
//         <select className="selectedCountry" onChange={filterCity}>
//             <option hidden>Select A Country</option>
//             <PopulateLocationSelect list={allCountries}/>
//         </select>
//         {selectedCountry !== '' ? <Search setCity={setCity} setCoord={setCoord} selectedCountry={selectedCountry}/> : null }
//         {imageRef.length > 0 ? <img src={imageRef} alt="cityImage"/> : null }
//     </div>
// )
import React, { useState, useEffect } from "react";
import axios from "axios";
import HotspotMap from "../helper/maps/HotspotMaps";
import { uploadPicture } from "../../util/firebaseFunction";
import "../../css/locations/LocationHotspots.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";

const LocationHotspots = ({ city, coord, country }) => {
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState([]);
    const [submitCoordinates, setSubmitCoordinates] = useState([]);
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [allMarkers, setAllMarkers] = useState([]);
    const [submitted, setSubmitted] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [submitHotspotTitle, setSubmitHotspotTitle] = useState("");
    const [submitHotspotBody, setSubmitHotspotBody] = useState("");

    const fetchData = (data) => {
        setSubmitCoordinates(data.coordinates);
        setSelectedHotspot(data.selected);
        fetchUserName(data.selected.poster_id);
    }

    const fetchUserName = async (id) =>{
        try {
            let name = await axios.get(`http://localhost:3001/api/users/${id}`);
            let nameSplit = name.data.user.full_name.split(" ")[0]
            setUserName(nameSplit);
            //want to redirect page when clicking on the usernames name that submitted a photo
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMarkers = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/api/hotspots`);
            setAllMarkers(res.data.hotspots)
        } catch (error) {
            console.log(error)
        }
    }

    const getMap = (lat, lng) => {
        if(lat !== undefined){
            let coordinates = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
            return(
                <HotspotMap location={coordinates} fetchData={fetchData} allMarkers={allMarkers}/>
            )
        }
    }

    
    const createSubmissionRequest = async (data) => {
        debugger
        const submission = {
            lat: submitCoordinates.lat,
            lng: submitCoordinates.lng,
            hotspot_title: submitHotspotTitle,
            body: submitHotspotBody,
            image: data.url,
            poster_id: currentUser.id
        }
        await axios.post(`http://localhost:3001/api/hotspots`, submission);
        setSubmitted(true);
        setSubmitCoordinates([]);
        setSubmitHotspotTitle("");
        setSubmitHotspotBody("");
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            uploadPicture(`hotspots/${submitHotspotTitle}/`, {id: currentUser.id, file: imageFile}, createSubmissionRequest);
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleFileChange = (e) => {
        e.preventDefault();
        setImageFile( e.target.files[0] )
    }

    const handleTitleChange = (e) => {
        setSubmitHotspotTitle(e.currentTarget.value);
    }

    const handleBodyChange = (e) => {
        setSubmitHotspotBody(e.currentTarget.value);
    }

    useEffect(() => {
        fetchMarkers();   
    }, [submitted])

    return (
        <div className="hotSpotContainer">
            <div className="hotSpotMap">
                {getMap(coord.lat, coord.lng)}
            </div>
            <div className="formWithSelect">
                <form className="hotSpotForm" onSubmit={handleSubmit}>
                    <h1 className="hotSpotTitle">Hotspot Submission</h1>
                    <p className="submitLat"><b>Latitude:</b> {submitCoordinates.lat}</p>
                    <p className="submitLng"><b>Longitude:</b> {submitCoordinates.lng}</p>
                    <input type="text" placeholder="Hotspot Title" value={submitHotspotTitle}  onChange={handleTitleChange}/>
                    <input type="text" placeholder="Type a Description" value={submitHotspotBody} onChange={handleBodyChange}/>
                    <input type="file" onChange={handleFileChange}/>
                    <input type="submit"/>
                    {submitted ? (
                        <div className="disappear">
                            <p className="success">Submission Complete</p>
                        </div>
                    ): null}
                </form>
                {selectedHotspot ? (
                    <div className="Selected">
                        <h1 className="hotSpotSelectedTitle">Selected Hotspot</h1>
                        <p className="submitLat"><b>Latitude:</b> {selectedHotspot.lat}</p>
                        <p className="submitLat"><b>Longitude:</b> {selectedHotspot.lng}</p>
                        <h2><b>Title:</b> {selectedHotspot.hotspot_title}</h2>
                        <p><b>Description:</b> {selectedHotspot.body}</p>
                        <img src={selectedHotspot.image} alt="hotspotImage"/>
                        <p><b>Submitted By:</b> {userName}</p>
                        <p className="directions" onClick={() => window.open( `https://www.google.com/maps/dir/?api=1&destination=${selectedHotspot.lat}/${selectedHotspot.lng}&travelmode=driving`)}><b>Click Here for Directions</b></p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default LocationHotspots;
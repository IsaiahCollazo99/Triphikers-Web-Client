import React, { useState, useEffect } from "react";
import axios from "axios";
import HotspotMap from "../helper/maps/HotspotMaps";
import { uploadPicture } from "../../util/firebaseFunction";
import "../../css/locations/LocationHotspots.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
let mapReset = 0;

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
    const [charCount, setCharCount] = useState(170);

    const fetchData = (data) => {
        setSubmitCoordinates(data.coordinates);
        setSelectedHotspot(data.selected);
        if(data.selected !== null){
            fetchUserName(data.selected.poster_id);
        }
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
                <HotspotMap location={coordinates} fetchData={fetchData} allMarkers={allMarkers} key={mapReset}/>
            )
        }
    }

    
    const createSubmissionRequest = async (data) => {
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
        const description = e.currentTarget.value;
        const deletedLength = submitHotspotBody.length - description.length;
        const addedLength = description.length - submitHotspotBody.length;

        if(description.length < submitHotspotBody.length) {
            setCharCount(charCount + deletedLength);
        } else if(description.length > submitHotspotBody.length) {
            setCharCount(charCount - addedLength);
        }

        setSubmitHotspotBody(description);
    }

    useEffect(() => {
        fetchMarkers();   
    }, [submitted])

    const getFormDisplay = selectedHotspot ? {display: "none"} : {display: "flex"};

    const resetSelected = () => {
        setSelectedHotspot(null);
        mapReset++;
    }

    return (
        <div className="hotSpotContainer">
            <div className="mapTitleContainer">
                <h1 className="mapTitle">Hotspots Map <span role="img" aria-label="pin">📍</span></h1>
                <p>Submit your own Hotspot photo below!</p>
            </div>
            <div className="mapAndInfoContainer">
                <div className="hotSpotMap">
                    {getMap(coord.lat, coord.lng)}
                </div>

                <form className="hotSpotForm" onSubmit={handleSubmit} style={getFormDisplay}>
                    <h1>Hotspot Submission</h1>

                    <div className="submitCoords">
                        <p><b>Latitude:</b> {submitCoordinates.lat}</p>
                        <p><b>Longitude:</b> {submitCoordinates.lng}</p>
                    </div>

                    <label htmlFor="title">Hotspot Name: </label>
                    <input type="text" placeholder="Hotspot Name" value={submitHotspotTitle}  onChange={handleTitleChange} name="title" required />

                    <label htmlFor="desc">Description: ({charCount} remaining) </label>
                    <textarea placeholder="Type a Description" value={submitHotspotBody} onChange={handleBodyChange} name="desc" required cols="25" rows="5" maxLength="170" />

                    <label htmlFor="pic">Picture: (optional) </label>
                    <input type="file" onChange={handleFileChange} name="pic" />

                    <input type="submit"/>
                    {submitted ? (
                        <div className="disappear">
                            <p className="success">Submission Complete</p>
                        </div>
                    ): null}
                </form>

                {selectedHotspot ? (
                    <div className="selected">
                        <div className="selectedDesc">
                            <div className="selectedTitleDiv">
                                <h1 className="selectedTitle">{selectedHotspot.hotspot_title} </h1>
                                <p className="removeSelectedHotSpot" onClick={resetSelected}>X</p>
                            </div>
                            <label>Description:</label>
                            <p>{selectedHotspot.body}</p>
                            <p><b>Submitted By:</b> {userName}</p>
                            <p className="directions" onClick={() => window.open( `https://www.google.com/maps/dir/?api=1&destination=${selectedHotspot.lat}/${selectedHotspot.lng}&travelmode=driving`)}><b>Click Here for Directions</b></p>
                        </div>
                        <div className="selectedImg">
                            <img className="hotSpotImage" src={selectedHotspot.image} alt="hotspotImage"/>
                        </div>
                    </div>
                ) : null}

            </div>
        </div>
    )
}

export default LocationHotspots;
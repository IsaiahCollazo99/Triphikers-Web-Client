import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useInput } from "../../util/customHooks";
import HotspotMap from "../helper/maps/HotspotMaps";
import "../../css/locations/LocationHotspots.css";

const LocationHotspots = ({info}) => {
    const [submitCoordinates, setSubmitCoordinates] = useState([]);
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [allMarkers, setAllMarkers] = useState([]);
    const [submitted, setSubmitted] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [submitHotspotTitle, setSubmitHotspotTitle] = useState("");
    const [submitHotspotBody, setSubmitHotspotBody] = useState("");
    // const submitHotspotTitle = useInput("");
    //create an input state instead and handle change for title and body
    // const submitHotspotBody = useInput("");

    const fetchData = (data) => {
        setSubmitCoordinates(data.coordinates);
        setSelectedHotspot(data.selected);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/api/hotspots`, {
                lat: submitCoordinates.lat,
                lng: submitCoordinates.lng,
                hotspot_title: submitHotspotTitle,
                body: submitHotspotBody,
                image: imageFile,
                poster_id: 1
            })
            setSubmitCoordinates([]);
            setSubmitHotspotTitle("");
            setSubmitHotspotBody("");
            setSubmitted(true);
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = (e) => {
        debugger
        e.preventDefault();
        setImageFile({ selectedFile: e.target.files[0] })
    }

    const handleTitleChange = (e) => {
        setSubmitHotspotTitle(e.currentTarget.value);
    }

    const handleBodyChange = (e) => {
        setSubmitHotspotBody(e.currentTarget.value);
    }

    //coming back to this, may directly upload image without submission button
    // const uploadHandler = async () => {
    //     try {
    //        await 
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        fetchMarkers();
        
    }, [submitted])

    return (
        <div className="hotSpotContainer">
            <div className="hotSpotMap">
                {getMap(info.lat, info.lng)}
            </div>
            <div className="formWithSelect">
                <form className="hotSpotForm" onSubmit={handleSubmit}>
                    <h1 className="hotSpotTitle">Hotspot Submission</h1>
                    <p className="submitLat"><b>Latitude:</b> {submitCoordinates.lat}</p>
                    <p className="submitLng"><b>Longitude:</b> {submitCoordinates.lng}</p>
                    <input type="text" placeholder="Hotspot Title" value={submitHotspotTitle}  onChange={handleTitleChange}/>
                    <input type="text" placeholder="Type a Description" value={submitHotspotBody} onChange={handleBodyChange}/>
                    {/* <input type="file" onChange={handleFileChange}/> */}
                    {/* <button onClick={uploadHandler}>Upload!</button> */}
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
                        <p><b>Submitted By:</b> {selectedHotspot.poster_id}</p>
                        <p className="directions" onClick={() => window.open( `https://www.google.com/maps/dir/?api=1&destination=${selectedHotspot.lat}/${selectedHotspot.lng}&travelmode=driving`)}><b>Click Here for Directions</b></p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default LocationHotspots;
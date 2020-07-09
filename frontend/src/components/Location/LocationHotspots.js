import React, { useState } from "react";
import "../../css/locations/LocationHotspots.css";

const LocationHotspots = ({id}) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <div className="hotSpotContainer">
            <div className={`hotSpotModal modalShowing-${modal}`}>
                Modal
            </div>
            <button onClick={toggleModal}>Submit a Hotspot</button>
        </div>
    )
}

export default LocationHotspots;
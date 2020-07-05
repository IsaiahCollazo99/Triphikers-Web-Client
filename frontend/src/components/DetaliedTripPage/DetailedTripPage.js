import React from 'react';
import { useParams } from 'react-router-dom';

const DetailedTripPage = () => {
    const { id } = useParams();
    
    return (
        <div className="detailedTripContainer">
            {id}
        </div>
    )
}

export default DetailedTripPage;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from '../../util/customHooks';
// import CreateSignupForm1 from './CreateSignupForm1';
// import CreateSignupForm2 from './CreateSignupForm2';



const CreateSignUpContainer = () => {
    const history = useHistory();
    
    //const [ page, setPage ] = useState(1);
    // const destination = useInput("");
    // const dateFrom = useInput("");
    // const dateTo = useInput("");
    // const groupType = useInput("");
    // const language = useInput("");
    // const meetup = useInput("");
    // const tripType = useInput("");
    // const title = useInput("");
    // const accommodation = useInput("");
    // const budget = useInput("");
    // const split = useInput("");
    // const itinerary = useInput("");
    // const description = useInput("");

    // const handlePageChange = () => {
    //     page === 1 ? setPage(2) : setPage(1);
    // }

    // const pageOne = {
    //     destination,
    //     dateFrom,
    //     dateTo,
    //     groupType,
    //     language,
    //     meetup,
    //     tripType
    // }

    // const pageTwo = {
    //     title,
    //     accommodation,
    //     budget,
    //     split,
    //     itinerary,
    //     description,
    // }

    // const handleSubmit = async ( e ) => {
    //     e.preventDefault();
    //     await createTrip({...pageOne, ...pageTwo});
    //     history.push("/trips");
    // }

    // const formPageDisplay = page === 1 ? 
    //     <CreateTripForm1 {...pageOne} handlePageChange={handlePageChange} /> :
    //     <CreateTripForm2 {...pageTwo} handlePageChange={handlePageChange} handleSubmit={handleSubmit}/>
    
    // return (
    //     <div className="createTripsContainer">
    //         {formPageDisplay}
    //     </div>
    // )
}

export default CreateSignUpContainer;
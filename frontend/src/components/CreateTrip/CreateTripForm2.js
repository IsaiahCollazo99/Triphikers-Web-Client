import React from 'react';
import { Button } from '@material-ui/core';
import CustomTextField from '../General/CustomTextField';
import '../../css/createTrip/createTripForms.css';

const CreateTripForm2 = ( props ) => {
    const {
        title,
        accommodation,
        itinerary,
        description,
        handlePageChange,
        handleSubmit,
        postError
    } = props

    
    return (
        <>
        <header>
            <h1>Create a Trip</h1>
            <h3>2/2</h3>
        </header>
        <form onSubmit={handleSubmit} className="createTrip2">
            <CustomTextField
                label="Title"
                type="text"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                    required: false
                }}
                placeholder="Enter a title"
                required
                helperText="Create an eye catching title"
                fullWidth
                {...title}
            />

            <CustomTextField 
                label="Accomodation"
                select
                variant="outlined"
                helperText="Where do you plan on staying?"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                    required: false
                }}
                {...accommodation}
                required
            >
                <option value="" disabled>Select an Accommodation</option>
                <option value="Camping">Camping</option>
                <option value="Couchsurf">CouchSurf</option>
                <option value="Home">Home</option>
                <option value="Hotel">Hotel</option>
                <option value="Hostel">Hostel</option>
                <option value="Other">Other</option>
            </CustomTextField>

            <CustomTextField
                label="Itinerary"
                variant="outlined"
                select
                helperText="How strict of an itinerary do you have?"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                    required: false
                }}
                {...itinerary}
                required
            >
                <option value="" disabled>Select An Itinerary Type</option>
                <option value="Set">Set</option>
                <option value="Flexible">Flexible</option>
                <option value="None">None</option>
            </CustomTextField>

            <CustomTextField
                label="Description"
                multiline
                rows={4}
                placeholder="Trip Description"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                    required: false
                }}
                {...description}
                helperText="Write a short description about your trip and plans"
                className="createTripDesc"
                style={{width: "60%"}}
            />

            <div className="buttons">
                <Button onClick={handlePageChange} variant="outlined" color="primary">Back</Button>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </div>
        </form>
        {postError}
        </>
    )
}

export default CreateTripForm2;

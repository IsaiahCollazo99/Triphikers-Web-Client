import React, { useState, useContext, useEffect } from 'react';
import '../../css/createTrip/createTripForms.css';
import CreateTripDestination from './CreateTripDestination';
import LanguageSelect from '../General/LanguageSelect';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById } from '../../util/apiCalls/getRequests';
import { Button } from '@material-ui/core';
import CustomTextField from "../General/CustomTextField";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import "../../css/createTrip/CreateTripForm1.css";
const CreateTripForm1 = ( props ) => {
    const [ error, setError ] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [ userGender, setUserGender ] = useState(null);

    const {
        destination, 
        dateFrom, 
        dateTo, 
        groupType, 
        language, 
        budget,
        split,
        tripType,
        handlePageChange
    } = props;

    const getUserGender = async () => {
        try {
            const data = await getUserById(currentUser.id);
            setUserGender(data.user.gender);
        } catch ( error ) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserGender();
    })

    const isValidDate = () => {
        const today = new Date();
        const dateFromDate = new Date(dateFrom.value);
        const dateToDate = new Date(dateTo.value);

        if(today.getTime() >= dateToDate.getTime()) {
            setError("Date To must be after today's date");
            return false;
        } else if(dateToDate.getTime() <= dateFromDate.getTime()) {
            setError("Date To must be after the Date From");
            return false;
        }
        setError(null);

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidDate()) {
            handlePageChange();
        }
    }

    const getGroupTypeOptions = () => {
        if(userGender === 'Male') {
            return <option value="Only Men">Men Only</option>
        } else if(userGender === 'Female') {
            return <option value="Only Women">Women Only</option>
        } else if (userGender === 'Non-Binary') {
            return <option value="Only Non-Binary">Non-Binary Only</option>
        } else {
            return null;
        }
    }

    return (
			<>
				<header>
                    
                <h1>Create a Trip</h1>
					<div>
						<FiberManualRecordIcon className="circle1" />
						<RadioButtonUncheckedIcon className="circle2" />
					</div>
				</header>
				<form onSubmit={handleSubmit} className="createTrip1">
					<CreateTripDestination destination={destination} />

					<section className="createTripDates">
						<CustomTextField
							label="Date From"
							type="date"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
								required: false,
							}}
							required
							helperText={"When will your trip begin?"}
							fullWidth
							{...dateFrom}
						/>

						<CustomTextField
							label="Date To"
							type="date"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
								required: false,
							}}
							required
							helperText={error ? error : "When will your trip end?"}
							error={error ? true : false}
							fullWidth
							{...dateTo}
						/>
					</section>

					<section className="ct-budgets">
						<CustomTextField
							label="Budget"
							variant="outlined"
							select
							helperText="What is your budget for the trip?"
							SelectProps={{
								native: true,
							}}
							InputLabelProps={{
								shrink: true,
								required: false,
							}}
							{...budget}
							required
						>
							<option value="" disabled>
								Select Your Budget
							</option>
							<option value="Budget ($0 - $999)">Budget ($0 - $999)</option>
							<option value="Average ($1000 - $1999)">
								Average ($1000 - $1999)
							</option>
							<option value="Luxury ($2000+)">Luxury ($2000+)</option>
						</CustomTextField>

						<CustomTextField
							label="Split Costs"
							variant="outlined"
							select
							helperText="Split costs with other travelers?"
							SelectProps={{
								native: true,
							}}
							InputLabelProps={{
								shrink: true,
								required: false,
							}}
							{...split}
							required
						>
							<option value="" disabled>
								Split Costs?
							</option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>
						</CustomTextField>
					</section>

					<CustomTextField
						label="Group Type"
						variant="outlined"
						select
						helperText="Who would you like to travel with?"
						SelectProps={{
							native: true,
						}}
						InputLabelProps={{
							shrink: true,
							required: false,
						}}
						{...groupType}
						required
					>
						<option value="" disabled>
							Select a Group Type
						</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						{getGroupTypeOptions()}
						<option value="Any">Any</option>
					</CustomTextField>

					<CustomTextField
						label="Language"
						variant="outlined"
						select
						helperText="What language will you speak?"
						SelectProps={{
							native: true,
						}}
						InputLabelProps={{
							shrink: true,
							required: false,
						}}
						{...language}
						required
					>
						<LanguageSelect input={language} />
					</CustomTextField>

					<CustomTextField
						label="Trip Type"
						variant="outlined"
						select
						helperText="How do you want to spend your time?"
						SelectProps={{
							native: true,
						}}
						InputLabelProps={{
							shrink: true,
							required: false,
						}}
						{...tripType}
						required
					>
						<option value="" disabled>
							Select a Trip Type
						</option>
						<option value="Explore Cities">Explore Cities</option>
						<option value="Airport Layovers">Airport Layovers</option>
						<option value="Road Trip">Road Trip</option>
						<option value="Backpacking">Backpacking</option>
						<option value="Other">Other</option>
					</CustomTextField>

					<Button type="submit" variant="contained" color="primary">
						Next Page
					</Button>
				</form>
			</>
		);
}

export default CreateTripForm1;
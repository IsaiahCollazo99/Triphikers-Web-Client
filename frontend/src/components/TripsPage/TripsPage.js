import React, { useEffect, useState, useContext } from 'react';
import { getAllTrips, getUserById } from '../../util/apiCalls/getRequests';
import TripCard from '../General/TripCard';
import '../../css/tripsPage/tripsPage.css';
import TripsPageFilter from './TripsPageFilter';
import { AuthContext } from '../../providers/AuthContext';
import { useScrollTrigger, Zoom, Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
	},
}));

const ScrollToTop = ({ children }) => {
	const classes = useStyles();

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = ( e ) => {
		const anchor = document.querySelector('#back-to-top-anchor');
	
		if(anchor) {
		  anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};
	
	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

const TripsPage = ( props ) => {
    const [ trips, setTrips ] = useState([]);
    const [ filteredTrips, setFilteredTrips ] = useState([]);
    const [ response, setResponse ] = useState(null);
    const [ user, setUser ] = useState({});
    const { currentUser } = useContext(AuthContext);
    
    const getTripsCall = async () => {
        try {
            const { trips: allTrips } = await getAllTrips();

            if(!allTrips.length) {
                setResponse(<p className="error">No Trips Found</p>);

            } else if(filteredTrips.length) {
                setFilteredTrips([]);
                setTrips(allTrips);

            } else {
                setTrips(allTrips);
            }

        } catch (error) {
            setTrips([]);
            if(error.response) {
                const { response: { data: { error: errorText }}} = error;
                setResponse(<p className="error">{errorText}</p>)
            }
            console.log(error);
        }
    }

    const filterArr = ( arr, filterValue, key ) => {
        return arr.filter(el => {
            const tripValue = el[key];
            return tripValue.toLowerCase().includes(filterValue.toLowerCase()) && isValidTrip(el);
        })
    }

    const filterTrips = ( filter = {}, userFilter ) => {
        let filterResult = [];

        for(let key in filter) {
            const filterValue = filter[key];
            if(filterValue && filterValue !== "none") {
                filterResult = filterArr(trips, filterValue, key);
            }
        }
        
        if(filterResult.length && userFilter) {
            setResponse(<p className="success">Filtered Trips.</p>);
            setFilteredTrips(filterResult);
        } else if(!filterResult.length && userFilter) {
            setFilteredTrips([]);
            setResponse(<p className="error">No Trips Found</p>);
        } else {
            setFilteredTrips([]);
            setResponse(null);
        }
    }

    const getCurrentUser = async () => {
        // debugger
        try {
            let data = await getUserById(currentUser.id);
            // while(!data) {
            //     data = await getUserById(currentUser.id);
            // }
            setUser(data.user);
        } catch ( error ) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getTripsCall();
        getCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isTripExpired = ( trip ) => {
        const currentDate = new Date();
        const tripDateTo = new Date(trip.date_to);
        const currentTime = currentDate.getTime();
        const dateToTime = tripDateTo.getTime();
        return currentTime > dateToTime;
    }

    const isUserMale = () => user.gender === "Male";
    const isUserFemale = () => user.gender === "Female";
    const isUserNonBinary = () => user.gender === "Non-Binary";

    const isValidGroupType = ( trip ) => {
        if(isUserMale()) {
            return trip.group_type !== "Only Women" && trip.group_type !== "Only Non-Binary";
        } else if(isUserFemale()) {
            return trip.group_type !== "Only Men" && trip.group_type !== "Only Non-Binary";
        } else if(isUserNonBinary()) {
            return trip.group_type !== "Only Men" && trip.group_type !== "Only Women";
        }
    }

    const isValidTrip = ( trip ) => {
        return !trip.is_completed && !isTripExpired(trip) && isValidGroupType(trip)
    }

    const getTripsList = ( tripsArr ) => {
        const validTrips = [];
        tripsArr.forEach(trip => {
            if(isValidTrip(trip)) {
                validTrips.push(
                    <TripCard trip={trip} refresh={getTripsCall} key={trip.id} />
                )
            }
        })

        return validTrips
    }

    let tripsList;
    if(filteredTrips.length) {
        tripsList = getTripsList(filteredTrips);
    } else if(trips.length) {
        tripsList = getTripsList(trips);
    } else {
        tripsList = <p className="error">No Trips Found</p>
    }
    
    return (
        <div className="tripsPage">

            <section className="tp-feedManager">
                <TripsPageFilter filterTrips={filterTrips} getTripsCall={getTripsCall} />
            </section>

            <section className="tripsPageFeed">
                {response}
                {tripsList}
            </section>

            <ScrollToTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top" className="fabToTop">
                <KeyboardArrowUp />
            </Fab>
            </ScrollToTop>
        </div>
    )
}

export default TripsPage;
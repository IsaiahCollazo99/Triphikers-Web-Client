import React, { useEffect, useState, useContext } from 'react';
import { getAllTrips } from '../../util/apiCalls/getRequests';
import TripCard from '../custom-components/trip-card';
import '../../css/tripsPage/tripsPage.css';
import TripsPageFilter from './trips-page-filter';
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
    const { currentUser } = useContext(AuthContext);
    
    const getTripsCall = async () => {
        try {
            const { trips: allTrips } = await getAllTrips( currentUser.id );
            allTrips.length ? setTrips(allTrips) : setResponse(<p className="error">No Trips Found</p>);

        } catch (error) {
            setTrips([]);
            if(error.response) {
                const { response: { data: { error: errorText }}} = error;
                setResponse(<p className="error">{errorText}</p>)
            }
            console.log(error);
        }
    }

    useEffect(() => {
        getTripsCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /** 
     * Creates an array of trips filtered by the users choice
     * @param {Object} filter - List of filter values
     * @param {boolean} isFiltered - Handles what the FilteredTrips state becomes ( empty array if false, filtered array if true )
    */
        
    const filterTrips = ( filter = {}, isFiltered ) => {
        let filterResult = [];

        for(let key in filter) {
            const filterValue = filter[key];
            if(filterValue && filterValue !== "none") {
                filterResult = filterArr(trips, filterValue, key);
            }
        }
        
        if(filterResult.length && isFiltered) {
            setResponse(<p className="success">Filtered Trips.</p>);
            setFilteredTrips(filterResult);
        } else if(!filterResult.length && isFiltered) {
            setFilteredTrips([]);
            setResponse(<p className="error">No Trips Found</p>);
        } else {
            setFilteredTrips([]);
            setResponse(null);
        }
    }

    const filterArr = ( arr, filterValue, key ) => {
        return arr.filter(el => {
            const tripValue = el[key];
            return tripValue.toLowerCase().includes(filterValue.toLowerCase());
        })
    }

    const tripsMap = ( tripsArr ) => {
        return tripsArr.map(trip => (
            <TripCard trip={trip} refresh={getTripsCall} key={trip.id} />
        ))
    }
    
    return (
        <div className="tripsPage">
            <section className="tp-feedManager">
                <TripsPageFilter filterTrips={filterTrips} getTripsCall={getTripsCall} />
            </section>

            <section className="tripsPageFeed">
                {response}
                {filteredTrips.length ? tripsMap(filteredTrips) : tripsMap(trips)}
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
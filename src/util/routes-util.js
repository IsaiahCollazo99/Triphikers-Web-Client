import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../providers/auth-context';

export const AuthRoute = ( { children, ...rest } ) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route 
            {...rest}
            render={( { location } ) => {
                return !currentUser ? children : <Redirect to="/trips" />
            }}
        />

    )
}


export const ProtectedRoute = ( { children, ...rest } ) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route 
            {...rest}
            render={( { location } ) => {
                return currentUser ? children : <Redirect to="/" />
            }}
        />

    )
}

export const ProtectedUserRoute = ( { children, ...rest } ) => {
    const { currentUser } = useContext(AuthContext);
    const { trip, userId } = rest;

    let idCheck;
    if(trip) idCheck = trip.planner_id;
    else if(userId) idCheck = userId;

    let redirect;
    if(trip) redirect = `/trips/${trip.id}`;
    else if(userId) redirect = `/user/${userId}`;
    
    return (
        <Route 
            {...rest}
            render={( { location } ) => {
                if(currentUser.id === idCheck) {
                    return children 
                } else {
                    return (
                        <Redirect to={redirect} />
                    )
                }
            }}
        />
    )
}
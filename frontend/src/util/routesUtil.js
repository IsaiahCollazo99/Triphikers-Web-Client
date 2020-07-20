import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';

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
                return currentUser ? children : <Redirect to="/signUp" />
            }}
        />

    )
}

export const ProtectedUserRoute = ( { children, ...rest } ) => {
    const { currentUser } = useContext(AuthContext);
    const { trip } = rest;

    return (
        <Route 
            {...rest}
            render={( { location } ) => {
                if(currentUser.id === trip.planner_id) {
                    return children 
                } else {
                    return (
                        <Redirect to={`/trips/${trip.id}`} />
                    )
                }
            }}
        />
    )
}
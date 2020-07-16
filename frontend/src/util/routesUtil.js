import React, { useContext } from 'react';
import { Route, Redirect, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';

export const AuthRoute = ( { children, ...rest } ) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route 
            {...rest}
            render={( { location } ) => {
                return !currentUser ? children : <Redirect from={location} to="/trips" />
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
                return currentUser ? children : <Redirect from={location} to="/signUp" />
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
                if(currentUser.id === trip.id) {
                    return children 
                } else {
                    return (
                        <Redirect from={location} to="/trips" />
                    )
                }
            }}
        />
    )
}
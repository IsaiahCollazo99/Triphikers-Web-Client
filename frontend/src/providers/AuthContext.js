import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
import { getFirebaseIdToken } from '../util/firebaseFunction';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const updateUser = async ( user ) => {
        try {
            if(user) {
                // Add a time checker. Throw an error if it's taking too long
                const { uid: id, email, displayName: username } = user;
                setCurrentUser({id, email, username});
                const token = await getFirebaseIdToken()
                setToken(token);
                setLoading(false);
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        } catch(error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(updateUser)
        return unsubscribe;
    }, [])

    if(loading) return <div className="loading">Loading...</div>
    return (
        <AuthContext.Provider value={{currentUser, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
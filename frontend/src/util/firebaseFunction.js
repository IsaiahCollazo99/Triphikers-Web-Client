import firebase from '../firebase';
import { storage } from 'firebase';

firebase.auth().useDeviceLanguage();

export const logout = () => firebase.auth().signOut();

export const login = (email, password) => {
	return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const signUp = (email, password) => {
	return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const signUpWithGoogle = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        return result;
    } catch (error) {
        throw error;
    }
}

export const signUpWithFacebook = async () => {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        const result = await firebase.auth().signInWithPopup(provider);
        return result;
    } catch (error) {
        throw error;
    }
}

export const signUpWithTwitter = async () => {
    try {
        const provider = new firebase.auth.TwitterAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getFirebaseIdToken = () => {
	return firebase.auth().currentUser.getIdToken(false);
}

export const uploadPicture = async ( folderPath, data, callback ) => {
    const now = new Date().toString();
    let storageRef = storage().ref(folderPath + now);
    let upload = storageRef.put(data.file);

    await upload.on('state_changed', snapshot => {
		
    }, error => {
        console.log(error);
        throw error;
    },async () => {
        const image = await upload.snapshot.ref.getDownloadURL();
        await callback({id: data.id, url: image});
    })
}
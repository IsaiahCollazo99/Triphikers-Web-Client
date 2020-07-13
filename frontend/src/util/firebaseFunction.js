import firebase from "../firebase";
import { storage } from 'firebase';

export const logout = () => firebase.auth().signOut();

export const login = (email, password) => {
	return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const signUp = (email, password) => {
	return firebase.auth().createUserWithEmailAndPassword(email, password);
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
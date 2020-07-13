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
    const userImg = data.image ? data.image : data;
    let storageRef = storage().ref(folderPath + userImg.name);
    let upload = storageRef.put(userImg);

    await upload.on('state_changed', snapshot => {
		
    }, error => {
        console.log(error);
        throw error;
    },async () => {
        const image = await upload.snapshot.ref.getDownloadURL();
        await callback({id: data.id, url: image});
    })
}
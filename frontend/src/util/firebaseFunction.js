import firebase from "../firebase";
import { storage } from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
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
        await firebase.auth().signInWithRedirect(provider);
        const result = await firebase.auth().getRedirectResult()
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
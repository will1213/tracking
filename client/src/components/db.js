import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const serviceAccount = require("../serviceAccountKey.json");
firebase.initializeApp(serviceAccount);
export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase

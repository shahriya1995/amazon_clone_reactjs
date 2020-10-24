// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDQ5dGxRm_gBJVG22IMwOoOOBShFfXRA7Q",
    authDomain: "clone-6afbf.firebaseapp.com",
    databaseURL: "https://clone-6afbf.firebaseio.com",
    projectId: "clone-6afbf",
    storageBucket: "clone-6afbf.appspot.com",
    messagingSenderId: "900330950472",
    appId: "1:900330950472:web:d47a8fe3463c225474ed7d",
    measurementId: "G-LP4HT6E30D"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth};

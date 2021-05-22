import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDG8ln3M_AiH6XRaAgT6gNeEHM-biPlO9I",
    authDomain: "is-tp2-84cca.firebaseapp.com",
    databaseURL: "https://is-tp2-84cca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "is-tp2-84cca",
    storageBucket: "is-tp2-84cca.appspot.com",
    messagingSenderId: "511871924939",
    appId: "1:511871924939:web:3680e3f8a75931fa70794e",
    measurementId: "G-9L852TTKZD",
};

const initFirebase = () => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
};

initFirebase();

export const auth = firebase.auth();
export { firebase };

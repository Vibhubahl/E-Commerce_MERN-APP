import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA72CzMg5gDCvrjInBPgGtNkoePj4ghSNI",
    authDomain: "e-commerce-9e46a.firebaseapp.com",
    projectId: "e-commerce-9e46a",
    storageBucket: "e-commerce-9e46a.appspot.com",
    messagingSenderId: "337119311318",
    appId: "1:337119311318:web:955f0a6afe3305ed966077"
  };

  firebase.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

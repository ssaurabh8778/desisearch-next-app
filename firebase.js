import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCD5XHQpDEOKUiMiBOn6TU6Bt294dSEm8k",
  authDomain: "clone1-3b7df.firebaseapp.com",
  databaseURL: "https://clone1-3b7df.firebaseio.com",
  projectId: "amazon-clone1",
  storageBucket: "amazon-clone1.appspot.com",
  messagingSenderId: "305084080168",
  appId: "1:305084080168:web:34542b4cb802e3ed0d551d",
};

// Check if Firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export { firestore };

import firebase from "firebase/app"
import storage from "firebase/storage"

var config = {
    apiKey: "AIzaSyAttIVmROFZ8uBxiHQEoqXJrDO8FH-A6eQ",
    authDomain: "land-ocean-76341.firebaseapp.com",
    databaseURL: "https://land-ocean-76341.firebaseio.com",
    projectId: "land-ocean-76341",
    storageBucket: "land-ocean-76341.appspot.com",
    messagingSenderId: "92845425666"
};
firebase.initializeApp(config);

let storage = firebase.storage()

let storageRef = storage.ref()

let spaceRef = storageRef.child("Users/Alex/workspace/react-nutshell-shadowlyn/src/components/firebase/test.jpg")

console.log(spaceRef)

export default spaceRef
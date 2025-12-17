import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDi3xZ3-8591HTDoi7IhB-SpreAxU967ok",
    authDomain: "tasty-recipe-timedoor.firebaseapp.com",
    databaseURL: "https://tasty-recipe-timedoor-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tasty-recipe-timedoor",
    storageBucket: "tasty-recipe-timedoor.firebasestorage.app",
    messagingSenderId: "879243509574",
    appId: "1:879243509574:web:3049d66797c6398e7daf47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
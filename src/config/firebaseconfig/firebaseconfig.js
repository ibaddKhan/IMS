import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyBYoEpDB4WnDNsHQefGs_qBHKkyz19ArMM",
    authDomain: "practice-adc61.firebaseapp.com",
    projectId: "practice-adc61",
    storageBucket: "practice-adc61.appspot.com",
    messagingSenderId: "892450035636",
    appId: "1:892450035636:web:e31731d749d3ca658e84e1"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const storage = getStorage(app);
  export const db = getFirestore(app);
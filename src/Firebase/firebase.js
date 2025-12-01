import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBUAAQJtPdQ0oBuQMNiKd8jOQnfM3Dmsn8",
  authDomain: "konvo-kunal.firebaseapp.com",
  databaseURL: "https://konvo-kunal-default-rtdb.firebaseio.com",
  projectId: "konvo-kunal",
  messagingSenderId: "583752961105",
  appId: "1:583752961105:web:ab5e0d63bd2a0fbf013c70",
  measurementId: "G-D4BEDSJWS3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

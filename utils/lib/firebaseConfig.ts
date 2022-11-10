import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "akara-marketplace.firebaseapp.com",
  projectId: "akara-marketplace",
  storageBucket: "akara-marketplace.appspot.com",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-84YB6P6SDZ",
};
const firebase = initializeApp(firebaseConfig);

export const storage = getStorage(firebase);

export default firebase;

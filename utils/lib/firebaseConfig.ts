import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM3fYIVpP6bfYNP2-DtvlQOf1kIcTLj2A",
  authDomain: "test-a7f23.firebaseapp.com",
  projectId: "test-a7f23",
  storageBucket: "test-a7f23.appspot.com",
  messagingSenderId: "579273705034",
  appId: "1:579273705034:web:c071c32edb9d425ffa08b3",
};
const firebase = initializeApp(firebaseConfig);

export const storage = getStorage(firebase);

export default firebase;

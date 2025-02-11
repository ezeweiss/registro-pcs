import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAd3NwOwqo5uP2cyl2bEEsJ8gCcC_u-jJs",
    authDomain: "compus-fava.firebaseapp.com",
    projectId: "compus-fava",
    storageBucket: "compus-fava.firebasestorage.app",
    messagingSenderId: "713028675454",
    appId: "1:713028675454:web:63694a823495652258b52f",
    measurementId: "G-NXCFKPM346"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

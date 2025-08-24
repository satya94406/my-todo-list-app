import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0rTtFMTXr5361OtIH3IU2-HuhXcvSjUk",
  authDomain: "todo-app-49484.firebaseapp.com",
  projectId: "todo-app-49484",
  storageBucket: "todo-app-49484.firebasestorage.app",
  messagingSenderId: "259935197524",
  appId: "1:259935197524:web:7562b8443dd47a6b6a90c1",
  measurementId: "G-CDBX951585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
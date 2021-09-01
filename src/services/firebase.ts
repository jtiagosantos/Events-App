import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCizbhv0Mob8eoQbTC7cjgI0_FDA8skUrc",
  authDomain: "events-app-704a6.firebaseapp.com",
  projectId: "events-app-704a6",
  storageBucket: "events-app-704a6.appspot.com",
  messagingSenderId: "823158904242",
  appId: "1:823158904242:web:4a9dfc035064caec4cc0ab"
};

export default initializeApp(firebaseConfig);
export { getAuth, signInWithEmailAndPassword };
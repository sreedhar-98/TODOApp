import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCIizzOZKlPqtvzv9L0MQeQqtVGeZNFnZY",
    authDomain: "todo-app-76329.firebaseapp.com",
    projectId: "todo-app-76329",
    storageBucket: "todo-app-76329.appspot.com",
    messagingSenderId: "29067851931",
    appId: "1:29067851931:web:1e051f5ed90f4e92666e3e",
    measurementId: "G-5B6H28V9GJ"
  };

  
  initializeApp(firebaseConfig);

  export const auth=getAuth();
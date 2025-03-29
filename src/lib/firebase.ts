
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHOhUCJBu71gCnE9FVK4j5XCGdT-i4Lew",
  authDomain: "eventsphere-app.firebaseapp.com",
  projectId: "eventsphere-app",
  storageBucket: "eventsphere-app.appspot.com",
  messagingSenderId: "234567890123",
  appId: "1:234567890123:web:a1b2c3d4e5f6g7h8i9j0k1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

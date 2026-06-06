import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA0KtrDIDEQ_2I8t6KRfu60wnpzLGQ1rcc",
  authDomain: "webmitra-c3e80.firebaseapp.com",
  projectId: "webmitra-c3e80",
  storageBucket: "webmitra-c3e80.firebasestorage.app",
  messagingSenderId: "96249944265",
  appId: "1:96249944265:web:5547525c6f90d541859518",
  measurementId: "G-V8V9SDNL8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Safeguard Analytics for sandboxed frame environments
export const analyticsPromise = isSupported()
  .then((supported) => (supported ? getAnalytics(app) : null))
  .catch(() => null);

export default app;

// Example Firebase configuration.
//
// Copy this file to `firebaseConfig.js` and fill in the values from your own
// Firebase project (Project settings -> General -> Your apps -> SDK setup).
// `firebaseConfig.js` is gitignored and must never be committed.
//
// If you prefer to keep the raw keys in a separate file, move the
// `firebaseConfig` object into `firebaseEnv.js` and import it here —
// that file is gitignored as well.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

// Used by api/authApi.ts and providers/authctx.tsx
export const auth = getAuth(app);

// Used by api/eventApi.ts and api/userApi.ts
export const db = getFirestore(app);

const storage = getStorage(app);

// Used by api/imageApi.ts to upload an image
export const getStorageRef = async (path) => ref(storage, path);

// Used by api/eventApi.ts to read back the public URL after upload
export const getDownloadUrl = async (path) => getDownloadURL(ref(storage, path));

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'password-manager-db4f1.firebaseapp.com',
  databaseURL: 'https://password-manager-db4f1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'password-manager-db4f1',
  storageBucket: 'password-manager-db4f1.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

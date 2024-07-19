// Import the functions you need from the SDKs you need
import { Coin } from '@/lib/store';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const fetchWatchlist = async (userId: string): Promise<Coin[]> => {
  const watchlistRef = ref(database, `watchlist/${userId}`);
  const snapshot = await get(watchlistRef);
  return snapshot.exists() ? snapshot.val() : [];
};

const updateWatchlist = async (
  userId: string,
  watchlist: Coin[]
): Promise<void> => {
  const watchlistRef = ref(database, `watchlist/${userId}`);
  await set(watchlistRef, watchlist);
};

export { fetchWatchlist, updateWatchlist };

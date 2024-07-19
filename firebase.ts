// Import the functions you need from the SDKs you need
import { Coin } from '@/lib/store';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCV45Vf4EIQnSuXhlkeZq-o-N01x_3ybSQ',
  authDomain: 'cryptonite-eb584.firebaseapp.com',
  projectId: 'cryptonite-eb584',
  storageBucket: 'cryptonite-eb584.appspot.com',
  messagingSenderId: '356542844173',
  appId: '1:356542844173:web:8d8517ba9639fcccc83444',
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

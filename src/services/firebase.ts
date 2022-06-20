import { getApps, initializeApp } from "firebase/app";

import {
  DataSnapshot,
  getDatabase,
  onValue,
  ref,
  set,
} from "firebase/database";
import { ICard } from "../contexts/card-context";
import { FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

function writeUserData(cardId: string, card: ICard) {
  const db = getDatabase();
  set(ref(db, "cards/" + cardId), card);
}

const getData = () => {
  const db = getDatabase();

  const starCountRef = ref(db, "cards/" + "id-card");
  onValue(starCountRef, (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    console.log("DATA", data);
  });
};

initializeApp(firebaseConfig);

export { writeUserData, getData };

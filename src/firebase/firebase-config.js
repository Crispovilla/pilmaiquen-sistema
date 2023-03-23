import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyAcvcbINDkLx129UAfGgfQIA_cmXS_suGQ",
  authDomain: "productos-landing.firebaseapp.com",
  projectId: "productos-landing",
  storageBucket: "productos-landing.appspot.com",
  messagingSenderId: "254337711156",
  appId: "1:254337711156:web:34d95abd30b06a5afd5e61",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);
export const auth = getAuth(app);

export async function uploadImage(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

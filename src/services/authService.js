import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Register with username
export const register = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save username in Auth displayName
  await updateProfile(user, { displayName: username });

  // Also save username in Firestore
  await setDoc(doc(db, "users", user.uid), { username });

  return user;
};

// Login and fetch username from Firestore
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // First try from Firestore
  const docSnap = await getDoc(doc(db, "users", user.uid));
  let username = null;

  if (docSnap.exists()) {
    username = docSnap.data().username;
  } else {
    username = user.displayName || null;
  }

  return { user, username };
};

export const logout = () => signOut(auth);

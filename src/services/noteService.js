import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const addNoteToFirebase = async (userId, note) => {
  try {
    console.log("Saving note for:", userId, note);
    const docRef = await addDoc(collection(db, "notes"), {
      ...note,
      userId,
      createdAt: new Date().toISOString(),
      deleted: false,
      isFavorite: false,
    });
    return { id: docRef.id, ...note, deleted: false, isFavorite: false };
  } catch (err) {
    console.error("Error adding note to Firestore:", err);
    throw err;
  }
};

export const deleteNoteFromFirebase = async (noteId) => {
  await deleteDoc(doc(db, "notes", noteId));
  return noteId;
};

export const moveToBin = async (noteId) => {
  await updateDoc(doc(db, "notes", noteId), { deleted: true });
  return noteId;
};

export const restoreNote = async (noteId) => {
  await updateDoc(doc(db, "notes", noteId), { deleted: false });
  return noteId;
};

export const toggleFavorite = async (noteId, isFavorite) => {
  const noteRef = doc(db, "notes", noteId);
  await updateDoc(noteRef, { isFavorite: !isFavorite });
  return { noteId, isFavorite: !isFavorite };
};

export const updateNote = async (noteId, data) => {
  await updateDoc(doc(db, "notes", noteId), data);
  return { noteId, data };
};

export const fetchNotes = async (userId) => {
  const notesRef = collection(db, "notes");
  const q = query(notesRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    isDeleted: doc.data().deleted ?? false,
  }));
};

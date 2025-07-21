import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNoteToFirebase,
  deleteNoteFromFirebase,
  moveToBin,
  restoreNote,
  toggleFavorite,
  updateNote,
  fetchNotes,
} from "../services/noteService";


export const fetchNotesFromFirebase = createAsyncThunk(
  "notes/fetchNotes",
  async (userId) => {
    const notes = await fetchNotes(userId);
    return notes;
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ userId, note }) => await addNoteToFirebase(userId, note)
);

export const DeleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId) => await deleteNoteFromFirebase(noteId)
);

export const moveNoteToBin = createAsyncThunk(
  "notes/moveToBin",
  async (noteId) => await moveToBin(noteId)
);

export const restoreNoteFromBin = createAsyncThunk(
  "notes/restoreNote",
  async (noteId) => await restoreNote(noteId)
);

export const toggleFavoriteNote = createAsyncThunk(
  "notes/toggleFavorite",
  async ({ noteId, isFavorite }) => await toggleFavorite(noteId, isFavorite)
);

export const updateNoteInFirebase = createAsyncThunk(
  "notes/updateNote",
  async ({ noteId, data }) => await updateNote(noteId, data)
);

const initialState = {
  isOpen: false,
  title: "",
  content: "",
  selectedColor: "bluebg",
  isFavorite: false,
  isDeleted: false,
  editingNoteId: null,
  notes: [],
  searchText: "",
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    updateNoteField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetModal: (state) => {
      state.title = "";
      state.content = "";
      state.selectedColor = "bluebg";
      state.editingNoteId = null;
    },
    startEditingNote: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        state.editingNoteId = note.id;
        state.title = note.title;
        state.content = note.content;
        state.selectedColor = note.color;
        state.isOpen = true;
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesFromFirebase.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(DeleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((n) => n.id !== action.payload);
      })
      .addCase(moveNoteToBin.fulfilled, (state, action) => {
        const note = state.notes.find((n) => n.id === action.payload);
        if (note) note.isDeleted = true;
      })
      .addCase(restoreNoteFromBin.fulfilled, (state, action) => {
        const note = state.notes.find((n) => n.id === action.payload);
        if (note) note.isDeleted = false;
      })
      .addCase(updateNoteInFirebase.fulfilled, (state, action) => {
        const { noteId, data } = action.payload;
        const note = state.notes.find((n) => n.id === noteId);
        if (note) Object.assign(note, data);
      })
      .addCase(toggleFavoriteNote.fulfilled, (state, action) => {
        const { noteId, isFavorite } = action.payload;
        const note = state.notes.find((n) => n.id === noteId);
        if (note) note.isFavorite = isFavorite;
      });
  },
});

export const {
  openModal,
  closeModal,
  updateNoteField,
  resetModal,
  startEditingNote,
  setSearchText,
} = noteSlice.actions;

export default noteSlice.reducer;

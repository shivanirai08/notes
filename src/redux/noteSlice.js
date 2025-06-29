import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "",
  content: "",
  selectedColor: "bluebg",
  isFavorite: false,
  isDeleted: false,
  editingNoteId: null,
  notes: [], // saved notes list
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
    saveNote: (state) => {
      const newNote = {
        title: state.title,
        content: state.content,
        color: state.selectedColor,
        date: new Date().toLocaleString(),
        id: Date.now(),
      };
      state.notes.push(newNote);
    },
    resetModal: (state) => {
      state.title = "";
      state.content = "";
      state.selectedColor = "bluebg";
      state.editingNoteId = null;
    },
    isFavorite: (state, action) => {
      const { id } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.isFavorite = !note.isFavorite; // Toggle favorite status
      }
    },
    deleteNote: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.isDeleted = true;
      }
    },
    restoreNote: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.isDeleted = false;
      }
    },
    permanentlyDeleteNote: (state, action) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload.id);
    },
    editNote: (state, action) => {
      const { id, title, content, color } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.title = title;
        note.content = content;
        note.color = color;
      }
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
  },
});

export const {
  openModal,
  closeModal,
  updateNoteField,
  saveNote,
  isFavorite,
  deleteNote,
  resetModal,
  startEditingNote,
  restoreNote,
  permanentlyDeleteNote,
  editNote,
} = noteSlice.actions;

export default noteSlice.reducer;

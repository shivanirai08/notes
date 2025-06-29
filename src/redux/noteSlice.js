import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  title: '',
  content: '',
  selectedColor: 'bluebg',
  isFavorite: false,
  isDeleted: false,
  // isEdited: false,
  notes: [], // saved notes list
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    isFavorite: (state, action) => {
      const { id } = action.payload;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.isFavorite = !note.isFavorite; // Toggle favorite status
      }
    },
    deleteNote: (state, action) => {
    const note = state.notes.find(n => n.id == action.payload.id);
    if (note) {
      note.isDeleted = true;
    }
    },
    restoreNote: (state, action) => {
    const note = state.notes.find(n => n.id === action.payload.id);
    if (note) {
      note.isDeleted = false;
    }
  },
  permanentlyDeleteNote: (state, action) => {
    state.notes = state.notes.filter(n => n.id !== action.payload.id);
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
        isFavorite: state.isFavorite,
        id: Date.now(),
      };
      state.notes.push(newNote);
    },
    resetModal: (state) => {
      state.title = '';
      state.content = '';
      state.selectedColor = 'bluebg';
    },
  },
});

export const {
  openModal,
  closeModal,
  updateNoteField,
  isFavorite,
  deleteNote,
  saveNote,
  resetModal,
} = noteSlice.actions;

export default noteSlice.reducer;

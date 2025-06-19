import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  title: '',
  content: '',
  selectedColor: 'bluebg',
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
      state.title = '';
      state.content = '';
      state.selectedColor = '#FFFACD';
    },
  },
});

export const {
  openModal,
  closeModal,
  updateNoteField,
  saveNote,
  resetModal,
} = noteSlice.actions;

export default noteSlice.reducer;

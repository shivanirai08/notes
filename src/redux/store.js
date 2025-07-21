import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    auth: authReducer,
  },
});

export default store;

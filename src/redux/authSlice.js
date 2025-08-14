import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, login, logout } from "../services/authService"; // Updated service

// 🔐 Signup Thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const user = await register(email, password, username); // our new register
      return { uid: user.uid, username };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔐 Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user, username } = await login(email, password); // fetch from Firestore
      return { uid: user.uid, username };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔐 Logout Thunk
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    await logout();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    uid: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUserFromFirebase: (state, action) => {
      state.uid = action.payload.uid;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.uid = null;
        state.username = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setUserFromFirebase } = authSlice.actions;
export default authSlice.reducer;

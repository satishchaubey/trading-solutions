import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";
import { storage } from "./storage";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ mobile: string; password: string }>) {
      const user: User = {
        mobile: action.payload.mobile,
        password: action.payload.password,
      };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = user;
      state.error = null;
      storage.set(user);
    },

    registerSuccess(
      state,
      action: PayloadAction<{ mobile: string; password: string; invitationCode: string }>
    ) {
      const user: User = {
        mobile: action.payload.mobile,
        password: action.payload.password,
        invitationCode: action.payload.invitationCode,
      };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = user;
      state.error = null;
      storage.set(user);
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      storage.clear();
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    initializeAuth(state) {
      const user = storage.get();
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      }
      state.isLoading = false;
    },

    validateInvitationCode(
      state,
      action: PayloadAction<{ code: string; validCodes: string[] }>
    ) {
      state.error = action.payload.validCodes.includes(action.payload.code)
        ? null
        : "Invalid invitation code";
    },
  },
});

export const {
  loginSuccess,
  registerSuccess,
  logout,
  setLoading,
  setError,
  initializeAuth,
  validateInvitationCode,
} = authSlice.actions;

export default authSlice.reducer;

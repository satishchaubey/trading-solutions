// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  mobile: string;
  password: string;
  invitationCode?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

// Secure storage functions
const storage = {
  get: (): User | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem('authUser');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  set: (user: User) => {
    localStorage.setItem('authUser', JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem('authUser');
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ mobile: string; password: string }>) {
      const user = {
        mobile: action.payload.mobile,
        password: action.payload.password
      };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = user;
      state.error = null;
      storage.set(user);
    },

    registerSuccess(
      state,
      action: PayloadAction<{
        mobile: string;
        password: string;
        invitationCode: string;
      }>
    ) {
      const user = {
        mobile: action.payload.mobile,
        password: action.payload.password,
        invitationCode: action.payload.invitationCode
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
    }
  },
});

export const {
  loginSuccess,
  registerSuccess,
  logout,
  setLoading,
  setError,
  initializeAuth,
  validateInvitationCode
} = authSlice.actions;

export default authSlice.reducer;
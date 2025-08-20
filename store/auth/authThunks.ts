// store/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginSuccess, setError, setLoading } from "./authSlice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { mobile: string; password: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // fake API call
      // const response = await api.post("/login", data);
      
      // On success
      dispatch(loginSuccess(data));
    } catch (err: any) {
      dispatch(setError(err.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: { mobile: string; password: string; invitationCode: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // fake API call
      // const response = await api.post("/register", data);
      // On success
      dispatch(loginSuccess(data));
    } catch (err: any) {
      dispatch(setError(err.message || "Registration failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export interface User {
  mobile: string;
  password: string;
  invitationCode?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

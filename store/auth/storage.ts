import { User } from "./types";

// Secure storage
export const storage = {
  get: (): User | null => {
    if (typeof window === "undefined") return null;
    try {
      const data = localStorage.getItem("authUser");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  set: (user: User) => {
    localStorage.setItem("authUser", JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem("authUser");
  },
};
